var gulp = require('gulp');
var del = require('del');

gulp.task('default', function() {
	console.log('Sonu Singh');
});

gulp.task('clean', function() {
	return del.sync(['build', 'target']);
});