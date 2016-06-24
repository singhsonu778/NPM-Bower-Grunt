var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({pattern : '*'});

gulp.task('default', function(callback) {
	plugins.runSequence('clean', ['css', 'js', 'copy', 'karma'], 'browser-sync', 'watch', callback);
});

gulp.task('clean', function() {
	return plugins.del.sync(['target']);
});

gulp.task('css', function() {
	return gulp.src('src/scss/**/*.scss')
	       .pipe(plugins.sass())
	       .pipe(plugins.concatCss('main.css'))
	       .pipe(plugins.cssmin())
	       .pipe(plugins.rename({suffix: '.min'}))
           .pipe(gulp.dest('target'));
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
           .pipe(plugins.concat('main.js'))
           .pipe(plugins.uglify())
           .pipe(plugins.rename({suffix: '.min'}))
           .pipe(gulp.dest('target'));
});

gulp.task('karma', function(done) {
	new plugins.karma.Server({configFile: __dirname + '/karma.conf.js'}, done).start();
});

gulp.task('copy', function(callback) {
	plugins.runSequence(['copyHtml', 'copyThirdParty'], callback);
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

gulp.task('browser-sync', function() {
   var files = [
      'src/**/*.html',
      'src/scss/**/*.scss',
      'src/js/**/*.js'
   ];

   plugins.browserSync.init(files, {
      server: {
         baseDir: 'target'
      }
   });
});
