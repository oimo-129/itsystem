function plousGg(){
    loginheigHt = "";
    if ($(".login_a_boxconetent") != null && $(".login_a_boxconetent").height() != undefined){
        loginheigHt = $(".login_a_boxconetent").height();
    }else if($(".pub_t_com,.dynamic_data_mainbox") != null && $(".pub_t_com,.dynamic_data_mainbox").height() != undefined){
        loginheigHt = $(".pub_t_com,.dynamic_data_mainbox").height();
    }
    var chuangTan = $(window).height() - loginheigHt;
    var ckYbangd = chuangTan / 2;
    $(".login_a_boxconetent").attr("style","top:" + ckYbangd + "px");
    $(".pub_t_com,.dynamic_data_mainbox").attr("style","top:" + ckYbangd + "px");
};


$(function () {
    plousGg()
    $(".fank_hang").click(function(){
        $(".login_abroad_bg").attr("style","display:block;");
        setTimeout(function (){
            $(".login_a_boxconetent").addClass("bounce_in");
            $(".login_a_boxconetent").addClass("boxblock");
            plousGg();
            $(window).resize(function() {
                plousGg();
            });
        }, 200);
    });
    $(".btn_close").click(function(){
        $(".login_abroad_bg").attr("style","display:none;");
        setTimeout(function (){
            $(".login_a_boxconetent").addClass("rem_lo");
            $(".rem_lo").removeClass("boxblock");
        }, 100);
    });
    $(window).resize(function() {
        plousGg();
    });
});