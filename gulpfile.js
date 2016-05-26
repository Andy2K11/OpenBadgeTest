var gulp = require('gulp');
var rename = require('gulp-rename');
var ninja = require('gulp-nunjucks-html');
var sass = require('gulp-sass');
var seq = require('run-sequence');

gulp.task("styles", function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./.tmp'));
});

gulp.task("styles:watch", function () {
    gulp.watch('./src/sass/**/*.scss', ['ninja']);
});

gulp.task("html:watch", function () {
    gulp.watch([
        './src/**/*.html', 
        './src/js/**/*.js'
    ],
    ['inject:html']);
});

gulp.task("watch", ['styles:watch', 'html:watch']);

gulp.task("rename-gs", function () {
    return gulp.src('./src/appsScripts/**/*.js')
        .pipe(rename(function (path) {
            path.extname = ".gs";
        }))
        .pipe(gulp.dest('./build/gs'));
});

gulp.task("inject:html", function () {
   return gulp.src('./src/base.html')
        .pipe(ninja({
            searchPaths: [
                './src',
                './src/js',
                './.tmp'
            ]
        }))
        .on('error', function(err) {
            console.log("A samurai cannot bear the shame of defeat");
            console.log(err);
        })
        .pipe(rename('ui.html'))
        .pipe(gulp.dest('./build'));
});

gulp.task("ninja", function () {
    seq('styles', ['inject:html']);
});