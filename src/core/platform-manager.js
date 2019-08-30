/* eslint-disable no-restricted-syntax */
const bluePromise = require('bluebird');
const _ = require('lodash');

const PLATFORMS = require('../constants/platforms');
const { display } = require('../utils/display');

function checkPlatforms(settings) {
  const platformsKeys = _.keys(PLATFORMS);

  if (!settings.platforms || !Array.isArray(settings.platforms)) {
    display.success('Processing files for all platforms');
    return bluePromise.resolve(platformsKeys);
  }

  const { platforms } = settings;
  const platformsToProcess = [];
  const platformsUnknown = [];

  platforms.forEach((platform) => {
    if (_.find(platformsKeys, p => platform === p)) {
      platformsToProcess.push(platform);
    } else {
      platformsUnknown.push(platform);
    }
  });

  if (platformsUnknown.length > 0) {
    display.error(`Bad platforms: ${platformsUnknown}`);
    return bluePromise.reject(`Bad platforms: ${platformsUnknown}`);
  }

  display.success(`Processing files for: ${platformsToProcess}`);
  return bluePromise.resolve(platformsToProcess);
}

// app functions
function updatePlatforms(settings) {
  if (settings.configPath) {
    for (const platform in PLATFORMS) {
      if (Object.prototype.hasOwnProperty.call(PLATFORMS, platform)) {
        const iconConfig = PLATFORMS[platform].definitions[0];
        if (iconConfig) {
          PLATFORMS[platform].definitions[0] = iconConfig.replace(
            './platforms',
            settings.configPath,
          );
        }

        const splashConfig = PLATFORMS[platform].definitions[1];
        if (splashConfig) {
          PLATFORMS[platform].definitions[1] = splashConfig.replace(
            './platforms',
            settings.configPath,
          );
        }
      }
    }
  }
  return bluePromise.resolve(settings);
}

exports.checkPlatforms = checkPlatforms;
exports.updatePlatforms = updatePlatforms;
