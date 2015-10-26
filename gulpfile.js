var gulp = require('gulp'),
    minifyCss = require("gulp-minify-css"),
    plumber = require("gulp-plumber"),
    sourceMaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    browserSync = require("browser-sync");

gulp.task('html', function () {
    return gulp.src('./autocomplete.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('libs', function () {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js'
    ])
        .pipe(gulp.dest('./dist/js/libs'));
});

gulp.task('js', function () {
    return gulp.src('./autocomplete.js')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function () {
    return gulp.src('./autocomplete.css')
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function () {

});

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['html', 'libs', 'js', 'css']);
