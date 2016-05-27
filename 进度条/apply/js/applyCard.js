(function() {
	if ("" != $("#hiddenProv").val()) {
		var frimAddr = $("#hiddenProv").val() + "|" + $("#hiddenCity").val() + "|" + $("#hiddenDist").val();
		$("#frimAddr").val(frimAddr);
	}
	$("#cardType").change( function() {
		ChangeColor($(this));
	});
	$("#Prov").change( function() {
		ChangeColor($(this));
	});
	$("#City").change( function() {
		ChangeColor($(this));
	});
	$("#Dist").change( function() {
		ChangeColor($(this));
	});
	$("#qualification").change( function() {
		ChangeColor($(this));
	});
	
	//取消(选中)阅读并同意项
	$("#isAgree").toggle(
		function() {	/*取消*/
			$(this).removeClass("sel");
		}, 
		function() {	/*选中*/
			$(this).addClass("sel");
		}
	); 
     
	//提交信用卡申请
	$("#btnSubmit").click(function(){
		if( checkForm() ){
			$("#applyForm").submit();
		}
	});
	
})();

//逐个验证表单字段
function checkForm() {
	if ("0" == $("#cardType").val()) {
		ShowErrMsg("请选择要申请的卡种。");
		return false;
	}
	var chkReturn = chkUserName($("#userName").val(), 2, 6);
	if (chkReturn.Res != 1) {
		ShowErrMsg("请准确输入姓名，2-6个字。");
		return false;
	}
	if ( !$(":radio[name=sex]:checked").length ) {
		ShowErrMsg("请选择您的性别。");
		return false;
	}
	chkReturn = chkID($("#IDNO").val());
	if (chkReturn.Res != 1) {
		ShowErrMsg("请准确输入身份证号码。");
		return false;
	}
	chkReturn = chkAge($("#IDNO").val());
	if (chkReturn.Res != 1) {
		ShowErrMsg("目前只接受18-60周岁人士通过身份证提出的申请。");
		return false;
	}
	chkReturn = chkMobile($("#mobile").val());
	if (chkReturn.Res != 1) {
		ShowErrMsg("请准确输入11位手机号码。");
		return false;
	}
	if (null != $("#SMSCode") && undefined != $("#SMSCode")) {
		var smscode = $("#SMSCode").val();
		if (6 != smscode.length || !IsAllDigital(smscode)) {
			ShowErrMsg("请准确输入短信验证码。");
			return false;
		}
	}
	
	$("#hiddenProv").val( $("#Prov").val() );
	$("#hiddenCity").val( $("#City").val() );
	$("#hiddenDist").val( $("#Dist").val() );
	$("#isTransact").val( $("#temp_transact").val() );
	if ("" == $("#City").val()) {
		ShowErrMsg("请选择您的所在城市。");
		return false;
	}
	
	if ($("#frimName").val() == "学生、非在职人员暂不受理" ) {
		ShowErrMsg("请准确输入单位名称，2-30个字。");
		return false;
	}
	chkReturn = chkText($("#frimName").val(), 2, 30);
	if (chkReturn.Res != 1) {
		ShowErrMsg("请准确输入单位名称，2-30个字。");
		return false;
	}
/*
	chkReturn = chkText($("#detailAddr").val(), 5, 30);
	if (chkReturn.Res != 1) {
		ShowErrMsg("请正确填写详细地址，5－30个字。");
		return false;
	}
*/
	if ("0" == $("#qualification").val()) {
		ShowErrMsg("请选择您的学历。");
		return false;
	}
	
	if ($("#isAgree").hasClass("sel")) {
		return true;
	}else{
		ShowErrMsg("请确认领用合约。");
		return false;
	}

}

//ajax校验是否已经是持卡用户
$("#IDNO").change( function() {
	/*
    try {
        var IDNO = $("#IDNO").val();
        var chkReturn = chkID(IDNO);
        if (1 == chkReturn.Res) {
            $("#haveCardDiv").css({"display":"none"});
            $("#haveCard").val("0");
            Enabledbtn();
            var url = "###"; 
            var param = {"cardType":"01","cardId":"data"};
            $.ajax({
            	url: "###",
            	type: "POST",
            	data: param,
            	dataType: "json",
            	success: function (ajaxRtn) {
	            	if (0 == ajaxRtn.bool) {
	            		var data = ajaxRtn.msg;
	            		$("#haveCardDiv").css({"display":(("Y" == ajaxRtn.IsNew) ? "none" : "-webkit-box")});
	            		$("#haveCard").val("Y" == ajaxRtn.IsNew ? "0" : "1");
	            		("Y" == ajaxRtn.IsNew) ? Enabledbtn() : Disabledbtn();
	            	}else{
	            		ShowErrMsg(ajaxRtn.msg);
	            	}
            	}
            });
        }
    } catch (ex) { }
    */
});

//ajax获取短信验证码
function getSMSCode() {
	$("#btnGetSMSCode").click(function() {});
	var chkReturn = chkMobile($("#mobile").val());
	if (chkReturn.Res != 1) {
		ShowErrMsg("请填写正确的手机号");
		$("#btnGetSMSCode").click(getSMSCode);
		return false;
	}
	
	/*
	try {
		var url = "###"; 
		var param = { "mobile" : $("#mobile").val()};
        $.ajax({
        	url: "###",
        	type: "POST",
        	data: param,
        	dataType: "json",
        	success: function (ajaxRtn) {
	        	if (0 == ajaxRtn.bool) {
	        		var lefttime = 60;
	        		$("#btnGetSMSCode").attr("disabled", true);
	        		$("#btnGetSMSCode").css({"color":"#858689"});
	        		$("#btnGetSMSCode").val("重新获取(60)");
	        		var btntextchange = setInterval(function() {
	        			lefttime--;
	        			$("#btnGetSMSCode").val("重新获取(" + lefttime + ")");
	
	        			if (0 == lefttime) {
	        				$("#btnGetSMSCode").val("重新获取");
	        				$("#btnGetSMSCode").attr("disabled", false); = false;
	        				$("#btnGetSMSCode").click(getSMSCode);
	        				clearInterval(btntextchange);
	        			}
	        		}, 1000);
	        	} else {
	        		$("#btnGetSMSCode").click(getSMSCode);
	        		ShowErrMsg(ajaxRtn.msg);
	        	}
        	}
        });
	} catch (exc) {
		ShowErrMsg(exc.message);
	}
	*/
}

var Disabledbtn = function() {
	$("#btnSubmit").addClass("disabled_style");
}
var Enabledbtn = function() {
	if ("0" == $("#haveCard").val()) {
		$("#btnSubmit").removeClass("disabled_style");
	}
}
var ChangeColor = function(obj) {
	if (obj.selectedIndex == 0) {
		obj.css({"color":"#999"});
	} else {
		obj.css({"color":"#38528B"});
	}
}

//显示错误信息
var ShowErrMsg = function(errMsg) {
	$("#errMsgDiv").html("<em>!</em>" + errMsg);
	$("#errMsgDiv").css({"display":"block"});
}

//隐藏滚动条
function hideToolBar() {
	if (window.addEventListener) {
		window.addEventListener('load', function() {
			setTimeout(function(){
				scrollTo(0,1);
			},0);
		}, false);
	}
}
hideToolBar();
