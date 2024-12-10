//使用document.write('<script src="https://jscss.askci.com/js/jquery.common.js"></script>');写在jquery.js的后面,保证这些方法一定存在且只存在一个
$(function () {
  var itemUrl = window.location.href;
  itemUrl = encodeURIComponent(itemUrl);
  if (false) {
    $.ajax({
      type: "GET",
      url: "//ywwgd.askci.com/tool/AddTongJiClickNum?theUrl=" + itemUrl,
      data: {},
      dataType: "jsonp",
      success: function () {},
      beforeSend: function () {},
      complete: function () {},
      error: function (xmlHttpRequest, textStatus, errorThrown) {},
      //timeout: 20000
    });
  }

  //如果图片不存在,加载默认图片
  $("img").on("error", function () {
    var img = event.srcElement;
    if (img.src.indexOf("//image1.askci.com/defaulterror.jpg") < 0) {
      img.src = "//image1.askci.com/defaulterror.jpg";
      img.onerror = null; //控制不要一直跳动
    }
  });
});
