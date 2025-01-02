function go_top() {
    $('html, body').animate({scrollTop: 0}, 200);
};

function go_top2() {
    $("#footer.shtml").append("<div id=" + 'go_top' + "></div>");
    $("#go_top").hide();
    $(function () {
        //检测屏幕高度
        var height = $(window).height();
        //scroll() 方法为滚动事件
        $(window).scroll(function () {
            if ($(window).scrollTop() > height/2) {
                $("#go_top").fadeIn(500);
            } else {
                $("#go_top").fadeOut(500);
            }
        });
        $("#go_top").click(function () {
            $('body,html').animate({scrollTop: 0}, "fast");
            return false;
        });
    });
};

$(document).ready(
    function () {
        go_top2();
    }
);
$("#cop").click(
    function () {
        $(this).find(".line1").show();
        $("#fr_link").find(".line1").hide();
        $(".link_img").show();
        $(".link_text").hide();
    }
);
$("#fr_link").click(
    function () {
        $(this).find(".line1").show();
        $("#cop").find(".line1").hide();
        $(".link_img").hide();
        $(".link_text").show();
    }
);
$("#2code").hover(
    function () {
        $(".code_box").show()
    },
    function () {
        $(".code_box").hide()
    }
);
$.fn.smartFloat = function() {
    var obj3 = $(".content_left");
    var obj4 = $(".content_right");
    var obj1 = $("#map_tip");
    var top1,h2,top,h2,pos,h4;
    if(h2 > h4){
        $(".content_right").css({
            "height":h2
        });
    };
    if(h2 < h4){
        $(".content_right").css({
            "height":h4
        });
    };
    var position = function(element) {
         top = element.position().top;
         pos = element.css("position");
        $(window).scroll(function() {
            top1 = obj1.position().top;
            h2 = obj3.height();
            h4 = obj4.height();

            var scrolls = $(this).scrollTop();
            if (scrolls > top&&scrolls<top1-80) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: -30,
                        "margin-top":30
                    });
                }
                else{
                    element.css({
                        top: scrolls
                    });
                }
            }else if(scrolls>=top1-80) {
                element.css({
                    position: pos,
                    top:top,
                    "margin-top":h2-top-320
                });
            } else {
                element.css({
                    position: pos,
                    top: top,
                    "margin-top":30
                });
            }
        });
    };
    return $(this).each(function() {
        position($(this));
    });
};
$("#fixed").smartFloat();

$(function () {
    //浏览器不支持 placeholder 时才执行
    if (!('placeholder' in document.createElement('input'))) {
        $('[placeholder]').each(function () {
            var $tag = $(this); //当前 input
            var $copy = $tag.clone();   //当前 input 的复制
            if ($copy.val() == "") {
                $copy.css("color", "#888");
                $copy.val($copy.attr('placeholder'));
            }
            $copy.focus(function () {
                if (this.value == $copy.attr('placeholder')) {
                    this.value = '';
                    this.style.color = '#888';
                }
            });
            $copy.blur(function () {
                if (this.value=="") {
                    this.value = $copy.attr('placeholder');
                    $tag.val("");
                    this.style.color = '#444';
                } else {
                    $tag.val(this.value);
                }
            });
            $tag.hide().after($copy.show()); //当前 input 隐藏 ，具有 placeholder 功能js的input显示
        });
    }
});

$(".content_box_img").hover(
    function () {
    var h=$(this).find(".content_box_img_title").height();
        $(this).find(".content_box_img_title").animate({"top":188-h},260);
},
    function () {
        $(this).find(".content_box_img_title").animate({"top":158},200);
    }
);




$(function() {
    var tableTnbox = $(".detail_content_text table");
    for (var i = 0; i < tableTnbox.length; i++) {
        var item = tableTnbox[i];
        var trGetlise = $(item).children("tbody").children("tr");
        var trLEgth = $(item).children("tbody").children("tr").length;
        if (trLEgth > 1){
            var trLxCrt = $(item).children("tbody").children("tr").get(0);
            var textTdgruod = $(trLxCrt).children("td").get(3);
            var textTdhtml = $(textTdgruod).text();
            if(textTdhtml == ("当日价格") && textTdhtml !== ""){
                for (var j = 0; j < trGetlise.length; j++) {
                    var Gbtdone = $(trGetlise[j]).children("td").get(3);
                    var Gbtfwv = $(trGetlise[j]).children("td").get(4);
                    $(Gbtdone).attr("style", "color: #f38a8a;");
                    $(Gbtfwv).attr("style", "color: #4ac0d4;");
                }
             }
            $(trLxCrt).children("td").attr("style", "font-weight: 600;");
        }
        if (trGetlise == null) {
            return;
        };
    };
});

$(document).ready(function(){
    // 获取父元素的颜色
    var parentColor = $('.detail_content_text p strong span').css('color');
    // 将颜色应用到子元素上
    $('.detail_content_text p strong span a').css('color', parentColor);
  });
