var gulp = require('gulp'),
    del = require('del'),
    fileinclude  = require('gulp-file-include'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify=require('gulp-uglify'),
    less = require('gulp-less');

gulp.task('build:image', ['image']);

gulp.task('dev', ['html', 'less', 'js'], function(cb){return cb();});

gulp.task('build', ['build:image', 'dev'], function(cb){return cb();});

gulp.task('start', ['dev', 'html-watch', 'less-watch', 'js-watch', 'server', 'server-watch' ]);

/* 清理输出目录 */
gulp.task('clean', function (cb) {
  del(['dist/'],cb);
});

/* html模块 */
// html监听
gulp.task('html-watch', function () {
  gulp.watch(['src/**/*.html'], ['html']);
});
// 模块引用, html优化
gulp.task('html', function(cb) {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  gulp.src(['src/**/*.html', '!src/components/**/*.html'])
  .pipe(fileinclude({
    prefix: '@@',
    indent:true//保留文件的缩进
  }))
  .pipe(htmlmin(options)) // 优化压缩html
  .pipe(gulp.dest('dist'));

  return cb();
});

/* less、css转换优化 */
// less监听
gulp.task('less-watch', function () {
  gulp.watch(['src/**/*.less'], ['less']);
});
// less转换,css优化
gulp.task('less', function (cb) {
  gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 5%']
    }))
    .pipe(csso())
    .pipe(gulp.dest('dist'));
  return cb();
});

gulp.task('js-watch', function () {
  gulp.watch(['src/**/*.js'], ['js']);
});
// js优化
gulp.task('js', function (cb) {
  gulp.src('src/**/*.js')
    .pipe(uglify({  
      mangle:true,//类型：Boolean 默认：true 是否修改变量名  
      compress:true//类型：Boolean 默认：true 是否完全压缩  
    }))
    .pipe(gulp.dest('dist'));
  return cb();
});


// 图片优化
gulp.task('image-watch', function () {
  gulp.watch(['src/**/*.{png,jpg,gif,ico}'], ['image']);
});
gulp.task('image', function (cb) {
  gulp.src('src/**/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true,    //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true,     //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true       //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist'));
  return cb();
});

/* web服务 */
gulp.task('server', function() {
  connect.server({
    root: 'dist',
    post: 8888,
    // host: '192.168.0.110',
    livereload: true
  });
});

// web服务文件变更监听
gulp.task('server-update', function () {
  gulp.src('dist/**/*.*')
  .pipe(connect.reload());
});
gulp.task('server-watch', function(){
  gulp.watch(['dist/**/*.*'], ['server-update']);
});