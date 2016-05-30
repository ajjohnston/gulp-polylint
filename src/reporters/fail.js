var path = require('path');
var through2 = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function (opts) {
  opts = opts || {};

  // @type false|[]paths - paths to files that failed jshint
  var fails = false;

  // @type false|[]files - files that need to be passed downstream on flush
  var buffer = opts.buffer !== false ? [] : false;

  var errors = false;
  var warnings = false;

  return through2({ objectMode: true }, function (file, enc, done) {

    if (file.polylint && file.polylint.results && file.polylint.results.length) {
      file.polylint.results.forEach(function (result) {
        if (result.fatal) {
          errors = true;
        } else {
          warnings = true;
        }
      });
      (fails = fails || []).push(path.relative(process.cwd(), file.path));
    }

    (buffer || this).push(file);

    done();
  }, function (done) {
    var failOnWarning = !opts.ignoreWarnings && warnings;
    if (fails && (errors || failOnWarning)) {
      this.emit('error', new PluginError('gulp-polylint', {
        message: 'Polylint failed for: ' + fails.join(', '),
        showStack: false
      }));
    }

    if (buffer) {
      // send the buffered files downstream
      buffer.forEach(function (file) {
        this.push(file);
      }, this);
    }

    done();
  });
};
