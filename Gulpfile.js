// Gulp and plugins
var gulp = require('gulp'),
  umd    = require('gulp-umd'),
  rimraf = require('gulp-rimraf'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  connect = require('gulp-connect'),
  testem = require('gulp-testem');

// paths
var src = './src/js/',
  dist = './dist/',
  jsFiles = [src + 'sample_extension.js'];

gulp.task('default', ['jshint', 'test', 'build:js']);

gulp.task('clean', function () {
  return gulp.src(dist + '*', {read: false})
    .pipe(rimraf());
});

gulp.task('build:js', ['clean'], function () {
  return gulp.src(jsFiles)
    .pipe(concat({path: 'sample_exstension.js'}))
    .pipe(umd(
        {
          dependencies:function() {
            return [{
              name: 'd3',
              amd: 'd3',
              cjs: 'd3',
              global: 'd3',
              param: 'd3'
            },
            {
              name: 'jquery',
              amd: 'jquery',
              cjs: 'jquery',
              global: 'jQuery',
              param: '$'
            },
            {
              name: 'MG',
              amd: 'MG',
              cjs: 'MG',
              global: 'MG',
              param: 'MG'
            }];
          }
        }
    ))
    .pipe(gulp.dest(dist));
});

// Check source js files with jshint
gulp.task('jshint', function () {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Run test suite server (testem')
gulp.task('test', function() {
  return gulp.src([''])
    .pipe(testem({
      configFile: 'testem.json'
    }));
});

// Development server tasks
var roots = ['dev', 'dist', 'src'],
    watchables = roots.map(function(root) {
        return root + '/**/*';
    });

gulp.task('dev:watch', function() { return gulp.watch(watchables, ['jshint', 'dev:reload']); });
gulp.task('dev:reload', function() { return gulp.src(watchables).pipe(connect.reload()); });
gulp.task('serve', ['jshint', 'dev:serve', 'dev:watch']);

gulp.task('dev:serve', function() {
    connect.server({
        root: roots.concat(['bower_components']),
        port: 4300,
        livereload: true
    });
});
