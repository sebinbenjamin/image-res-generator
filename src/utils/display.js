const colors = require('colors');

/* eslint-disable no-console */
const display = {
  info: (str) => {
    console.log(str);
  },
  success: (str) => {
    const consoleOutput = ` ${colors.green('✓')} ${str}`;
    console.log(consoleOutput);
  },
  error: (str) => {
    const consoleOutput = ` ${colors.red('✗')} ${str}`;
    console.log(consoleOutput);
  },
  header: (str) => {
    console.log('');
    console.log(str);
  },
};

module.exports = { display, colors };
