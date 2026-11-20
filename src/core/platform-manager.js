const { PLATFORM_DEFS, PLATFORMS } = require('../constants/platforms');
const { display } = require('../utils/display');

/**
 * Checks settings to determine the platforms to process.
 * @param {JSON} settings Updated platform definition paths
 * {
    iconFile: 'resources/icon', splashFile: 'resources/splash',
    platforms: 'ios,android', outputDirectory: 'resources',
    makeIcon: true, makeSplash: true, configPath: undefined, cropSplash:false
  }
 * @returns {Promise<String[]>} Returns an array of the platforms to be processed
 */
function checkPlatforms(settings) {
  if (!settings.platforms || !Array.isArray(settings.platforms)) {
    display.success('Processing files for all platforms');
    return Promise.resolve(PLATFORMS);
  }

  const { platforms } = settings;
  const platformsToProcess = [];
  const platformsUnknown = [];

  platforms.forEach((requestedPlatform) => {
    if (
      PLATFORMS.find(
        (availablePlatform) => requestedPlatform === availablePlatform
      )
    ) {
      platformsToProcess.push(requestedPlatform);
    } else {
      platformsUnknown.push(requestedPlatform);
    }
  });

  if (platformsUnknown.length > 0) {
    display.error(`Bad platforms: ${platformsUnknown}`);
    return Promise.reject(new Error(`Bad platforms: ${platformsUnknown}`));
  }

  display.success(`Processing files for: ${platformsToProcess}`);
  return Promise.resolve(platformsToProcess);
}

/**
 * Update the platform definition paths to be relative with the path from `configPath` CLI option
 * @param {*} settings Current platform definition paths
 * {
    iconFile: 'resources/icon', splashFile: 'resources/splash',
    platforms: 'ios,android', outputDirectory: 'resources',
    makeIcon: true, makeSplash: true, configPath: undefined, cropSplash:false
 * }
 * @returns {Promise} Updated platform definition paths
 */
function updatePlatforms(settings) {
  if (settings.configPath) {
    for (const platform in PLATFORM_DEFS) {
      if (Object.prototype.hasOwnProperty.call(PLATFORM_DEFS, platform)) {
        const iconConfig = PLATFORM_DEFS[platform].definitions[0];
        if (iconConfig) {
          PLATFORM_DEFS[platform].definitions[0] = iconConfig.replace(
            './platforms',
            settings.configPath
          );
        }

        const splashConfig = PLATFORM_DEFS[platform].definitions[1];
        if (splashConfig) {
          PLATFORM_DEFS[platform].definitions[1] = splashConfig.replace(
            './platforms',
            settings.configPath
          );
        }
      }
    }
  }
  return Promise.resolve(settings);
}

exports.checkPlatforms = checkPlatforms;
exports.updatePlatforms = updatePlatforms;
