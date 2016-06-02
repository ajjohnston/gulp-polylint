# gulp-polylint

Polylint plugin for gulp

## Installation
```
npm install gulp-polylint --save-dev
```

## Usage
```
var gulp     = require('gulp');
var polylint = require('gulp-polylint');

gulp.task('polylint', function() {
  return gulp.src('app/elements/**/*.html')
    .pipe(polylint())
    .pipe(polylint.reporter(polylint.reporter.stylishlike));
});
```

### Fail reporter
You can also let the build fail on errors or warnings:
```
gulp.task('polylint', function() {
  return gulp.src('app/elements/**/*.html')
    .pipe(polylint())
    .pipe(polylint.reporter(polylint.reporter.stylishlike))
    .pipe(polylint.reporter.fail({ buffer: true, ignoreWarnings: false }));
});
```
The example above shows the default (optional) options to the fail reporter.
Set `buffer` to false to immediately fail the build after the first erroneous file. Do not fail on warnings with `ignoreWarnings` set to true.

### Combine results with those of JSHint
Inspired by [gulp-jscs-stylish](https://github.com/gonsfx/gulp-jscs-stylish#combine-results-with-those-of-jshint) there is also a feature to combine the polylint results with those of [JSHint](https://github.com/spalger/gulp-jshint):
```
var gulp     = require('gulp');
var polylint = require('gulp-polylint');
var jshint   = require('gulp-jshint');

gulp.task('polylint', function() {
  return gulp.src('app/elements/**/*.html')
    .pipe(polylint())
    .pipe(jshint.extract('auto'))
    .pipe(jshint())
    .pipe(polylint.combineWithJshintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
```
The `combineWithJshintResults` function can also be called with a configuration object:
```
...
    .pipe(polylint.combineWithJshintResults({ ignoreWarnings: true }))
...
```
Currently the only option is `ignoreWarnings` which defaults to false. If set to true, polylint warnings (not fatal) will be skipped in the process.

## License
MIT © Andrew Johnston
