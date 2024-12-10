
if (typeof(layer)=="undefined"){
	document.writeln('<script type="text/javascript" src="//jscss.askci.com/layer-3.1.1/layer.js"><\/script>');
}


//键盘按下事件(inputTextId文本框的id)
function SearchKeyDown(event, inputTextId) {
    if (event.keyCode == 13) {
        SearchCommon(inputTextId);
    }
}

//搜索(inputTextId文本框的id)
function SearchCommon(inputTextId) {
    if ($("#" + inputTextId) == null) {
		layer.alert('对应Id不存在', {icon: 0});
        return false;
    }
    var searchValues = $("#" + inputTextId).val();
    searchValues = $.trim(searchValues);
    SearchCommon_Keyword(searchValues);

}


//搜索
function SearchCommon_Keyword(keyword) {
    if (keyword == "" || keyword == null) {
        layer.alert('请输入关键词', { icon: 0 });
        return false;
    }
    else if (!checkkongge(keyword)) {
        layer.alert('请输入关键词', { icon: 0 });
        return false;
    }
    //else if (IsFilterKey(keyword)) {
    //    layer.alert('请输入其他关键词', {icon: 0});
    //    return false;
    //}
    var theUrl = "//www.askci.com/search/report/" + encodeURIComponent(keyword) + "/";
    var url = "//so.askci.com/cse/search?q=" + encodeURIComponent(keyword) + "&s=1090085531342264480&nsid=6";
    window.open(theUrl);
}


function checkkongge(obj) {
    if (obj.length == 0)
        return false;
    else
        return true;
}

function IsFilterKey(obj) {
    var filterKeys = "行业|行業|研究报告|研究報告|报告|報告|中国|市场|市場|研究|分析|投资|调查|调研|咨询|前景|预测|关键字|關鍵字|十三|三五|十三五|投资环境|农资连锁|医疗地产|战略新兴|战略性新兴产业"; //过滤的搜索关键字,以"|"分隔
    var array = filterKeys.split("|");
    for (var i = 0; i < array.length; i++) {
        if (obj == array[i])
            return true;
    }
    return false;
}



//-----开始右边的在线咨询------
//http://localhost/test/test.htm?id=1
var location_pathname_240529=window.location.pathname; //返回【/test/test.htm】
var location_search_240529=window.location.search; //返回 【?id=1】
var location_href_240529=window.location.href; //返回【http://localhost/test/test.htm?id=1】
var location_hostname_240529=window.location.hostname;//返回【http://localhost】
if(location_hostname_240529.indexOf("www.askci.com")>-1&&location_pathname_240529.indexOf(".shtml")>-1){
	document.write('<script src="https://jscss.askci.com/zhuantileizxz/js/public-online-consulting.js"><\/script>');
}
//-----结束右边的在线咨询------


//-----开始文本选中分享------
if(location_hostname_240529.indexOf("www.askci.com")>-1&&location_pathname_240529.indexOf(".shtml")>-1){
	document.write('<script src="https://jscss.askci.com/askci1807/js/share_text.js"><\/script>');
}
//-----结束文本选中分享------

