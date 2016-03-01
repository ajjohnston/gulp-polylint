var chalk = require('chalk');
var logSymbols = require('log-symbols');
var plur = require('plur');

module.exports = function (file) {
  var totalErrors = 0;
  var totalWarnings = 0;
  var prevFile;

  var results = file.polylint.results;

  var filename = file.path.replace(file.base, '');

  if (prevFile != filename) {
    console.log(chalk.underline(filename));
    prevFile = filename;
  }

  file.polylint.results.forEach(function (result) {
    var line = [
      '',
      chalk.gray('line ' + result.location.line),
      chalk.gray('col ' + result.location.column),
      result.fatal ? chalk.red(result.message) : chalk.blue(result.message)
    ].join(' ');

    console.log(line);

    if (result.fatal) {
      totalErrors++;
    } else {
      totalWarnings++;
    }
  });

  if (results.length > 0) {
    if (totalErrors > 0) {
      console.log(' ' + logSymbols.error, ' ' + totalErrors + ' ' + plur('error', totalErrors));
    }

    if (totalWarnings > 0) {
      console.log(' ' + logSymbols.warning, ' ' + totalWarnings + ' ' + plur('warning', totalWarnings));
    }
  } else {
    console.log(' ' + logSymbols.success + ' No issues found');
  }
};
