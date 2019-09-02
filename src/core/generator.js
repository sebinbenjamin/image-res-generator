/* eslint-disable global-require */
const bluePromise = require('bluebird');
const Gauge = require('gauge');
const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const { PLATFORM_DEFS } = require('../constants/platforms');
const { display } = require('../utils/display');

function generateForConfig(imageObj, settings, config) {
  // console.log('[generateForConfig] ',  JSON.stringify(settings, null, 2),
  //  JSON.stringify(config, null, 2));
  const platformPath = path.join(settings.outputDirectory, config.path);

  const transformIcon = (definition) => {
    const image = imageObj.icon;

    const outputFilePath = path.join(platformPath, definition.name);
    const outDir = path.dirname(outputFilePath);
    return fs
      .ensureDir(outDir)
      .then(() => image.resize(definition.size, definition.size).toFile(outputFilePath));
  };

  const transformSplash = (definition) => {
    const image = imageObj.splash;
    const { width } = definition;
    const { height } = definition;
    const outputFilePath = path.join(platformPath, definition.name);
    const outDir = path.dirname(outputFilePath);

    return fs.ensureDir(outDir).then(() => image
      .resize(width, height)
      .crop(sharp.strategy.entropy)
      .toFile(outputFilePath));
  };

  return fs.ensureDir(platformPath).then(() => {
    const { definitions } = config;
    const sectionName = `Generating ${config.type} files for ${config.platform}`;
    const definitionCount = definitions.length;
    let progressIndex = 0;

    const gauge = new Gauge();
    gauge.show(sectionName, 0);

    return bluePromise
      .mapSeries(definitions, (def) => {
        let transformPromise = bluePromise.resolve();
        transformPromise = transformPromise.then(() => {
          progressIndex += 1;
          const progressRate = progressIndex / definitionCount;
          gauge.show(sectionName, progressRate);
          gauge.pulse(def.name);
        });
        switch (config.type) {
          case 'icon':
            transformPromise = transformPromise.then(() => transformIcon(def));
            break;
          case 'splash':
            transformPromise = transformPromise.then(() => transformSplash(def));
            break;
          default:
            throw new Error(`Unknown config type ${config.type} received !`);
        }
        return transformPromise;
      })
      .then(() => {
        gauge.disable();
        display.success(`Generated ${config.type} files for ${config.platform}`);
      })
      .catch((err) => {
        gauge.disable();
        throw err;
      });
  });
}

function generate(imageObj, settings, gSelectedPlatforms) {
  display.header('Generating files');
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
