/// 表格在窗口大小变化时适应宽度
$(function () {

    //去掉空按钮
    $(".list_button").find('li').each(function () {
        if ($(this).html() == "") {
            $(this).remove();
        }
    });
});
//重新加载父窗体表格数据
function reloadParentGrid() {
    parent.$("#datagrid").datagrid('reload');
    parent.$("#datagrid").datagrid('clearSelections');
    parent.$(".datagrid-header-check").find("input").removeAttr('checked');
}


//关闭父弹出框
var closeParentWindow = function (windowsName) {

    var timeout = setTimeout(function () {
        parent.$.dialog.fn.get(windowsName, 1).close();
        clearTimeout(timeout);
    }, 100);
    return false;
};


/**    
* 对Date的扩展，将 Date 转化为指定格式的String    
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符    
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)    
* eg:    
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423    
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04    
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04    
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04    
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18    
*/
// ReSharper disable once NativeTypePrototypeExtending
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份      
        "d+": this.getDate(), //日      
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时      
        "H+": this.getHours(), //小时      
        "m+": this.getMinutes(), //分      
        "s+": this.getSeconds(), //秒      
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度      
        "S": this.getMilliseconds() //毫秒      
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}; // 序列化字符串转JSON对象
function strToObj(urlParams, decode) {
    var retObj = {};
    var urlParameters;

    if (!urlParams || urlParams.length == 0) { return retObj }
    if (urlParams.charAt(0) == '?') {
        urlParameters = urlParams.substring(1);
    } else {
        urlParameters = urlParams;
    }
    if (urlParameters.length == 0) { return retObj }
    var parameterPairs = urlParameters.split('&');
    var x;
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (x in parameterPairs) {
        if (x >= 0) { //2014-11-11 by 帅展 修复ie8 ie9 查询报js脚本错误
            var parameterPair = parameterPairs[x];
            parameterPair = parameterPair.split('=');
            if (decode === true)
                retObj[parameterPair[0]] = decodeURIComponent(parameterPair[1]);
            else
                retObj[parameterPair[0]] = parameterPair[1];
        }
    }


    return retObj;
}


// 序列化字符串转JSON对象
function strToObj(urlParams) {
    var retObj = {};
    var urlParameters;

    if (!urlParams || urlParams.length == 0) { return retObj }
    urlParams = decodeURIComponent(urlParams, true);//解决序列化后汉字变成乱码的问题
    if (urlParams.charAt(0) == '?') {
        urlParameters = urlParams.substring(1);
    } else {
        urlParameters = urlParams;
    }
    if (urlParameters.length == 0) { return retObj }
    var parameterPairs = urlParameters.split('&');
    var x;
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (x in parameterPairs) {
        var parameterPair = parameterPairs[x];
        parameterPair = parameterPair.toString();
        parameterPair = parameterPair.split('=');
        retObj[parameterPair[0]] = parameterPair[1];
    }

    return retObj;
}
//控制文本框输入数字
function numberText(control) {
    var k = event.keyCode;
    var inputValue = control.value;
    if ((k == 46) || (k <= 57 && k >= 48)) {
        if (k == 46) {
            if (inputValue.indexOf('.') >= 0)
            { return false; }
            else {
                if (inputValue == '')
                { return false; }
                return true;
            }
        }
    }
    else
        return false;
    return false;
}

//jqueryEasyUI DataGrid数据表格日期的formatter,格式为YYYY-MM-DD
function formatterDate(val, row) {
    if (val == null) return "";
    var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + currentDate;
}

function formatterDateTime(val, row) {
    if (val == null) return "";
    var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));

    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hour = date.getHours();
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }

    var minute = date.getMinutes();
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }

    var second = date.getSeconds();
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
    return currentdate;

}


//jqueryEasyUI DataGrid数据表格数字的formatter
function formatterNumber(val, row) {
    if (val)
        return val.toFixed(2);
    return false;
}

//判断日期是否合法
function checkDate(strInputDate) {
    if (strInputDate == "")
        return false;
    strInputDate = strInputDate.replace(/-/g, "/");
    var d = new Date(strInputDate);
    if (isNaN(d))
        return false;
    var arr = strInputDate.split("/");
    return ((parseInt(arr[0], 10) == d.getFullYear()) && (parseInt(arr[1], 10) == (d.getMonth() + 1)) && (parseInt(arr[2], 10) == d.getDate()));
}

//获取当前页面URL中参数
function getRequest(paras, url) {
    url = url ? url : location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    var j;
    // ReSharper disable once AssignmentInConditionExpression
    for (var i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return undefined;  //underfined 表示url中没有此参数
    } else {
        return returnValue;
    }
}

//获取当前相对路径,如果截取到的相对路径中有参数，则把参数去掉。
function GetUrlRelativePathNoPara() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    if (start < 0) {
        return "/";
    }
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") >= 0) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

//获取当前相对路径,包括参数。
function GetUrlRelativePathAndPara() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    if (start < 0) {
        return "/";
    }
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    return relUrl;
}

//获取当前Url参数,不以?开头
function GetUrlPara() {
    var url = document.location.toString();
    var indexNum = url.indexOf("?");
    if (indexNum >= 0) {
        var para = url.substr(indexNum + 1);
        return para;
    }
    return "";
}

//function GetUrlParms() {
//    var args = new Object();
//    var query = location.search.substring(1);
//    var pairs = query.split("&");
//    for (var i = 0; i < pairs.length; i++) {
//        var pos = pairs[i].indexOf('=');
//        if (pos == -1) continue;
//        var argname = pairs[i].substring(0, pos);
//        var value = pairs[i].substring(pos + 1);
//        args[argname] = value;
//    }
//    return args;
//}

function compareDate(dateOne, dateTwo) {
    ///<summary>
    ///日期对比，如何开始日期小于结束日期则true
    ///</summary>
    ///<param name="DateOne" type="data">
    ///开始日期(格式（yyyy-MM-dd))
    ///</param>
    ///<param name="DateOne" type="data">
    ///结束日期(格式（yyyy-MM-dd))
    ///</param>
    var oneMonth = dateOne.substring(5, dateOne.lastIndexOf("-"));
    var oneDay = dateOne.substring(dateOne.length, dateOne.lastIndexOf("-") + 1);
    var oneYear = dateOne.substring(0, dateOne.indexOf("-"));

    var twoMonth = dateTwo.substring(5, dateTwo.lastIndexOf("-"));
    var twoDay = dateTwo.substring(dateTwo.length, dateTwo.lastIndexOf("-") + 1);
    var twoYear = dateTwo.substring(0, dateTwo.indexOf("-"));

    if (Date.parse(oneMonth + "/" + oneDay + "/" + oneYear) < Date.parse(twoMonth + "/" + twoDay + "/" + twoYear)) {
        return true;
    }
    else {
        return false;
    }

}

//设置Cookies
function setCookie(cName, value, expiredays) {
    if (expiredays == null) {
        expiredays = 30;
    }
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cName + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=askci.com.cn";
}

//读取cookies
function getCookie(name) {
    if (document.cookie.length > 0) {
        var cStart = document.cookie.indexOf(name + "=");
        if (cStart != -1) {
            cStart = cStart + name.length + 1;
            var cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd == -1) {
                cEnd = document.cookie.length;
            }
            return unescape(document.cookie.substring(cStart, cEnd));
        }
    }
    return "";

    //var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); 
    //if (arr = document.cookie.match(reg)) {
    //    return (arr[2]);
    //}
    //else
    //    return null;
}


// ReSharper disable once NativeTypePrototypeExtending
String.prototype.displayHtml = function () {
    //将字符串转换成数组  
    var strArr = this.split('');
    var str = this;
    //HTML页面特殊字符显示，空格本质不是，但多个空格时浏览器默认只显示一个，所以替换  
    var htmlChar = "&<>";
    for (var i = 0; i < str.length; i++) {
        //查找是否含有特殊的HTML字符  
        if (htmlChar.indexOf(str.charAt(i)) != -1) {
            //如果存在，则将它们转换成对应的HTML实体  
            switch (str.charAt(i)) {
                case '<':
                    strArr.splice(i, 1, '&#60;');
                    break;
                case '>':
                    strArr.splice(i, 1, '&#62;');
                    break;
                case '&':
                    strArr.splice(i, 1, '&#38;');
            }
        }
    }
    return strArr.join('');
};

var isLoading = false;
var requestId;//标识请求的唯一性
///全局Ajax设置
$(function () {
    $.ajaxSetup({
        beforeSend: function (xhr) {
            var id = Math.random();
            xhr.setRequestHeader('myId', id);
            if (!isLoading) {
                requestId = id.toString();
                isLoading = true;
                showLoading();
            }
        },
        complete: function (xhr, ts) {
            var myId = xhr.getResponseHeader("myId");
            if (isLoading && myId == requestId) {
                isLoading = false;
                requestId = "";
                hideLoading();
            }
        }
    });
});

//显示loading 图标
var showLoading = function () {
    $("#divLoadImg").css("top", ($("#FormBase").height() - 20) / 2);
    $("#divLoadImg").css("left", ($("#FormBase").width() - 20) / 2);
    $("#divProcess").show();
};

//隐藏Loading图标
var hideLoading = function () {
    $("#divProcess").hide();

};

//设置文本框中的提示,id为标签的id,theContent为提示的内容
function SetTextPrompt(id, theContent) {

    if ($("#" + id) == null) {
        var dataError = { Flag: 0, ReturnMsg: "对应id的标签不存在" };
        window.alertMsg(dataError);
        return false;
    }
    //得到焦点 
    $("#" + id).on("focus", function () {
        if ($("#" + id).val() == theContent) {
            $("#" + id).val("");
        }
    });

    //失去焦点
    $("#" + id).on("blur", function () {
        if ($("#" + id).val() == "") {
            $("#" + id).val(theContent);
        }
    });
    return false;
}

//若要显示:当前日期加时间(如:2009-06-12 12:00)
function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return (clock);
}

//验证是否有此ID
function exist(id) {
    var s = document.getElementById(id);
    if (s) {
        return true;
    }
    else {
        return false;
    }
}

//判断空格
function checkkongge(obj) {
    if (obj.length == 0)
        return false;
    else
        return true;
}

/* 手机访问 */
function Phonebrowser(xurl) {
    if (xurl == "" || xurl == null) {
        xurl = window.location.href;
        xurl = xurl.toLowerCase();
        xurl = xurl.replace("www.askci.com", "m.askci.com");
        if (xurl.indexOf('_') > -1 && xurl.indexOf('.') > -1) {
            var itemDomIndex = xurl.lastIndexOf('.');
            var item_Index = xurl.lastIndexOf('_');
            var itemStr="";
            if(item_Index<itemDomIndex){
                itemStr = xurl.substr(item_Index + 1, itemDomIndex - item_Index-1);
            }
            if (xurl.substr(itemDomIndex) == ".shtml" && itemStr==parseInt(itemStr)) {
                xurl = xurl.substr(0, xurl.indexOf('_')) + xurl.substr(itemDomIndex);
            }
        }
    }

    //    var bs = {
    //        versions: function () {
    //            var u = navigator.userAgent, app = navigator.appVersion;
    //            //alert(navigator.userAgent);
    //            return {//移动终端浏览器版本信息
    //                trident: u.indexOf('Trident') > -1, //IE内核
    //                presto: u.indexOf('Presto') > -1, //opera内核
    //                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    //                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    //                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
    //                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    //                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    //                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
    //                iPad: u.indexOf('iPad') > -1, //是否iPad
    //                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    //            };
    //        } (),
    //        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    //    }

    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCe = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWm = sUserAgent.match(/windows mobile/i) == "windows mobile";
    var bIsWp = sUserAgent.match(/windows phone/i) == "windows phone";
    var xCookies = getCookie("xsite");
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCe || bIsWm||bIsWp) {
        if (xCookies == null || xCookies != "pc") {
            window.location.href = xurl;
        }
    }
}

//PC访问
function GotoPcWeb(xurl) {
    if (xurl == "" || xurl == null) {
        xurl = window.location.href;
        xurl = xurl.toLowerCase();
        xurl = xurl.replace("m.askci.com", "www.askci.com");
    }
    setCookie("xsite", "pc", 10);
    window.location.href = xurl;
}

//===========================加入购物车============================
function addShoppingCar(chid, id) {
    if (chid != "" && id != "") {
        $.ajax({
            type: "POST",
            url: "//www.askci.com/tools/addShopCart.ashx?jsoncallback=?&chid=" + chid + "&id=" + id + "&type=2&num=1",
            data: {

            },
            dataType: "jsonp",
            success: function (data) {
                if (data.context == "-1") {
                    alert("参数不正确无法提交,请刷新该页面重新提交.");
                } else {
                    if (confirm("加入购物车成功,是否前往购物车")) {
                        window.location = "//www.askci.com/user/shopCart/";
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("状态：" + textStatus + ";出错提示：" + errorThrown);
            },
            timeout: 20000
        });
    }
}


$(function () {
    window.setTimeout(RemoveChangYa, 1000);
});

//去掉畅言的浮动框
function RemoveChangYa() {
    $("#SOHUCS .module-cmt-float-bar-body").remove();
}

function PhoneNewsSearch_NewsHeader_Keydown(e) {
    var keynum = 0;
    if (window.event) // IE
    {
        keynum = e.keyCode
    }
    else if (e.which) // Netscape/Firefox/Opera
    {
        keynum = e.which
    }
    if (keynum == 13) {
        PhoneNewsSearch_NewsHeader();
    }
}

function PhoneNewsSearch_NewsHeader() {
    var keyWords = $("#keyWords").val();
    var channelColumnId = "";
    if ($("#ChannelColumnIdHidden") != null && $("#ChannelColumnIdHidden").length > 0) {
        channelColumnId=$("#ChannelColumnIdHidden").val();
    }
    if (keyWords == "请输入关键词") {
        alert('请输入关键词');
        return;
    }
    var theUrl = "//m.askci.com/sousou.html?isnews=1&keyWords=" + encodeURI(keyWords) + "&channelColumnId=" + channelColumnId;
    location.href = theUrl;
}

//如果图片加载失败,加载默认图片
$(function () {

    //如果图片不存在,加载默认图片 
    $("img").on("error", function () {
        var img = event.srcElement;
        if (img.src.indexOf("//image1.askci.com/defaulterror.jpg")<0) {
            img.src = "//image1.askci.com/defaulterror.jpg";
            img.onerror = null; //控制不要一直跳动
        }
    });

    var imgs = $("img");
    if (imgs != null && imgs.length > 0) {
        for (var i = 0; i < imgs.length; i++) {
            var item = imgs[i];
            var thesrc = $(item).attr("src");
            if (thesrc != null && thesrc != "") {
                $(item).attr("src", thesrc);
            }
        }
    }

    if (window.screen.width <= 1280)
    {
        var piaofu = $("#com-d-top-a");
        if (piaofu != undefined)
        {
            $("#com-d-top-a").remove();
        }
    }

});


$(function () {
    if ($("#ReportIdHidden") != null && $("#ReportIdHidden").length > 0) {
        $.ajax({
            type: "GET",
            url: "//www.askci.com/Reports/TongJiReport/Add?jsoncallback=?",
            data: { reportId: $("#ReportIdHidden").val()},// $("#FormBase").serialize(),
            dataType: "jsonp",
            success: function (data) {
            },
            beforeSend: function () {
            },
            complete: function () {
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
            }
            //timeout: 20000
        });
    }
    if ($("#NewsIdHidden") != null && $("#NewsIdHidden").length > 0) {


	var strHtml=$("html").html();
	if(strHtml.indexOf("/News/TongJiNews/Add")<1&&strHtml.indexOf("/news/tongjinews/add")<1){
	//console.log("需要add");
	$.ajax({
		type: "GET",
		url: "//www.askci.com/News/TongJiNews/Add?jsoncallback=?",
		data: { NewsId: $("#NewsIdHidden").val() },// $("#FormBase").serialize(),
		dataType: "jsonp",
		success: function (data) { 
		},
		beforeSend: function () {
		},
		complete: function () {
		},
		error: function (xmlHttpRequest, textStatus, errorThrown) {
		}
		//timeout: 20000
	});
	}else{
		//console.log("不需要add");
	}

    }
});


//密码必须包含数字和字母，必须包含至少一位数字和一位字母
function CheckPassWord(password) {
    var str = password;
    if (str == null || str.length < 8) {
        return false;
    }
    var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    if (reg.test(str))
        return true;
}
function JudgeIsDefaultPassword() {
	var currentHref=location.href.toLowerCase()
	if(currentHref.indexOf("/home/updatepasswordpage")>-1||currentHref.indexOf("/account/logon")>-1)
	{
		return;
	}
	
    $.ajax({
        type: "GET",
        url: "/Tool/JudgeIsDefaultPassword",
        data: {},//$("#FormBase").serialize(),
        dataType: "json",
        success: function (s) {
            if (s.Flag == 1) {
                location.href = "/Home/UpdatePasswordPage";
                return;
            }
            if (s.Flag == 1000) {
                location.href = "/Account/LogOn";
                return;
            }
        },
        beforeSend: function () {
        },
        error: function () {
        }
    });
}


(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = '//push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();


// //360自动推送
// (function(){
// var src = "https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba";
// document.write('<script src="' + src + '" id="sozz"><\/script>');
// })();