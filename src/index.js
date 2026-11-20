#!/usr/bin / env node

const packageJSON = require('../package.json');
const { checkInputFiles, checkOutPutDir } = require('./core/fs-manager');
const { checkPlatforms, updatePlatforms } = require('./core/platform-manager');
const { getIconAndSplashSrc } = require('./core/image-manager');
const { generate } = require('./core/generator');

const { cliParams } = require('./utils/cli');
const { catchErrors } = require('./utils/error-handlers');

let gImageObjects;
let gSelectedPlatforms = [];

/**
 *  Initialize the app with given configuration values.
 *
  @param initSettings  {JSON}
  {
    iconFile: 'resources/icon', splashFile: 'resources/splash',
    platforms: 'ios,android', outputDirectory: 'resources',
    makeIcon: true, makeSplash: true, configPath: undefined, cropSplash:false
  }
  @returns {Promise<Boolean>} true if path for outputDirectory parameter exists
 *
 * */
function initApp(initSettings) {
  const settings = { ...initSettings }; // * TODO: refactor to immutable
  checkInputFiles(settings);
  return (
    updatePlatforms(settings)
      .then(() => checkPlatforms(settings))
      // * FIXME:  should be refactored

      .then((selPlatforms) => (gSelectedPlatforms = selPlatforms))
      .then(() => getIconAndSplashSrc(settings))
      .then((imageObjects) => {
        gImageObjects = imageObjects;
      })
      .then(() => checkOutPutDir(settings))
  );
}

// app entry point
console.info('***************************');
console.info(`image-res-generator ${packageJSON.version}`);
console.info('***************************');

initApp(cliParams)
  .then(() => generate(gImageObjects, cliParams, gSelectedPlatforms))
  .catch((err) => catchErrors(err));
