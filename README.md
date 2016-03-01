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


## License
MIT © Andrew Johnston
