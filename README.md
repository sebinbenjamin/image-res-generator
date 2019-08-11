# image-res-generator
[![CircleCI build status](https://img.shields.io/circleci/build/github/sebinbenjamin/image-res-generator.svg)](https://circleci.com/gh/sebinbenjamin/image-res-generator)
[![Codeclimate Issues](https://img.shields.io/codeclimate/issues/sebinbenjamin/image-res-generator.svg)](https://codeclimate.com/github/sebinbenjamin/image-res-generator/issues)
[![Codeclimate Maintainability](https://img.shields.io/codeclimate/maintainability-percentage/sebinbenjamin/image-res-generator.svg)](https://codeclimate.com/github/sebinbenjamin/image-res-generator/maintainability)
[![Depfu](https://badges.depfu.com/badges/e26d90ff99e9d1681c0e0029b003cb9f/overview.svg)](https://depfu.com/github/sebinbenjamin/image-res-generator?project_id=8520)
[![Gitter Chay](https://img.shields.io/gitter/room/sebinbenjamin/image-res-generator.svg?color=blue)](https://gitter.im/image-res-generator/community)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Introduction

Automatic icon and splash screen resizing CLI tool for **Cordova**/**Ionic**/**PhoneGap** based applications and PWAs.

It automatically resizes and copies your ```icon.png``` and ```splash.png``` files to the platform dedicated directories.

It does **NOT require** any external binary libraries. **Javascript only**.

---
<!-- ## Installation

    $ npm install image-res-generator -g
--- -->

## Usage
### Required files

Add your ```icon.png``` (1024x1024 px) and ```splash.png``` (2732x2732 px) files to the 'resources' folder under the root of your cordova based project.

### Command line

    $ image-res-generator

or

    $ irgen

**ATTENTION:** while preserving source files, it overwrites previous output if any.

### Options

    -V, --version               output the version number
    -i, --icon [optional]       optional icon file path
                                (default: ./resources/icon.png)
    -s, --splash [optional]     optional splash file path
                                (default: ./resources/splash.png)
    -p, --platforms [optional]  optional platform token comma separated list
                                available tokens: android, ios, windows, blackberry10, pwa
                                (default: all platforms processed)
    -o, --outputdir [optional]  optional output directory
                                (default: ./resources/)
    -I, --makeicon [optional]   option to process icon files only
    -S, --makesplash [optional] option to process splash files only
    -h, --help                  output usage information

---

## Do yourself a favour

Add to your package.json a script definition to match your file generation needs.
This way, you won't have to repeat the whole command along with the options.

### An example

    {
      ...
      "scripts": {
        ...
          "resgen": "irgen -p android,ios"
      }
    }

All you have to do then is type :

    npm run resgen

NPM will cope with typing the whole command line for you.

---

## Platforms

Supported platforms:

- **iOS**
  - icons
  - splash screens
- **Android**
  - icons
  - splash screens
- **Windows**
  - icons
  - splash screens
- **Blackberry 10**
  - icons
- **PWAs**
  - icons

---

## Contributing
Thanks for your interest in contributing! 
Read up on our [guidelines](https://github.com/sebinbenjamin/image-res-generator/blob/master/CONTRIBUTING.md) to start contributing.

---

## Credits
This open-source project is made possible with the help and support of the amazing open source community. Special thanks to:

* All contributors in this project ✨💚.
* [@olivab][1] for creating and maintaining the original project [cordova-res-generator][2].
* Contributors to [cordova-res-generator][2].

[1]: https://github.com/olivab
[2]: https://github.com/olivab/cordova-res-generator

---

## License

This project is made available under the terms of the GPLv3.
See the [LICENSE file][license] for the full text of the license.

[license]: https://github.com/sebinbenjamin/image-res-generator/blob/master/LICENSE
