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
	runSequence('clean', ['css', 'js', 'copy', 'karma'], 'watch', callback);
});

gulp.task('clean', function() {
	return del.sync(['target']);
});

gulp.task('css', function() {
	return gulp.src('src/scss/**/*.scss')
	       .pipe(sass())
	       .pipe(concatCss('main.css'))
	       .pipe(cssmin())
	       .pipe(rename({suffix: '.min'}))
           .pipe(gulp.dest('target'));
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
           .pipe(concat('main.js'))
           .pipe(uglify())
           .pipe(rename({suffix: '.min'}))
           .pipe(gulp.dest('target'));
});

gulp.task('karma', function(done) {
	new server({configFile: __dirname + '/karma.conf.js'}, done).start();
});

gulp.task('copy', function(callback) {
	runSequence(['copyHtml', 'copyThirdParty'], callback);
});

gulp.task('copyHtml', function() {
	return gulp.src('src/index.html')
           .pipe(gulp.dest('target'));
});

gulp.task('copyThirdParty', function() {
	return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/jquery/dist/jquery.min.js'])
           .pipe(gulp.dest('target/third_party'));
});

gulp.task('watch', function(callback) {
	gulp.watch('src/index.html', ['copyHtml']);
	gulp.watch('src/scss/*.scss', ['css']);
	gulp.watch('src/js/*.js', ['js', 'karma']);
});

