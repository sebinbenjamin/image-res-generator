// app main constiables and constants
const PLATFORM_DEFS = {
  android: {
    definitions: ['../config/icons/android', '../config/splash/android'],
  },
  ios: {
    definitions: ['../config/icons/ios', '../config/splash/ios'],
  },
  windows: {
    definitions: ['../config/icons/windows', '../config/splash/windows'],
  },
  blackberry10: {
    definitions: ['../config/icons/blackberry10'],
  },
  pwa: {
    definitions: ['../config/icons/pwa.js'],
  },
};
const PLATFORMS = ['android', 'ios', 'windows', 'blackberry10', 'pwa'];

exports.PLATFORM_DEFS = PLATFORM_DEFS;
exports.PLATFORMS = PLATFORMS;
