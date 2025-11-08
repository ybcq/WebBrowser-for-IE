// JavaScript Document
(function(window){

	var is_msie = navigator.userAgent.indexOf("MSIE")>-1 ? true : false;
	var is_msie_6 = navigator.userAgent.indexOf("MSIE 6.0")>-1 ? true : false;
	var is_msie_7 = navigator.userAgent.indexOf("MSIE 7.0")>-1 ? true : false;
	// ie8以下, 包括ie8
	var is_msie8_down = is_msie && !document.addEventListener;

	function dataReport(code, intValue,bExistReport) {
		if(intValue == "-1"){
			return;
		}
		try {
			intValue = intValue || 0;
			qqbrowser.datareport.addValue(parseInt(code), parseInt(intValue), 1, bExistReport);
		}
		catch(e) {}
	}


	/*
	 * url里的参数
	 * content 为第一行的内容
	 * style=x,x 第一个参数代表第几套style 第二个参数代表第几个btn高亮
	 * btnText 逗号分隔
	 * content2 （可选）为第二行内容
	 * cbText（可选） checkbox的文本内容，多个用,分隔
	 * cbValue（可选） checkbox的默认选中值，多个用,分隔，1为选中，0为未选
	 * iconType （可选）0没有icon,1本地icon,2调用接口icon
	 * iconPath （可选）对应的路径
	 * protocol=8096 （可选）上报的key
	 * keyID=2001,2000,1000,1010 （可选）依次是显示次数、close按钮、左下按钮、右下按钮的key 没有为-1
	 * bExistReport = true / false （可选）
	 */
	var url;
	var result;
	var param;
	var paramObj = {};
	var tmp;
	var keyID;
	var isDataReport = false;
	var bExistReport = true;
	try {
		url = window.external.getPageUrl();
		// url = location.href;
		result = /^[^\?]+\?(.*)$/.exec(url);
		if (result && result.length == 2) {

			url = result[1];
			param = url.split("&");
			for(var i=0; i<param.length ;i++){
				tmp = param[i].split("=");
				paramObj[tmp[0]] = decodeURIComponent(tmp[1]);
			}
		}
	}
	catch (e) {
		return;
	}

	// 是否需要数据上报
	if (paramObj['protocol']) {
			isDataReport = true;
			keyID = paramObj.keyID.split(',');
			bExistReport = (paramObj.bExistReport == "1" ? true : false);
	}

	// 增加样式
	tmp = paramObj['style'].split(',');
	document.getElementById('infor-bar').className += ' template'+tmp[0];
	if (tmp.length == 2) {
		document.getElementById('btn'+tmp[1]).className += ' high-light';
	}
	// icon
	if (parseInt(paramObj.iconType)) {
		tmp = document.getElementById('icon');
		tmp.style.display = 'inline';
		switch (paramObj.iconType) {
		case '1':
			tmp.src = paramObj.iconPath;
			break;
		case '2':
			if (!is_msie_6 && !is_msie_7) {
				try{
					qqbrowser.icon.getFileIcon([paramObj.iconPath], is_msie8_down ? 'png' : 'icon', function(resArr){
						document.getElementById("icon").src = resArr[0].icon;
					})
				}catch(e){}
			}
			else {
				tmp.style.display = 'none';
			}
			break;
		}
	}
	else{ //无icon
		document.getElementById('icon').style.display = "none";
		document.getElementById("content").style.paddingLeft = "0";
	}
	// content
	tmp = '';
	if (paramObj.content) {
		tmp += '<p>' + paramObj.content + '</p>';
	}
	if (paramObj.content2) {
		tmp += '<p class="content2">' + paramObj.content2 + '</p>';
	}
	if (paramObj.cbText && paramObj.cbValue) {
		paramObj.cbText = paramObj.cbText.split(',')[0];
		paramObj.cbValue = paramObj.cbValue.split(',')[0];
		tmp += '<p class="cb"><label for="checkbox" hidefocus="true"><input id="checkbox" type="checkbox" value="1" '+
			(+paramObj.cbValue?'checked':'')+'/>'+paramObj.cbText+'</label></p>';
	}
	document.getElementById('content').innerHTML = tmp;
	//加载checkbox事件
	if (paramObj.cbText && paramObj.cbValue) {
		document.getElementById('checkbox').onclick = function () {
		    qqbrowser.extension.sendMessage(11);
		};
	}
	// btn 内容
	if(paramObj.btnText.length === 0 ){
		document.getElementById("buttonBar").style.display = "none";
	}
	else{
		tmp = paramObj.btnText.split(',');
		document.getElementById('btn1').innerHTML = tmp[0] || '';
		document.getElementById('btn2').innerHTML = tmp[1] || '';
		//加载button事件
		document.getElementById('btn1').onclick = function () {
		    qqbrowser.extension.sendMessage(1);
		    if (isDataReport) {
		    	dataReport(paramObj['protocol'], keyID[2],bExistReport);
		    }
		    closeWindow();
		};
		document.getElementById('btn2').onclick = function () {
		    qqbrowser.extension.sendMessage(2);
		    if (isDataReport) {
		    	dataReport(paramObj['protocol'], keyID[3],bExistReport);
		    }
		    closeWindow();
		};
	}

	// 加载close button事件
	document.getElementById('closeBtn').onclick = function () {
		qqbrowser.extension.sendMessage(-1);
	    if (isDataReport) {
	    	dataReport(paramObj['protocol'], keyID[1],bExistReport);
	    }
		closeWindow();
	};

	// 显示inforbar上报
    if (isDataReport) {
    	dataReport(paramObj['protocol'], keyID[0],bExistReport);
    }

})(window)