const fs = require('fs-extra');
const path = require('path');

const { PLATFORM_DEFS } = require('../constants/platforms');
const { display } = require('../utils/display');

/**
 * @param {*} definition
 * @param {*} platformPath
 * @param {*} imageObj
 * @param {*} type
 * @param {*} platform
 */
const transformIcon = (definition, platformPath, imageObj, type, platform) => {
  const image = imageObj.icon;
  const outputFilePath = path.join(platformPath, definition.name);
  const outDir = path.dirname(outputFilePath);
  return fs
    .ensureDir(outDir)
    .then(() =>
      image.resize(definition.size, definition.size).toFile(outputFilePath)
    )
    .then(() =>
      Promise.resolve({
        config: {
          type,
          platform,
        },
      })
    );
};

const transformSplash = (
  definition,
  platformPath,
  imageObj,
  type,
  platform
) => {
  const image = imageObj.splash;
  const { width } = definition;
  const { height } = definition;
  const outputFilePath = path.join(platformPath, definition.name);
  const outDir = path.dirname(outputFilePath);

  return fs
    .ensureDir(outDir)
    .then(() =>
      image.resize({ width, height, position: 'centre' }).toFile(outputFilePath)
    )
    .then(() =>
      Promise.resolve({
        config: {
          type,
          platform,
        },
      })
    );
};

/**
 * ???
 * @param {JSON} settings
 *{
  iconFile: 'resources/icon', splashFile: 'resources/splash',
  platforms: 'ios,android', outputDirectory: 'resources',
  makeIcon: true, makeSplash: true, configPath: undefined, cropSplash:false
}
 * @param {*} imageObj Object containing the sharp instance of the iconFile & splashFiles.
 * @param {*} config
 * @returns
 */
function generateForConfig(imageObj, settings, config) {
  const platformPath = path.join(settings.outputDirectory, config.path);
  return fs.ensureDir(platformPath).then(() => {
    // const sectionName = `Generating ${config.type} files for ${config.platform}`;
    const { definitions } = config;
    const promiseArrayIcons = [];
    const promiseArraySplash = [];

    display.info(`Processing ${config.platform} ${config.type} files ...`);
    definitions.forEach((def) => {
      switch (config.type) {
        case 'icon':
          promiseArrayIcons.push(
            transformIcon(
              def,
              platformPath,
              imageObj,
              config.type,
              config.platform
            )
          );
          break;
        case 'splash':
          promiseArraySplash.push(
            transformSplash(
              def,
              platformPath,
              imageObj,
              config.type,
              config.platform
            )
          );
          break;
        default:
          throw new Error(`Unknown config type ${config.type} received !`);
      }
    });

    // * TODO: make generateForConfig return promises properly
    if (promiseArrayIcons.length) {
      Promise.all(promiseArrayIcons)
        .then((success) => {
          const configType = success[0].config.type;
          const configPlatform = success[0].config.platform;
          display.success(
            `Generated ${configType} files for ${configPlatform}`
          );
        })
        .catch((err) => {
          // console.error('ERROR', err);
          throw err;
        });
    }
    if (promiseArraySplash.length) {
      Promise.all(promiseArraySplash)
        .then((success) => {
          const configType = success[0].config.type;
          const configPlatform = success[0].config.platform;
          display.success(
            `Generated ${configType} files for ${configPlatform}`
          );
        })
        .catch((err) => {
          // console.error('ERROR', err);
          throw err;
        });
    }
  });
}

/**
 * ???
 * @param {JSON} imageObj Object containing the sharp instances of icon/splash images.
 *
 * {
    icon: null,
    splash: null
  }
 * @param {JSON} settings
 * {
    iconFile: 'resources/icon', splashFile: 'resources/splash',
    platforms: 'ios,android', outputDirectory: 'resources',
    makeIcon: true, makeSplash: true, configPath: undefined, cropSplash:false
  }
 * @param {Array<string>} gSelectedPlatforms List of platforms to generate resources for.
 */
function generate(imageObj, settings, gSelectedPlatforms) {
  display.header('Generating files');
  display.info('=================');
  const configs = [];
  // * TO DO: Refactor if possible
  gSelectedPlatforms.forEach((platform) => {
    PLATFORM_DEFS[platform].definitions.forEach((platformDef) =>
      configs.push(require(platformDef))
    );
  });

  const filteredConfigs = configs.filter((config) => {
    if (config.type === 'icon' && settings.makeIcon) return true;
    if (config.type === 'splash' && settings.makeSplash) return true;
    return false;
  });
  return filteredConfigs.forEach((config) =>
    generateForConfig(imageObj, settings, config)
  );
}
exports.generate = generate;
