const sharp = require('sharp');
const bluePromise = require('bluebird');

const { display } = require('../utils/display');

function checkIconFile(iconFileName) {
  const result = sharp(iconFileName);
  return result.metadata().then((image) => {
    if (image.width === image.height && (image.format === 'svg' || image.width >= 1024)) {
      result.meta = image;
      display.success(`Icon file ok (${image.width}x${image.height})`);
    } else {
      display.error(`Bad icon file (${image.width}x${image.height})`);
      throw new Error('Bad image format');
    }
    return result;
  });
}

function checkSplashFile(splashFileName) {
  const result = sharp(splashFileName);
  return result.metadata().then((image) => {
    if (image.width === image.height && (image.format === 'svg' || image.width >= 2732)) {
      result.meta = image;
      display.success(`splash file ok (${image.width}x${image.height})`);
    } else {
      display.error(`Bad splash file (${image.width}x${image.height})`);
      throw new Error('Bad image format');
    }
    return result;
  });
}

function getImages(settings) {
  const imageObjects = {
    icon: null,
    splash: null,
  };

  let promise = bluePromise.resolve();

  if (settings.makeIcon) {
    promise = promise
      .then(() => checkIconFile(settings.iconFile))
      .then((image) => {
        imageObjects.icon = image;
      });
  }
  if (settings.makeSplash) {
    promise = promise
      .then(() => checkSplashFile(settings.splashFile))
      .then((image) => {
        imageObjects.splash = image;
      });
  }
  return promise.then(() => imageObjects);
}

exports.getImages = getImages;
