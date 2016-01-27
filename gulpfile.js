var gulp = require('gulp');
var browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer');

var gp = require('gulp-load-plugins')();
var babel = function() {
	return gp.babel({
			presets: ['es2015']
		});
	};

var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync'),
		reload = browserSync.reload;


// @Main serve section

gulp.task('serve', ['css', 'js', 'html'], function() {
  browserSync({
    notify: true,
    port: 9000,
    server: {
      baseDir: 'app'
		},
		ui: {
    port: 9090
		},
		open: 'ui',
		files: ['app/*.html', 'app/scripts/**/*.js', 'app/styles/**/*.css']
  });

  gulp.watch([
		'app/images/**/*',
		'app/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('sources/styles/**/*.scss', ['sass']);
	gulp.watch('sources/styles/**/*.css', ['css']);
	gulp.watch('sources/scripts/**/*.js', ['js']);
	gulp.watch('sources/*.html', ['html']);
});

// @@End of main section
//
// @HTML parsers / helpers for build && distributive tasks

gulp.task('htmlparse', function() {
	return gulp.src('sources/*.html')
	//.pipe(wiredep())
	.pipe(gp.useref({searchPath: 'app'}))
	.pipe(gp.size({title: 'Production', showFiles: true}))
	.pipe(gulp.dest('app/'));
})

gulp.task('html', ['htmlparse'], function() {
	return gulp.src('app/*.html')
	.pipe(gp.htmlmin({collapseWhitespace: false}))
	.pipe(gulp.dest('app/'));
})

// @@End of HTML portion
//
// @CSS parsers / helpers for build && distributive tasks

gulp.task('sass', function() {
	return gulp.src('sources/styles/**/*.scss')
	.pipe(gp.sass.sync({
		outputStyle: 'expanded',
		precision: 10,
		includePaths: ['.']
	}).on('error', gp.sass.logError))
	.pipe(gulp.dest('sources/styles/'));
})

gulp.task('css', ['sass'], function() {
	return gulp.src('sources/styles/*.css')
		.pipe(gp.plumber())
		.pipe(gp.concat('main.css'))
		.pipe(gp.sourcemaps.init())
		.pipe(gp.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gp.cssnano())
		.pipe(gp.sourcemaps.write('.'))
		.pipe(gp.size({title: 'Production', showFiles: true, gzip: true}))
		.pipe(gulp.dest('app/styles/'));
})

// @@End of CSS portion
//
// @JavaScript parsers / helpers for ES2015 issues compiling && build && distributive tasks

gulp.task('jscompile', function() {
	return gulp.src('sources/scripts/*.js')
		.pipe(babel())
		.pipe(gp.jshint())
		.pipe(gp.size())
		.pipe(gulp.dest('.temp'));
})

gulp.task('js', ['jscompile'], function() {
	var bundled = browserify({ basedir : '.temp'});
	return bundled.add('./main.js')
		.bundle()
		.on('error', function(err) { console.error(err); this.emit('end'); })
		.pipe(source('build.js'))
		.pipe(buffer())
		.pipe(gp.jshint())
		.pipe(gp.sourcemaps.init({loadMaps: true}))
		.pipe(gp.uglify())
		.pipe(gp.sourcemaps.write('.'))
		.pipe(gp.size({title: 'Production', showFiles: true, gzip: true}))
		.pipe(gulp.dest('app/scripts/'));
})

// @@End of JavaScript portion
