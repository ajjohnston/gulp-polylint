var PluginError = require('gulp-util').PluginError;
var through2 = require('through2');

function loadReporter (reporter) {
  if (typeof reporter === 'function') {
    return reporter;
  } else if (typeof reporter === 'string') {
    return loadReporter(require(reporter));
  }
}

module.exports = function (reporter) {
  var rpt = loadReporter(reporter);

  if (typeof rpt !== 'function') {
    throw new PluginError('gulp-polylint', 'Invalid reporter');
  }

  return through2.obj(function (file, enc, cb) {
    if (file.polylint) {
      rpt(file);
    }

    cb(null, file);
  });
};
