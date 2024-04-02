import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import del from "del";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import {
  otfToTtf,
  ttfToWoff,
  woff,
  fontStyle,
} from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.src.svgicons, svgSprive);
}
export const resetFont = () => {
  return del(`${path.srcFolder}/scss/fonts.scss`);
};
const fonts = gulp.series(
  resetFont,
  otfToTtf,
  ttfToWoff,
  woff,
  fontStyle
);
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images, svgSprive)
);
const dev = gulp.series(
  reset,
  mainTasks,
  gulp.parallel(watcher, server)
);
const build = gulp.series(reset, mainTasks);

export { build, dev };
gulp.task("default", dev);
