const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const replace = require("gulp-replace");
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
    .src("src/sass/**/*.scss") // змініть це на ваш основний Sass файл
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
}

function watch() {
  gulp.watch("src/sass/**/*.+(scss|sass)", styles);
  gulp.watch("src/*.html").on("change", browserSync.reload);
}
function build() {
  return gulp
    .src(["src/css/**/*.css", "src/*.html", "src/image/**/*", "src/icons/**/*"])
    .pipe(gulp.dest("dist"));
}
exports.build = build;
exports.default = gulp.parallel(watch, server, styles);
// function build() {
//   return gulp
//     .src(["src/css/**/*.css", "src/*.html", "src/image/**/*", "src/icons/**/*"])
//     .pipe(replace("src/css", "dist/css"))
//     .pipe(replace("src/image", "dist/image"))
//     .pipe(replace("src/icons", "dist/icons"))
//     .pipe(gulp.dest("dist"));
// }
// function build() {
//   let buildCss = gulp.src("src/css/**/*.css").pipe(gulp.dest("dist/css"));

//   let buildHtml = gulp.src("src/*.html").pipe(gulp.dest("dist"));

//   let buildImages = gulp.src("src/image/**/*").pipe(gulp.dest("dist/image"));

//   let buildIcons = gulp.src("src/icons/**/*").pipe(gulp.dest("dist/icons"));

//   return merge(buildCss, buildHtml, buildImages, buildIcons);
// }
