var gulp = require('gulp');
var rename = require('gulp-rename');
var ninja = require('gulp-nunjucks-html');

gulp.task("ninja", function() {
   return gulp.src('./google/ui.html')
        .pipe(ninja({
            searchPaths: ['./google']
        }))
        .on('error', function(err) {
            console.log("A samurai can not bear the shame of defeat");
        })
        .pipe(rename('output.html'))
        .pipe(gulp.dest('./google'));
});