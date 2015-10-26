/*jslint node: true */
/*jshint node: true */
'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    minifyCss = require("gulp-minify-css"),
    plumber = require("gulp-plumber"),
    uglify = require("gulp-uglify"),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload;

gulp.task('html', function () {
    return gulp.src('./autocomplete.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('libs', function () {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js'
    ])
        .pipe(gulp.dest('./dist/js/libs'));
});

gulp.task('js', function () {
    return gulp.src('./autocomplete.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename('autocomplete.min.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src('./autocomplete.css')
        .pipe(plumber())
        .pipe(minifyCss())
        .pipe(rename('autocomplete.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: 'autocomplete.html'
        }
    });

    gulp.watch('autocomplete.html', ['html']).on('change', reload);
    gulp.watch('autocomplete.js', ['js']).on('change', reload);
    gulp.watch('autocomplete.css', ['css']).on('change', reload);
});

gulp.task('default', ['build', 'serve']);
gulp.task('build', ['html', 'libs', 'js', 'css']);
