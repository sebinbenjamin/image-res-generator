<!-- ## [Unreleased]
Added       - for new features.
Changed     - for changes in existing functionality.
Deprecated  - for soon-to-be removed features.
Removed     - for now, removed features.
Fixed       - for any bug fixes.
Security    - in case of vulnerabilities. -->

## [[0.7.0] - 2024-08-11](https://github.com/sebinbenjamin/image-res-generator/compare/0.6.2...0.7.0)

### Changed
- After being archived for 2 years, the project has been reactivated.
- Updated all dependencies and development tools to their latest versions to ensure compatibility and security.

### Security
- Addressed potential vulnerabilities by upgrading outdated dependencies.

### Note
- Additional changes and improvements will follow soon.

## [[0.6.2] - 2019-07-20](https://github.com/sebinbenjamin/image-res-generator/compare/0.6.1...0.6.2)

### Added (dev-features)
- Project contribution guidelines, pull request template, to enable easier contribution.
- Setup ESlint and commitlint to enforce coding standards and conventional commits.  

### Security
- Updated several dependency packages to their latest versions.


## [[0.6.1] - 2019-07-01](https://github.com/sebinbenjamin/image-res-generator/compare/0.6.0...0.6.1)

### Fixed
 - Bug in PWA resources filename character.

## [[0.6.0] - 2019-07-01](https://github.com/sebinbenjamin/image-res-generator/compare/0.5.0...0.6.0)
### Added
 - Support for Ionic 4 PWA resource generation.
 - Support for SVG file format
 - New resource image sizes - 'icon-1024.png', name: 'icon-20.png', 'icon-44@2x.png', 'Default-Portrait-iphonex.png', 'Default-Landscape-iphonex.png'
 - 'configPath' CLI option to use custom configs.

### Changed
 - New image processing library - Sharp image processor.
 - Image resize behaviour changed to 'cover' instead of 'crop'.

### Security
Updated all packages to the latest stable version, including several with critical vulnerabilities.