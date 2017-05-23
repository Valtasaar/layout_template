'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    uglifycss = require('gulp-uglifycss'),
    debug = require('gulp-debug'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    imageminJpegtran = require('imagemin-jpegtran');

gulp.task('styles', function() {
    gulp.src('resources/stylus/index.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(rename('styles.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('public/css'))
});

gulp.task('scripts', function() {
    gulp.src('resources/js/script.js')
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(concat('script.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('libs-js-concat', function() {
    gulp.src('resources/libs/libs-scripts.js')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(concat('libs-scripts.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('libs-scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('libs-css-concat', function() {
    gulp.src('resources/libs/libs-styles.css')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(concat('libs-styles.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(rename('libs-styles.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('public/css'));
});

gulp.task('minimg', function() {
    gulp.src(['resources/img/header/*',
            'resources/img/ref_slider/*',
            'resources/img/work_slider/*',
            'resources/img/*'],
        {base: 'resources/'})
        .pipe(imagemin([imageminJpegtran({
            progressive: true
        })], {
            verbose: true
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', function() {
    gulp.watch('resources/stylus/*.styl', ['styles']);
    gulp.watch('resources/js/*.js', ['scripts']);
});