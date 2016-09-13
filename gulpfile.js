var gulp = require('gulp');
var webserver = require('gulp-webserver');
    sass   = require('gulp-sass');
/* jshint task would be here */
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var appSrc = '';

gulp.task('copyLibs',function(){
	gulp.src([
		'node_modules/es6-shim/es6-shim.min.js',
		'node_modules/systemjs/dist/system-polyfills.js',
		'node_modules/angular2/bundles/angular2-polyfills.js',
		'node_modules/systemjs/dist/system.src.js',
		'node_modules/rxjs/bundles/Rx.js',
		'node_modules/angular2/bundles/angular2.dev.js',
		'node_modules/angular2/bundles/http.dev.js',
		'node_modules/angular2/bundles/router.dev.js',
		'node_modules/typescript/lib/typescript.js',
		])
	.pipe(gulp.dest(appSrc+ 'js/lib/angular2'));

	gulp.src([
		'node_modules/jquery/dist/jquery.js'
		])
	.pipe(gulp.dest(appSrc+ 'js/lib/jquery'));

	gulp.src(
		'node_modules/bootstrap-sass/assets/stylesheets/*.scss')
		.pipe(sass())
		.pipe(gulp.dest(appSrc+ 'js/lib/bootstrap'));

	gulp.src(
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js')
		.pipe(gulp.dest(appSrc+ 'js/lib/bootstrap'));
	
	gulp.src(
		'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.*')
		.pipe(gulp.dest(appSrc+ 'js/lib/fonts/bootstrap'));
		

	gulp.src([
		'node_modules/croppie/croppie.css',
		'node_modules/croppie/croppie.js',
		'node_modules/trumbowyg/dist/trumbowyg.js',
		'node_modules/trumbowyg/dist/ui/trumbowyg.css',
		'node_modules/country-select-js/build/css/countrySelect.css',
		'node_modules/country-select-js/build/js/countrySelect.js',
		])
	.pipe(gulp.dest(appSrc+ 'js/lib/plugin'));
	gulp.src([
		'node_modules/country-select-js/build/img/flags.png'
		])
	.pipe(gulp.dest(appSrc+ 'js/lib/img'));
	gulp.src([
		'node_modules/trumbowyg/dist/ui/icons.svg',
		])
	.pipe(gulp.dest(appSrc+ 'js/lib/plugin/ui'));
	
	gulp.src([
		'node_modules/moment/moment.js',
		'node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
		'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'])
		.pipe(gulp.dest(appSrc+ 'js/lib/bootstrap-datetimepicker'));

});

gulp.task('build-css', function() {
  return gulp.src('app/**/*.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('app'));
});

/* updated watch task to include sass */
gulp.task('watch', function() {
  gulp.watch(['app/**/*.scss'], ['build-css']);
});

gulp.task('webserver',function(){
	gulp.src(appSrc)
	.pipe(webserver({
		livereload:true,
		open:true
	}));
});

gulp.task('default',['copyLibs','webserver', 'watch']);