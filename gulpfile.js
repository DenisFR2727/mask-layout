const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");

// Static server
function server() {
  browserSync.init({
    server: {
      baseDir: "src",
    },
  });
}

function styles() {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

function watch() {
  gulp.watch("src/sass/**/*.+(scss|sass)", styles);
  gulp.watch("src/*.html").on("change", browserSync.reload);
}
function html() {
  return gulp.src("src/*.html").pipe(gulp.dest("dist"));
}
function build() {
  return gulp
    .src(["src/css/**/*.css", "src/image/**/*", "src/icons/**/*"])
    .pipe(gulp.dest("dist"));
}
exports.default = gulp.parallel(watch, server, styles, html);
exports.build = gulp.series(html, build);
