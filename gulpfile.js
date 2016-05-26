var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    fontAwesome = require('node-font-awesome'),
    bourbon = require('node-bourbon'),
    neat = require('bourbon-neat');

var paths = {
  sass: "./sass/main.scss" // everything is from main
};

gulp.task('default', ['sass','fonts']);

gulp.task('sass', function(){
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        require('node-normalize-scss').includePaths,
        fontAwesome.scssPath,
        bourbon.includePaths,
        neat.includePaths
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css'));
});

gulp.task('fonts', function() {
    gulp.src(fontAwesome.fonts)
      .pipe(gulp.dest('./static/fonts'));
});
