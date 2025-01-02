
//点击底部按钮，触发弹窗，弹出管理员信息
function contact() {  
    var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;  
    Swal.fire({  
        title: '管理员',  
        html: '<div style="text-align: center;">家电技术研究一院:胡芳<br><br>联系座机：29844</div>',  
        icon: 'question',  
        confirmButtonText: '确定',  
        customClass: {  
            container: 'my-swal',  
            popup: 'my-swal-popup',  
            header: 'my-swal-header',  
            title: 'my-swal-title',  
            closeButton: 'my-swal-close-button',  
            image: 'my-swal-image',  
            content: 'my-swal-content',  
            input: 'my-swal-input',  
            actions: 'my-swal-actions',  
            confirmButton: 'my-swal-confirm-button',  
            cancelButton: 'my-swal-cancel-button',  
            footer: 'my-swal-footer'  
        },
        width: '400px'   
    });  
}

//首部导航栏，鼠标悬浮时，显示用户中心，离开时，显示原来的用户名
document.addEventListener('DOMContentLoaded', function() {
    const userInfo = document.querySelector('.user-info');
    const userNameSpan = document.querySelector('.span_uname');
    const originalText = userNameSpan.textContent;

    userInfo.addEventListener('mouseenter', function() {
        userNameSpan.textContent = '用户中心';
    });

    userInfo.addEventListener('mouseleave', function() {
        userNameSpan.textContent = originalText;
    });
});



//鼠标悬浮时，显示退出登录按钮，离开时，隐藏退出登录按钮
$(document).ready(function() {  
    toastr.options = {  
        "closeButton": true,  
        "debug": false,  
        "newestOnTop": false,  
        "progressBar": false,  
        "positionClass": "toast-top-center",  
        "preventDuplicates": false,  
        "onclick": null,  
        "showDuration": "300",  
        "hideDuration": "1000",  
        "timeOut": "0",  
        "extendedTimeOut": "0",  
        "showEasing": "swing",  
        "hideEasing": "linear",  
        "showMethod": "fadeIn",  
        "hideMethod": "fadeOut",  
        "tapToDismiss": false  
    };  

    $(document).on('click', '.logout-btn', function(e) {  
        e.preventDefault();  
        toastr.clear();  
        
        toastr.warning(  
            '<div>确认退出登录吗？</div>' +  
            '<div class="toast-buttons">' +  
            '<button class="confirm-btn">确认</button>' +  
            
            '</div>',  
            '',  
            {  
                allowHtml: true  
            }  
        );  
    });  

    $(document).on('click', '.confirm-btn', function() {  
        window.location.href = "{% url 'logout' %}";  
    });  

   
});


//下拉列表的js

//其他共享文件下拉列表
$("#academy_box1").hover(
    function () {
        $(".nav2_list4").css("display", "block").animate({height: "92px"}, 0);
    }, function () {
        $(".nav2_list4").animate({height: "0"}, 1).css("display", "none");
    });
//情报研究下拉列表
$("#academy_box").hover(
    function () {
        $(".nav2_list").css("display", "block").animate({height: "184px"}, 0);
    }, function () {
        $(".nav2_list").animate({height: "0"}, 1).css("display", "none");
    });
//新品月报下拉列表
$("#service_box2").hover(
    function () {
        $(".nav2_list123").css("display", "block").animate({height: "314px"}, 0);
    }, function () {
        $(".nav2_list123").animate({height: "0"}, 1).css("display", "none");
});

//用户体验下拉列表
$("#service_box1").hover(
    function () {
        $(".nav2_list12").css("display", "block").animate({height: "314px"}, 0);
    }, function () {
        $(".nav2_list12").animate({height: "0"}, 1).css("display", "none");
});
//产品线下拉列表
$("#nav_group").hover(
    function () {
        $(".nav2_list1").css("display", "block").animate({height: "314px"}, 0);
    }, function () {
        $(".nav2_list1").animate({height: "0"}, 1).css("display", "none");
    });
