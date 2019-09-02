/* eslint-disable no-restricted-syntax */
const bluePromise = require('bluebird');

const { PLATFORM_DEFS, PLATFORMS } = require('../constants/platforms');
const { display } = require('../utils/display');

function checkPlatforms(settings) {
  if (!settings.platforms || !Array.isArray(settings.platforms)) {
    display.success('Processing files for all platforms');
    return bluePromise.resolve(PLATFORMS);
  }

  const { platforms } = settings;
  const platformsToProcess = [];
  const platformsUnknown = [];

  platforms.forEach((platform) => {
    if (PLATFORMS.find(p => platform === p)) {
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
    for (const platform in PLATFORM_DEFS) {
      if (Object.prototype.hasOwnProperty.call(PLATFORM_DEFS, platform)) {
        const iconConfig = PLATFORM_DEFS[platform].definitions[0];
        if (iconConfig) {
          PLATFORM_DEFS[platform].definitions[0] = iconConfig.replace(
            './platforms',
            settings.configPath,
          );
        }

        const splashConfig = PLATFORM_DEFS[platform].definitions[1];
        if (splashConfig) {
          PLATFORM_DEFS[platform].definitions[1] = splashConfig.replace(
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
