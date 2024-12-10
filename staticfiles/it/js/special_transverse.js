$(function arrLesdfps (){
    var clientWidth=$(".special_broadcast_list").width();
    var scrollPic_01 = new ScrollPic();
    scrollPic_01.scrollContId   = "broadcast_contentimg";
    scrollPic_01.arrLeftId      = "direction_left";
    scrollPic_01.arrRightId     = "direction_right";
    scrollPic_01.frameWidth     = 1200;
    scrollPic_01.pageWidth      = 307;
    scrollPic_01.speed          = 20;
    scrollPic_01.space          = 20;
    scrollPic_01.autoPlay       = true;
    scrollPic_01.autoPlayTime   = 4;
    scrollPic_01.initialize();
});