var gulp = require("gulp"),
    include = require("gulp-include");

gulp.task("scripts", function () {
    console.log("-- gulp is running task 'scripts'");

    gulp.src("src/main.js")
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest("dist/js"));
});

gulp.task("default", ["scripts"]);