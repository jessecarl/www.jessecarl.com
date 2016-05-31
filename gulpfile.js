var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    fontAwesome = require('node-font-awesome'),
    bourbon = require('node-bourbon'),
    neat = require('bourbon-neat');

var paths = {
  sass: ["./sass/**/*.scss","!./sass/**/_*.scss"], // do not directly compile scss files that begin with "_"
  photos: "./photos/**/*.jpg"
};

var outputDirs = {
  css: './static/g/css',
  fonts: './static/g/fonts',
  photos: './static/s/img/photo'
};

gulp.task('default', ['sass','fonts']);

gulp.task('clean-css', function() {
  return gulp.src(outputDirs.css, {read: false})
    .pipe(clean());
});

gulp.task('sass', ['clean-css'], function(){
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
    .pipe(gulp.dest(outputDirs.css));
});

gulp.task('clean-fonts', function() {
  return gulp.src(outputDirs.fonts, {read: false})
    .pipe(clean());
});

gulp.task('fonts', ['clean-fonts'], function() {
  var stream = gulp.src(fontAwesome.fonts)
    .pipe(gulp.dest(outputDirs.fonts));
  return stream // make the fonts task run after dependencies run
});

var logChanges = function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};

gulp.task('watch', ['default'], function() {
  gulp.watch(paths.sass[0], ['sass']).on('change', logChanges);
});
