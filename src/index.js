#!/usr/bin / env node
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

const packageJSON = require('../package.json');
const { getValidFileName, checkOutPutDir } = require('./core/fs-manager');
const { checkPlatforms, updatePlatforms } = require('./core/platform-manager');
const { getImages } = require('./core/image-manager');
const { generate } = require('./core/generator');

const { display } = require('./utils/display');
const { gSettings } = require('./utils/cli');
const { catchErrors } = require('./utils/error-handlers');

let gImageObjects;
let gSelectedPlatforms = [];

function checkInputsAndProcess(inputSettings) {
  const settings = { ...inputSettings }; // * TODO: refactor to immutable
  display.header('Checking files and directories');

  let vFile;
  try {
    vFile = getValidFileName(settings.iconFile);
    settings.iconFile = vFile;

    vFile = getValidFileName(settings.splashFile);
    settings.splashFile = vFile;
  } catch (err) {
    catchErrors(err);
  }

  return (
    updatePlatforms(settings)
      .then(() => checkPlatforms(settings))
      // * FIXME:  should be refactored
      // eslint-disable-next-line no-return-assign
      .then(selPlatforms => (gSelectedPlatforms = selPlatforms))
      .then(() => getImages(settings))
      .then((imageObjects) => {
        gImageObjects = imageObjects;
      })
      .then(() => checkOutPutDir(settings))
  );
}

// app entry point
console.log('***************************');
console.log(`image-res-generator ${packageJSON.version}`);
console.log('***************************');

checkInputsAndProcess(gSettings)
  .then(() => generate(gImageObjects, gSettings, gSelectedPlatforms))
  .catch(err => catchErrors(err));
