var polylint = require('polylint');
var through2 = require('through2');
var extend = require('extend');
var path = require('path');
var tap = require('gulp-tap');

var reporters = require('./reporter');

var polylintPlugin = function (opts) {
  opts = opts || {};

  return through2.obj(function (file, enc, cb) {
    var filename = file.path.replace(file.base, '');

    if (file.isNull()) {
      return cb(null, file);
    }

    if (!file.isBuffer()) {
      return cb(null, file);
    }

    var defaults = {
      root: file.base,
      redirect: file.base + 'bower_components'
    };

    opts = extend(defaults, opts);

      polylint(filename, opts)
          .then(function (results) {
              // option noRecursion like in polylint cli
              var filtered = results.filter(function (warning) {
                  if (opts.noRecursion && filename !== warning.filename) {
                      return false
                  } else {
                      return true;
                  }
              });

              file.polylint = {
                  results: filtered
              };

              return cb(null, file);
          });
  });
};

polylintPlugin.reporter = reporters;
polylintPlugin.reporter.stylishlike = require('./reporters/stylishlike');
polylintPlugin.reporter.fail = require('./reporters/fail');

module.exports = polylintPlugin;

function byErrorLine (a, b) {
  return a.error.line - b.error.line;
}

function tapPolylint (action) {
  return function (opts) {
    opts = opts || {};
    var ignoreWarnings = opts.ignoreWarnings || false;
    return tap(function (file) {
      if (!file.polylint) {
        return;
      }
      action(file, ignoreWarnings);
    });
  };
}

function toJshint (file, ignoreWarnings) {
  var errorList = file.polylint.results;
  var filePath = path.relative(process.cwd(), file.path);

  var results = [];
  errorList.forEach(function (error) {
    if (!ignoreWarnings || error.fatal) {
      results.push({
        file: filePath,
        error: {
          character: error.location.column,
          code: (error.fatal ? 'E' : 'W') + ' polylint',
          line: error.location.line,
          reason: error.message
        }
      });
    }
  });

  return results;
}

module.exports.combineWithJshintResults = tapPolylint(function (file, ignoreWarnings) {
  var results = toJshint(file, ignoreWarnings);
  if (results.length > 0) {
    file.jshint = file.jshint || {};
    file.jshint.success = false;
    file.jshint.results = (file.jshint.results || []).concat(results);
    file.jshint.results.sort(byErrorLine);
  }
});
