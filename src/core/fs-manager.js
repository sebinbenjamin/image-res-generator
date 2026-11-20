const fs = require('fs-extra');
const path = require('path');

const { IMAGE_FORMATS } = require('../constants/image-formats');
const { display } = require('../utils/display');
const { catchErrors } = require('../utils/error-handlers');

/**
 * checks if file extension is in the supported IMAGE_FORMATS
 * @param {*} fileName ???
 * @return {Boolean}
 */
function isSupportedFormat(fileName) {
  let vExt = path.extname(fileName);
  //* TODO: refactor if/return logic
  if (vExt && vExt.length >= 2) {
    vExt = vExt.slice(1).toLowerCase();
    return IMAGE_FORMATS.indexOf(vExt) !== -1;
  }
  return false;
}

/**
 * Verifies and returns file extension support, if file exists
 * @param inputFileName {string}
 * @return {string} returns a valid filename.ext
 */
function getValidFileName(inputFileName) {
  let fileName = inputFileName.slice(); // * TODO: refactor to immutable
  let result;
  const ext = path.extname(fileName);

  // * TODO: refactor - nested conditional logics
  if (ext.length > 1) {
    if (!isSupportedFormat(fileName)) {
      throw new Error(`${fileName} is not supported image format!`);
    }
    if (fs.existsSync(path.resolve(fileName))) result = fileName;
  } else {
    if (ext.length === 1) fileName = fileName.slice(0, fileName.length - 2);
    for (let i = 0; i < IMAGE_FORMATS.length; i += 1) {
      if (fs.existsSync(path.resolve(`${fileName}.${IMAGE_FORMATS[i]}`))) {
        result = `${fileName}.${IMAGE_FORMATS[i]}`;
        break;
      }
    }
  }
  if (!result) throw new Error(`${fileName} no such file.`);
  return result;
}

/**
 * Checks if input iconFile and splashFile are valid
 * @param initSettings  {JSON}
 * {
    iconFile: 'resources/icon', splashFile: 'resources/splash',
    platforms: 'ios,android', outputDirectory: 'resources',
    makeIcon: true, makeSplash: true, configPath: undefined, cropSplash:false
  }
 */
function checkInputFiles(settings) {
  display.header('Checking files and directories');
  display.info('==================================');
  try {
    settings.iconFile = getValidFileName(settings.iconFile); // is the assignment needed
    settings.splashFile = getValidFileName(settings.splashFile); // is the assignment needed
  } catch (err) {
    catchErrors(err);
  }
}

/**
 * Checks if `settings.outputDirectory` exists
 * @param initSettings  {JSON}
 * {
    iconFile: 'resources/icon', splashFile: 'resources/splash',
    platforms: 'ios,android', outputDirectory: 'resources',
    makeIcon: true, makeSplash: true, configPath: undefined, cropSplash:false
  }
 * @returns {Promise<Boolean>} promise which resolves to true if dir exists, else false
 */
function checkOutPutDir(settings) {
  const dir = settings.outputDirectory;
  fs.pathExists(dir).then((exists) => {
    if (exists) {
      display.success(`Output directory ok (${dir})`);
      return Promise.resolve(exists);
    }
    display.error(`Output directory not found (${dir})`);
    return Promise.reject(new Error(`Output directory not found: ${dir}`));
  });
}

exports.checkOutPutDir = checkOutPutDir;
exports.getValidFileName = getValidFileName;
exports.checkInputFiles = checkInputFiles;
