# image-res-generator

## Archived

This project was retired on 21 November 2026. It is no longer maintained and will receive no further releases, bug fixes or support. The source and existing issues remain available for reference.

For new projects, use the asset tooling documented by your framework:

- Capacitor and Ionic with Capacitor: [@capacitor/assets](https://capacitorjs.com/docs/guides/splash-screens-and-icons).
- Quasar: [Icon Genie](https://quasar.dev/icongenie/installation/).

These tools are not drop-in replacements. Follow their input file and output configuration instructions.

The last published npm version is 0.6.2. The 0.7.0 version in this repository was never published. Older dependencies may prevent the published package from installing on current Node.js versions.

The instructions below describe the historical project and may differ from the published npm package. They are retained for reference.

[![CircleCI build status](https://img.shields.io/circleci/build/github/sebinbenjamin/image-res-generator.svg)](https://circleci.com/gh/sebinbenjamin/image-res-generator)
[![Codeclimate Issues](https://img.shields.io/codeclimate/issues/sebinbenjamin/image-res-generator.svg)](https://codeclimate.com/github/sebinbenjamin/image-res-generator/issues)
[![Codeclimate Maintainability](https://img.shields.io/codeclimate/maintainability-percentage/sebinbenjamin/image-res-generator.svg)](https://codeclimate.com/github/sebinbenjamin/image-res-generator/maintainability)
[![Depfu](https://badges.depfu.com/badges/e26d90ff99e9d1681c0e0029b003cb9f/overview.svg)](https://depfu.com/github/sebinbenjamin/image-res-generator?project_id=8520)
[![Gitter Chat](https://img.shields.io/gitter/room/sebinbenjamin/image-res-generator.svg?color=blue)](https://gitter.im/image-res-generator/community)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Introduction

**image-res-generator** is an automatic icon and splash screen resizing tool designed for **Angular**, **Ionic**, **Capacitor**, **Cordova**, **PhoneGap** apps, PWAs, and general use. It resizes and copies your `icon.png` and `splash.png` files to the platform-specific directories.

---

## Installation

To install the image-res-generator globally, run:

```bash
npm install -g image-res-generator
```

This will make the `irgen` command available globally on your system.

---

## Usage

### Required Files

Place your `icon` and `splash` files in the 'resources' folder under the root of your project. Ensure they are at least 1024x1024 pixels for icons and 2732x2732 pixels for splash images.

```
resources/
├── icon.png
└── splash.png
```

**Update**: You can now use `SVG` vector images for both icon and splash files 🎉.

```
resources/
├── icon.svg
└── splash.svg
```

When creating a base splash image, ensure that the artwork fits within a square (1200x1200) at the center of the image (2732x2732).

![Splash Screen Template](https://user-images.githubusercontent.com/4099066/82296073-bd052880-9a04-11ea-9ee7-199b6dc1e826.jpg)

You can use this [template](https://code.ionicframework.com/resources/splash.psd) provided by the Ionic team for easier splash creation.

### Command Line Usage

To generate resized images, use:

```bash
$ image-res-generator
```
or

```bash
$ irgen
```

**Note:** While preserving source files, it overwrites previous output if any.

### Options

```bash
-V, --version               output the version number
-i, --icon [optional]       optional icon file path
                            (default: ./resources/icon.png)
-s, --splash [optional]     optional splash file path
                            (default: ./resources/splash.png)
-p, --platforms [optional]  optional platform token comma-separated list
                            available tokens: android, ios, windows, blackberry10, pwa
                            (default: all platforms processed)
-o, --outputDir [optional]  optional output directory
                            (default: ./resources/)
-I, --makeIcon [optional]   option to process icon files only
-S, --makeSplash [optional] option to process splash files only
-c, --crop [optional]       option to crop images instead of the default 'resize' strategy
-h, --help                  output usage information
-d, --debug                 output debugging information
```

---

## Best Practices

### Automate with NPM Scripts

Add a script to your `package.json` to automate the image generation process with specific options. This saves time and avoids repetitive command typing.

Example:

```json
{
  "scripts": {
    "resgen": "irgen -p android,ios"
  }
}
```

Now, you can run:

```bash
npm run resgen
```

---

## Supported Platforms

- **iOS**
  - Icons
  - Splash screens
- **Android**
  - Icons
  - Splash screens
- **Windows**
  - Icons
  - Splash screens
- **Blackberry 10**
  - Icons
- **PWAs**
  - Icons

---

## Roadmap

- Copy assets to Android/iOS Capacitor folders.
- Add options for crop resizing strategy.
- Update image configurations for all platforms.
- Add support for Capacitor.

---

## Contributing

Thank you for your interest in contributing! Please read our [contributing guidelines](https://github.com/sebinbenjamin/image-res-generator/blob/master/CONTRIBUTING.md) to get started.

---

## Credits

This open-source project is made possible by the support of the amazing open-source community. Special thanks to:

- All contributors in this project ✨💚.
- [@olivab](https://github.com/olivab) for creating and maintaining the original project [cordova-res-generator](https://github.com/olivab/cordova-res-generator).
- Contributors to [cordova-res-generator](https://github.com/olivab/cordova-res-generator).

---

## License

This project is licensed under the GPLv3. See the [LICENSE file](https://github.com/sebinbenjamin/image-res-generator/blob/master/LICENSE) for details.
