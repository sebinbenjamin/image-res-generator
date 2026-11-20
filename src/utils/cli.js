const { Command } = require('commander');
const path = require('path');
const packageJSON = require('../../package.json');

const program = new Command();

program
  .name('image-res-generator')
  .version(packageJSON.version)
  .description(packageJSON.description)
  .option(
    '-i, --icon [optional]',
    'optional icon file path (default: ./resources/icon)',
    path.join('.', 'resources', 'icon')
  )
  .option(
    '-s, --splash [optional]',
    'optional splash file path (default: ./resources/splash)',
    path.join('.', 'resources', 'splash')
  )
  .option(
    '-p, --platforms [optional]',
    'optional platform token comma separated list [android,ios,windows,blackberry10,pwa] (default: all platforms processed)',
    (platformList) => platformList.split(',')
  )
  .option(
    '-o, --outputDir [optional]',
    'optional output directory (default: ./resources/)',
    path.join('.', 'resources')
  )
  .option('-I, --makeIcon [optional]', 'option to process icon files only')
  .option('-S, --makeSplash [optional]', 'option to process splash files only')
  .option(
    '--configPath [optional]',
    'option to change the default config path (default: ./platforms)',
    './platforms'
  )
  .option('-d, --debug', 'output extra debugging', false)
  .parse(process.argv);

if (program.opts().debug) console.debug(program.opts());

// app settings and default values
const cliParams = {
  iconFile: program.opts().icon,
  splashFile: program.opts().splash,
  platforms: program.opts().platforms || undefined,
  outputDirectory: program.opts().outputDir,
  makeIcon: !!(
    program.opts().makeIcon ||
    (!program.opts().makeIcon && !program.opts().makeSplash)
  ),
  makeSplash: !!(
    program.opts().makeSplash ||
    (!program.opts().makeIcon && !program.opts().makeSplash)
  ),
  configPath: program.opts().configPath || undefined,
};

module.exports = { cliParams };
