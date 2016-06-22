var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');

gulp.task('default', function() {
	console.log('Sonu Singh');
});

gulp.task('clean', function() {
	return del.sync(['build', 'target']);
});

gulp.task('sass', function(){
	return gulp.src('src/scss/**/*.scss')
	       .pipe(sass())
           .pipe(gulp.dest('target/css'));
});