const program = require('commander');
const path = require('path');

const packageJSON = require('../../package.json');

// app settings and default values
const gSettings = {
  iconFile: program.icon || path.join('.', 'resources', 'icon'),
  splashFile: program.splash || path.join('.', 'resources', 'splash'),
  platforms: program.platforms || undefined,
  outputDirectory: program.outputDir || path.join('.', 'resources'),
  makeIcon: !!(program.makeIcon || (!program.makeIcon && !program.makeSplash)),
  makeSplash: !!(program.makeSplash || (!program.makeIcon && !program.makeSplash)),
  configPath: program.configPath || undefined,
};

program
  .version(packageJSON.version)
  .description(packageJSON.description)
  .option('-i, --icon [optional]', 'optional icon file path (default: ./resources/icon)')
  .option('-s, --splash [optional]', 'optional splash file path (default: ./resources/splash)')
  .option(
    '-p, --platforms [optional]',
    'optional platform token comma separated list (default: all platforms processed)',
    platformList => platformList.split(','),
  )
  .option('-o, --outputDir [optional]', 'optional output directory (default: ./resources/)')
  .option('-I, --makeIcon [optional]', 'option to process icon files only')
  .option('-S, --makeSplash [optional]', 'option to process splash files only')
  .option(
    '--configPath [optional]',
    'option to change the default config path (default: ./platforms)',
  )
  .option('-d, --debug', 'output extra debugging')
  .parse(process.argv);

if (program.debug) console.log(program.opts());

exports.gSettings = gSettings;
