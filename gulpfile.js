var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    fontAwesome = require('node-font-awesome'),
    bourbon = require('node-bourbon'),
    neat = require('bourbon-neat');

var paths = {
  sass: ["./sass/**/*.scss","!./sass/**/_*.scss"] // do not directly compile scss files that begin with "_"
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
    .pipe(gulp.dest('./static/g/css/'));
});

gulp.task('fonts', function() {
    gulp.src(fontAwesome.fonts)
      .pipe(gulp.dest('./static/g/fonts/'));
});

var logChanges = function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};

gulp.task('watch', ['default'], function() {
  gulp.watch('./sass/**/*.scss', ['sass']).on('change', logChanges);
});
