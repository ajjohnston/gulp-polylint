var polylint = require('polylint');
var through2 = require('through2');
var extend = require('extend');

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
        file.polylint = {
          results: results
        };

        return cb(null, file);
      });
  });
};

polylintPlugin.reporter = reporters;
polylintPlugin.reporter.stylishlike = require('./reporters/stylishlike');

module.exports = polylintPlugin;
