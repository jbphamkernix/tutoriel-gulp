const { src, dest, watch, parallel, series } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const notify = require("gulp-notify");
const uglify = require('gulp-uglify');

function sassFront() {
  return src('./src/sass/**/*.scss')
  .pipe(sass().on('error', notify.onError(function (error) {
     return  error;
  })))
  .pipe(postcss([
    autoprefixer({
      overrideBrowserslist: ['last 3 version']
    })
  ]))
  .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
  .pipe(rename({ suffix: ".min" }))
  .pipe(dest('./dist/css'));
};

function jsFront() {
  return src('./src/js/**/*.js')
  .pipe(uglify())
  .pipe(rename({ suffix: ".min" }))
  .pipe(dest('./dist/js'));
};

exports.sassFront = sassFront;

exports.jsFront = jsFront;

exports.watch = function () {
  watch('./src/sass/**/*.scss', series('sassFront'));
  watch('./src/js/**/*.js', series('jsFront'));
};


exports.default = series(parallel(sassFront, jsFront));
