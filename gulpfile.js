var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

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

gulp.task('concatCss', function() {
	return gulp.src('target/css/**/*.css')
		   .pipe(concatCss('main/main.css'))
           .pipe(gulp.dest('target/css/'));
});

gulp.task('cssmin', function () {
	return gulp.src('target/css/main/main.css')
		   .pipe(cssmin())
		   .pipe(rename({suffix: '.min'}))
		   .pipe(gulp.dest('target/css/main/'));
});

gulp.task('concat', function() {
	return gulp.src('src/js/*.js')
           .pipe(concat('main.js'))
           .pipe(gulp.dest('target/js/'));
});

gulp.task('uglify', function() {
	return gulp.src('target/js/main.js')
           .pipe(uglify())
           .pipe(rename({suffix: '.min'}))
           .pipe(gulp.dest('target/js/'));
});

gulp.task('copyHtml', function() {
	return gulp.src('src/index.html')
           .pipe(gulp.dest('build'));
});

gulp.task('copyCss', function() {
	return gulp.src('target/css/main/main.min.css')
           .pipe(gulp.dest('build'));
});

gulp.task('copyJs', function() {
	return gulp.src('target/js/main.min.js')
           .pipe(gulp.dest('build'));
});

gulp.task('copyThirdParty', function() {
	return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/jquery/dist/jquery.min.js'])
           .pipe(gulp.dest('build/third_party'));
});