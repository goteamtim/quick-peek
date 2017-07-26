var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload 		= browserSync.reload;
var nodemon     = require('nodemon')

gulp.task('default', ['browser-sync'], function () {
	gulp.watch(['app','views'], reload);
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        baseDir: "./",
        files: ['app','views'],
        port: 7000,
		notify: true
	});
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'index.js',
		ext: 'js html css',
		watch: ['app','views']
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});