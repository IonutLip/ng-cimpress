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
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache'),
    watch = require('gulp-watch'),
    less = require('gulp-less-sourcemap');

var src = {
        js: {
            custom: [
                './app/**/*.module.js',
                './app/**/*.js'
            ]
            //,
            //libs:[
            //    "./bower_components/angular/angular.min.js",
            //    "./bower_components/jquery/dist/jquery.min.js",
            //    "./bower_components/angular-route/angular-route.min.js",
            //    "./bower_components/angular-animate/angular-animate.min.js",
            //    "./bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js",
            //    "./bower_components/jquery-ui/jquery-ui.min.js",
            //    "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
            //    "./bower_components/bootstrap/dist/js/bootstrap.min.js"
            //]
        },
        css: {
            custom: [
                './css/*.less'
            ],
            libs: [
                "/bower_components/bootstrap/dist/css/bootstrap.min.css"
            ]
        },
        img: {
            custom: [
                './img/*.jpg'
            ]
        },
        html: {
            main: './index.html',
            templates: './app/**/*.html'

        }
    },
    dest = './dest';

gulp.task('css', function () {
   return gulp.src(src.css.custom)
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.join(dest+'/css')));
});

gulp.task('html', function () {
    function baseFn(file) {
        var path = file.relative.match(/\w+(.html)|\w+-\w+(.html)/g);
        return './' + path;
    }

    return gulp.src(src.html.templates)
        .pipe(templateCache('templates.js', {
            module: 'app',
            standalone: false,
            base: baseFn
        }))
        .pipe(gulp.dest(dest + '/js'));
});

//gulp.task('libs-js',function(){
//    //return gulp.src(src.js.libs)
//    //    .pipe(uglify())
//    //    .pipe(gulp.dest(path.join(dest,'/js/libs')));
//});

gulp.task('js', function () {
    return gulp.src(src.js.custom)
        .pipe(ngAnnotate())
        .pipe(concat('./js/all.js'))
        .pipe(gulp.dest(dest));
});

gulp.task('img', function () {
    return gulp.src(src.img.custom)
        .pipe(gulp.dest(dest + '/img'));
});

gulp.task('watch', ['default'], function () {
    return gulp.watch(
        [
            './app/**/*.js',
            './app/**/*.html',
            './css/*.less'
        ],
        ['default']);
});

gulp.task('clean', function () {
    return del(['./dest/*']);
});

gulp.task('default', ['clean', 'html', 'img', 'js', 'css'], function () {
    var source = gulp.src(mainBowerFiles()
        .concat(['./dest/**/*.js'])
        .concat(['./dest/**/*.css']), {read: false}, {relative: true});

    return gulp.src(src.html.main)
        .pipe(inject(source))
        .pipe(gulp.dest(dest));
});