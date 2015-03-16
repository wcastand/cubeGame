var gulp = require('gulp');
var stylus = require('gulp-stylus');
var koutoSwiss = require( "kouto-swiss" );

gulp.task('default', function () {
  gulp.watch('./stylus/app.styl', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.src(event.path).pipe(stylus({ use: koutoSwiss(), compress: true })).pipe(gulp.dest('./css'));
    });
  });
