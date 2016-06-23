var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var server = require('karma').Server;
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

gulp.task('default', function(callback) {
	runSequence('clean', ['css_tasks', 'js_tasks'], 'copy_tasks', 'karma', 'watch', callback);
});

gulp.task('clean', function() {
	return del.sync(['build', 'target']);
});

gulp.task('css_tasks', function(){
	return gulp.src('src/scss/**/*.scss')
	       .pipe(sass())
	       .pipe(concatCss('main.css'))
	       .pipe(cssmin())
	       .pipe(rename({suffix: '.min'}))
           .pipe(gulp.dest('build'));
});

gulp.task('js_tasks', function() {
	return gulp.src('src/js/*.js')
           .pipe(concat('main.js'))
           .pipe(uglify())
           .pipe(rename({suffix: '.min'}))
           .pipe(gulp.dest('build'));
});

gulp.task('copy_tasks', function(callback) {
	runSequence(['copyHtml', 'copyThirdParty'], callback);
});

gulp.task('copyHtml', function() {
	return gulp.src('src/index.html')
           .pipe(gulp.dest('build'));
});

gulp.task('copyThirdParty', function() {
	return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/jquery/dist/jquery.min.js'])
           .pipe(gulp.dest('build/third_party'));
});

gulp.task('karma', function (done) {
	new server({configFile: __dirname + '/karma.conf.js'}, done).start();
});

gulp.task('watch', function (callback) {
	gulp.watch('src/index.html', ['copyHtml']);
	gulp.watch('src/scss/*.scss', ['css_tasks']);
	gulp.watch('src/js/*.js', ['watchJs']);
});

gulp.task('watchJs', function (callback) {
	runSequence('js_tasks', 'karma', callback);
});
