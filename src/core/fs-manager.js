/* eslint-disable no-param-reassign */
const fs = require('fs-extra');
const path = require('path');
const { IMAGE_FORMATS } = require('../constants/image-formats');
const { display } = require('../utils/display');
const { catchErrors } = require('../utils/error-handlers');

function isSupportedFormat(fileName) {
  let vExt = path.extname(fileName);
  //* TODO: refactor if/return logic
  if (vExt && vExt.length >= 2) {
    vExt = vExt.slice(1).toLowerCase();
    return IMAGE_FORMATS.indexOf(vExt) !== -1;
  }
  return false;
}

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

function checkInputFiles(settings) {
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
}

function checkOutPutDir(settings) {
  const dir = settings.outputDirectory;

  return fs.pathExists(dir).then((exists) => {
    if (exists) {
      display.success(`Output directory ok (${dir})`);
    } else {
      display.error(`Output directory not found (${dir})`);
      throw new Error(`Output directory not found: ${dir}`);
    }
  });
}

exports.checkOutPutDir = checkOutPutDir;
exports.getValidFileName = getValidFileName;
exports.checkInputFiles = checkInputFiles;
