/* eslint-disable global-require */
const bluePromise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const { PLATFORM_DEFS } = require('../constants/platforms');
const { display } = require('../utils/display');

const transformIcon = (definition, platformPath, imageObj, type, platform) => {
  const image = imageObj.icon;
  const outputFilePath = path.join(platformPath, definition.name);
  const outDir = path.dirname(outputFilePath);
  return fs
    .ensureDir(outDir)
    .then(() => image.resize(definition.size, definition.size).toFile(outputFilePath))
    .then(() => Promise.resolve({
      config: {
        type,
        platform,
      },
    }));
};

const transformSplash = (definition, platformPath, imageObj, type, platform) => {
  const image = imageObj.splash;
  const { width } = definition;
  const { height } = definition;
  const outputFilePath = path.join(platformPath, definition.name);
  const outDir = path.dirname(outputFilePath);

  return fs
    .ensureDir(outDir)
    .then(() => image
      .resize(width, height)
      .crop(sharp.strategy.entropy)
      .toFile(outputFilePath))
    .then(() => Promise.resolve({
      config: {
        type,
        platform,
      },
    }));
};

function generateForConfig(imageObj, settings, config) {
  // console.log('[generateForConfig] ',  JSON.stringify(settings, null, 2),
  //  JSON.stringify(config, null, 2));
  const platformPath = path.join(settings.outputDirectory, config.path);

  return fs.ensureDir(platformPath).then(() => {
    // const sectionName = `Generating ${config.type} files for ${config.platform}`;
    const { definitions } = config;
    const promiseArrayIcons = [];
    const promiseArraySplash = [];
    console.log(`Processing ${config.platform} ${config.type} files ...`);
    definitions.forEach((def) => {
      switch (config.type) {
        case 'icon':
          promiseArraySplash.push(
            transformIcon(def, platformPath, imageObj, config.type, config.platform),
          );
          break;
        case 'splash':
          promiseArraySplash.push(
            transformSplash(def, platformPath, imageObj, config.type, config.platform),
          );
          break;
        default:
          throw new Error(`Unknown config type ${config.type} received !`);
      }
    });
    Promise.all(promiseArrayIcons)
      .then(() => {
        if (config.type === 'icon') display.success(`Generated ${config.type} files for ${config.platform}`);
      })
      .catch((err) => {
        throw err;
      });
    Promise.all(promiseArraySplash)
      .then(() => {
        if (config.type === 'splash') display.success(`Generated ${config.type} files for ${config.platform}`);
      })
      .catch((err) => {
        throw err;
      });
  });
}

function generate(imageObj, settings, gSelectedPlatforms) {
  display.header('Generating files');
  display.info('=================');
  const configs = [];
  // * TO DO: Refactor if possible
  gSelectedPlatforms.forEach((platform) => {
    // eslint-disable-next-line import/no-dynamic-require
    PLATFORM_DEFS[platform].definitions.forEach(platformDef => configs.push(require(platformDef)));
  });

  const filteredConfigs = configs.filter((config) => {
    if (config.type === 'icon' && settings.makeIcon) {
      return true;
    }
    if (config.type === 'splash' && settings.makeSplash) {
      return true;
    }
    return false;
  });

  return bluePromise
    .mapSeries(filteredConfigs, config => generateForConfig(imageObj, settings, config))
    .then(() => {
      // display.success("Successfully generated all files");
    });
}
exports.generate = generate;
