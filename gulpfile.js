var gulp = require('gulp'),
    jade = require('gulp-jade'),
    notify = require('gulp-notify'), 
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('styles',function(){
  gulp.src('./src/css/*.css')
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify('Style task complete'))
})

gulp.task('scripts',function(){
  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(notify('Scripts task complete'))
})

gulp.task('templates', function() {
  var options = {pretty: true};
 
  gulp.src('./views/*.jade')
    .pipe(jade(options))
    .pipe(gulp.dest('./'))
    .pipe(notify("Templates task complete"))
});

gulp.task('templatesLayouts', function() {
  var options = {pretty: true};
 
  gulp.src('./views/layouts/*.jade')
    .pipe(jade(options))
    .pipe(gulp.dest('./layouts'))
    .pipe(notify("templatesLayouts task complete"))
});



gulp.task('clean',function(cb){
  del(['./dist'],cb)
})


gulp.task('default',['clean'],function(){
  gulp.start('styles','scripts','templates');
})

gulp.task('watch',function(){
  //gulp.watch('./src/css/*.css',['styles']);
  //gulp.watch('./src/js/*.js',['scripts']);
  //gulp.watch(,['templates']);
  gulp.watch(['./views/layouts/*.jade','./views/*.jade','./src/css/*.css','./src/js/*.js'],['templatesLayouts','templates','styles','scripts']);
})

