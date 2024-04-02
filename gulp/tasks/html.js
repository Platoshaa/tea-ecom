import webpHtmlNosvg from "gulp-webp-html-nosvg";
import pug from "gulp-pug";
import formatHTML from "gulp-format-html";
export const html = () => {
  return app.gulp
    .src(app.path.src.pug)
    .pipe(pug({ pretty: true }))
    .pipe(formatHTML())
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
