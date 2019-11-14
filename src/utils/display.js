const colors = require('colors');

/* eslint-disable no-console */
const display = {
  info: (str) => {
    console.info(str);
  },
  success: (str) => {
    const consoleOutput = ` ${colors.green('✓')} ${str}`;
    console.info(consoleOutput);
  },
  error: (str) => {
    const consoleOutput = ` ${colors.red('✗')} ${str}`;
    console.info(consoleOutput);
  },
  header: (str) => {
    console.info('');
    console.info(str);
  },
};

module.exports = { display, colors };
