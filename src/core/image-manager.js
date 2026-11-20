const sharp = require('sharp');

const { display } = require('../utils/display');

/**
 * Checks the dimensions, format of the IconFile and returns a sharp instance of the file
 * @param string Name of the iconFile input.
 * @returns A promise containing the sharp instance of the iconFile
 * @throws An Error object if image format is incorrect.
 */
function checkIconFile(iconFileName) {
  const result = sharp(iconFileName);
  return result.metadata().then((image) => {
    if (
      image.width === image.height &&
      (image.format === 'svg' || image.width >= 1024)
    ) {
      result.meta = image;
      display.success(`Icon file ok (${image.width}x${image.height})`);
    } else {
      display.error(`Bad icon file (${image.width}x${image.height})`);
      throw new Error('Bad image format');
    }
    return result;
  });
}

/**
 * Checks the dimensions, format of the splashFile and returns a sharp instance of the file
 * @param string Name of the splashFile input.
 * @returns A promise containing the sharp instance of the splashFile
 * @throws An Error object if image format is incorrect.
 */
function checkSplashFile(splashFileName) {
  const result = sharp(splashFileName);
  return result.metadata().then((image) => {
    if (
      image.width === image.height &&
      (image.format === 'svg' || image.width >= 2732)
    ) {
      result.meta = image;
      display.success(`splash file ok (${image.width}x${image.height})`);
    } else {
      display.error(`Bad splash file (${image.width}x${image.height})`);
      throw new Error('Bad image format');
    }
    return result;
  });
}

/**
 * Checks settings and gets imageObjects from Icon and/or Splash files.
 * @param {JSON} settings
 * {
    iconFile: 'resources/icon', splashFile: 'resources/splash',
    platforms: 'ios,android', outputDirectory: 'resources',
    makeIcon: true, makeSplash: true, configPath: undefined, cropSplash:false
  }
 * @return {JSON}  {
    icon: Object,
    splash: Object,
  };
 */
function getIconAndSplashSrc(settings) {
  const imageObjects = {
    icon: null,
    splash: null,
  };

  if (settings.makeIcon) {
    checkIconFile(settings.iconFile).then((image) => {
      imageObjects.icon = image;
    });
  }
  if (settings.makeSplash) {
    checkSplashFile(settings.splashFile).then((image) => {
      imageObjects.splash = image;
    });
  }
  return imageObjects; // suspected missing promise wait
}

exports.getIconAndSplashSrc = getIconAndSplashSrc;
