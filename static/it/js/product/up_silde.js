$(function () {
  $.fn.extend({
    Scroll: function (opt, callback) {
      //閸欏倹鏆熼崚婵嗩潗閸栵拷
      if (!opt) var opt = {};
      var _btnUp = $("#" + opt.up); //Shawphy:閸氭垳绗傞幐澶愭尦
      var _btnDown = $("#" + opt.down); //Shawphy:閸氭垳绗呴幐澶愭尦
      var timerID;
      var _this = this.eq(0).find("ul:first");
      var lineH = _this.find("li:first").height(), //閼惧嘲褰囩悰宀勭彯
        line = opt.line
          ? parseInt(opt.line, 10)
          : parseInt(this.height() / lineH, 10), //濮ｅ繑顐煎⿰姘З閻ㄥ嫯顢戦弫甯礉姒涙ǹ顓绘稉杞扮鐏炲骏绱濋崡宕囧煑鐎圭懓娅掓妯哄
        speed = opt.speed ? parseInt(opt.speed, 10) : 800; //閸楀嘲濮╅柅鐔峰閿涘本鏆熼崐鑹扮Ш婢堆嶇礉闁喎瀹崇搾濠冨弮閿涘牊顕犵粔鎺炵礆
      timer = opt.timer; //?parseInt(opt.timer,10):5000; //濠婃艾濮╅惃鍕闂傛挳妫块梾鏃撶礄濮ｎ偆顫楅敍锟�
      if (line == 0) line = 1;
      var upHeight = 0 - line * lineH;
      //濠婃艾濮╅崙鑺ユ殶
      var scrollUp = function () {
        _btnUp.unbind("click", scrollUp); //Shawphy:閸欐牗绉烽崥鎴滅瑐閹稿鎸抽惃鍕毐閺佹壆绮︾€癸拷
        _this.animate(
          {
            marginTop: upHeight,
          },
          speed,
          function () {
            for (i = 1; i <= line; i++) {
              _this.find("li:first").appendTo(_this);
            }
            _this.css({ marginTop: 0 });
            _btnUp.bind("click", scrollUp); //Shawphy:缂佹垵鐣鹃崥鎴滅瑐閹稿鎸抽惃鍕仯閸戣绨ㄦ禒锟�
          }
        );
      };
      //Shawphy:閸氭垳绗呯紙濠氥€夐崙鑺ユ殶
      var scrollDown = function () {
        _btnDown.unbind("click", scrollDown);
        for (i = 1; i <= line; i++) {
          _this.find("li:last").show().prependTo(_this);
        }
        _this.css({ marginTop: upHeight });
        _this.animate(
          {
            marginTop: 0,
          },
          speed,
          function () {
            _btnDown.bind("click", scrollDown);
          }
        );
      };
      //Shawphy:閼奉亜濮╅幘顓熸杹
      var autoPlay = function () {
        if (timer) timerID = window.setInterval(scrollUp, timer);
      };
      var autoStop = function () {
        if (timer) window.clearInterval(timerID);
      };
      //姒х姵鐖ｆ禍瀣╂缂佹垵鐣�
      _this.hover(autoStop, autoPlay).mouseout();
      _btnUp.css("cursor", "pointer").click(scrollUp).hover(autoStop, autoPlay); //Shawphy:閸氭垳绗傞崥鎴滅瑓姒х姵鐖ｆ禍瀣╂缂佹垵鐣�
      _btnDown
        .css("cursor", "pointer")
        .click(scrollDown)
        .hover(autoStop, autoPlay);
    },
  });
  $(function () {
    for (var i = 0; i < 10; i++) {
      var frameBox = "xiangSbox" + i;
      var list = $("#" + frameBox);
      if (list == null || list.length < 1) {
        return;
      }
      $(list[0]).Scroll({
        line: 1,
        speed: 1000,
        timer: 4000,
        up: "but_up",
        down: "but_down",
      });
    }
  });
});
