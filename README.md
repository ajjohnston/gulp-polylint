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

## License
MIT © Andrew Johnston
