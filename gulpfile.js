var gulp = require('gulp')
,uglify = require('gulp-uglify')
,gulpUtil = require('gulp-util')
,imagemin = require('gulp-imagemin')
,stripDebug = require('gulp-strip-debug')
,notify = require("gulp-notify")
,stylus = require('gulp-stylus')
,nib = require('nib')
,rename = require('gulp-rename')
,colors = require('colors')

var srcIMG = 'public/img/**/*'

,srcJS = 'public/js/**/*.js'

,srcCSS = 'public/stylus/**/*.styl'
,srcStyle = 'public/stylus/styles.styl'

function changePath(path){
	var destPath = path.replace("public","dist").replace(/\/+\w+\.+(js|css|styl|png|jpg||svg)/,"")
	if(destPath.indexOf("stylus") != -1){
		destPath = destPath.replace("stylus","css")
	}
	return destPath
}

function minJS(file){

	var destJS = changePath(file.path)

	gulp
	.src(file.path)
	.pipe(stripDebug())
	.pipe(uglify().on('error', gulpUtil.log))
	//.pipe(rename({suffix: "-min",}))
	.pipe(gulp.dest(destJS))
	.pipe(notify({
		title : "Javascript",
		message: "Minified file: <%= file.relative %>"
		}))

}

function compileStyl(file) {

	var destCSS = changePath(file.path)

	gulp
	.src(file.path)
	.pipe(stylus({use: nib(),compress: true}))
	.pipe(gulp.dest(destCSS))
	.pipe(notify({
		title : "Stylus",
		message: "Compile : <%= file.relative %>"
		}))
}

function minImg(file){
	var destIMG = changePath(file.path)


	gulp
	.src(file.path)
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}]
		}))
	.pipe(gulp.dest(destIMG))
	.pipe(notify({
		title : "Image",
		message: "Minified file: <%= file.relative %>"
		}))
}

gulp.task('default', function () {

	gulp.watch(srcJS).on('change',minJS)
	gulp.watch(srcCSS).on('change',compileStyl).on('added',compileStyl)
	gulp.watch(srcIMG).on('change',minImg)

	});
