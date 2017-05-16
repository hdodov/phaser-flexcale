var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("minify", function () {
	return gulp.src("dist/phaser-flexcale.js")
		.pipe(uglify())
		.pipe(rename("phaser-flexcale.min.js"))
		.pipe(gulp.dest("dist"))
		.pipe(gulp.dest("demo"));
});

gulp.task("default", ["minify"]);