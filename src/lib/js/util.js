/**
 * 自适应
 */
function r () {
  var minW = 1200, // 最小显示尺寸
      PSDsize = 19.2;// 效果图与字体大小的宽度比
  var w = $(window).width()/PSDsize;
  // if ($(window).width()<minW)w=minW/PSDsize;
  if ($(window).width()>minW)w=100;
  $('html').css('font-size', w + 'px');
};
// r();
// $(window).resize(function(){
//   r();
// });

/**
 * 鼠标悬停切换事件
 * @param {*} tabBt 触发元素
 * @param {*} tabCent 需要切换内容的dom元素
 */
function hover(tabBt, tabCent) {
  $(tabBt).hover(function(){
    var ref = $(this).attr('ref');
    $(tabBt).removeClass('action');
    $(this).addClass('action');
    $(tabCent).addClass('hide');
    $(ref).removeClass('hide');
  },function(){});
}

/**
 * 招聘信息
 */
console.log("一位新人，要经历怎样的成长，才能站在技术之巅？")
console.log("探寻这里的秘密；")
console.log("体验这里的挑战；")
console.log("加入云软，成为这里的主人。")
console.log('请将简历发送至  pengzikeng@sofyun.com（ 邮件标题请以“姓名-应聘XX职位-来自console”命名）')