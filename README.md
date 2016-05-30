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

## Combine results with those of JSHint
Inspired by [gulp-jscs-stylish](https://github.com/gonsfx/gulp-jscs-stylish#combine-results-with-those-of-jshint) there is also a feature to combine the polylint results with those of [JSHint](https://github.com/spalger/gulp-jshint):
```
var gulp     = require('gulp');
var polylint = require('gulp-polylint');
var jshint   = require('gulp-jshint');

gulp.task('polylint', function() {
  return gulp.src('app/elements/**/*.html')
    .pipe(polylint())
    .pipe(jshint.extract("auto"))
    .pipe(jshint())
    .pipe(polylint.combineWithJshintResults())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter("fail"));
});
```

## License
MIT © Andrew Johnston
