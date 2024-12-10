// JavaScript Document
$(function (){
	var  htmcsJzai=""
	+"<div class='fd_box_con'>"
    +"<a class='To_shobianshang' href='#'></a>"
    +"<a class='fank_hang' id='header_c_loginone' title='意见反馈'></a>"
    +"<div class='clear'></div>"
+"</div>"

   +"<div class='login_abroad_bg' id='bgheise'></div>"
    +"<div class='login_a_boxconetent' id='login_abroad_box'>"
       +"<div class='login_abroad_box'>"
            +"<div class='login_a_b_nbox'>"
                +"<a class='btn_close' id='btn_close'></a>"
               +"<div class='login_a_b_nbcon'>"
                    +"<h3>请把您的建议告诉我们</h3>"
                    +"<form  autocomplete='off'>"
                        +"<textarea name='reworkmes' id='FeedbackContent'></textarea>"
                    +"</form>"
                    +"<button type='button' class='login_btn' onclick='FeedbackClick()' id='SaveBtn'>提交建议</button>"
                +"</div>"
           +"</div>"
        +"</div>"
        +"<div class='clear'></div>"
    +"</div>";
	$("body").append(htmcsJzai);
	
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

function FeedbackClick() {
	var feedbackContent = $("#FeedbackContent").val();
	if (feedbackContent == "") {
		alert("内容不能为空");
		return;
	}
	var feedbackUrl = window.location.href;

	$("#SaveBtn").attr("disabled", "disabled");
	$.ajax({
		type: "POST",
		url: "/Feedback/Add",
		data: { FeedbackContent: feedbackContent, FeedbackUrl: feedbackUrl },
		dataType: "json",
		success: function(s) {
			$("#SaveBtn").removeAttr("disabled");
			if (confirm(s.ReturnMsg)) {
				$("#bgheise").attr("style", "display:none;");
				$("#login_abroad_box").addClass("rem_lo");
				$(".rem_lo").removeClass("boxblock");
			}
		},
		beforeSend: function() {
		},
		complete: function() {
		},
		error: function(xmlHttpRequest, textStatus, errorThrown) {
			var msg = "状态：" + textStatus + ";出错提示：" + errorThrown;
			alert(msg);
			$("#SaveBtn").removeAttr("disabled");
		},
		timeout: 50000
	});
}
