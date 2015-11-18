var gulp = require('gulp'),
    path = require('path'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    mainBowerFiles = require('main-bower-files'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    del = require('del'),
    rename = require('gulp-rename');

var src = {
        js: {
            custom: [
                './app/**/*.js'
            ]
        },
        css: {
            custom: [
                './app/content/css/style.css'
            ]
        },
        img:{
          custom:[
              './app/content/**/*.jpg'
          ]
        },
        html: {
            main: './app/index.html',
            templates: [
                './app/**/*.html'
            ]
        }
    },
    dest = './dest';

gulp.task('css',function(){
    return gulp.src(src.css.custom)
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.join(dest, '/content/css')));
});

gulp.task('html',function(){
    return gulp.src(src.html.templates)
        .pipe(rename({dirname: '/templates'}))
        .pipe(gulp.dest(path.join(dest)));
});

gulp.task('js',function(){
    return gulp.src(src.js.custom)
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(concat('./js/all.js'))
        .pipe(gulp.dest(dest));
});
gulp.task('img',function(){
    return gulp.src(src.img.custom)
        .pipe(rename({dirname: '/content/img'}))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', ['default'], function() {
    return gulp.watch(
        [
            './app/**/*.js',
            './app/**/*.html',
            './app/**/*.css'
        ],
        ['default']);
});

gulp.task('clean', function () {
    return del(['./dest/*']);
});

gulp.task('default', ['html','img','js','css'], function() {
    var source = gulp.src(mainBowerFiles()
        .concat(['./dest/js/**/*.js'])
        //.concat(['./app/js/**/*.js'])
        .concat(['./dest/**/*.css']), { read: false },{relative: true});

return gulp.src(src.html.main)
    .pipe(inject(source))
    .pipe(gulp.dest(dest));
});