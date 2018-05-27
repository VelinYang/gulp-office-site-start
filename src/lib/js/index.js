// 导航栏背景变更起始位置
Header.fixedNav('.session.two');

/* 锚点跳转点击事件 */
$(".item").click(function(){
  $(".item").removeClass('action');
  $(this).addClass('action');
  var href = $(this).attr("href");
  var pos = $(href).offset().top;
  $("html,body").animate({scrollTop: pos - (fixedEl.height()+head.height())}, 500);	
  return false;
});
hover(".tabs>.tab",".tab-centent");
hover(".process>.item",".process-centent");