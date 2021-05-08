const gulp = require('gulp')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')

function buildJs() {
	return gulp.src('./public/js/client.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/dist/js'))
}

function buildCss() {
	return gulp.src('./public/css/styles.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('public/dist/css'))
}

function buildFonts() {
	return gulp.src('./public/fonts/*.{woff,woff2}')
		.pipe(gulp.dest('./public/dist/fonts'))
}

function buildImages() {
	return gulp.src('./public/images/*.{png,jpg,svg}')
		.pipe(gulp.dest('./public/dist/images'))
}

exports.build = gulp.parallel(buildCss, buildJs, buildFonts, buildImages)