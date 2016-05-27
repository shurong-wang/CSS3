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
	
	//ȡ��(ѡ��)�Ķ���ͬ����
	$("#isAgree").toggle(
		function() {	/*ȡ��*/
			$(this).removeClass("sel");
		}, 
		function() {	/*ѡ��*/
			$(this).addClass("sel");
		}
	); 
     
	//�ύ���ÿ�����
	$("#btnSubmit").click(function(){
		if( checkForm() ){
			$("#applyForm").submit();
		}
	});
	
})();

//�����֤���ֶ�
function checkForm() {
	if ("0" == $("#cardType").val()) {
		ShowErrMsg("��ѡ��Ҫ����Ŀ��֡�");
		return false;
	}
	var chkReturn = chkUserName($("#userName").val(), 2, 6);
	if (chkReturn.Res != 1) {
		ShowErrMsg("��׼ȷ����������2-6���֡�");
		return false;
	}
	if ( !$(":radio[name=sex]:checked").length ) {
		ShowErrMsg("��ѡ�������Ա�");
		return false;
	}
	chkReturn = chkID($("#IDNO").val());
	if (chkReturn.Res != 1) {
		ShowErrMsg("��׼ȷ�������֤���롣");
		return false;
	}
	chkReturn = chkAge($("#IDNO").val());
	if (chkReturn.Res != 1) {
		ShowErrMsg("Ŀǰֻ����18-60������ʿͨ�����֤��������롣");
		return false;
	}
	chkReturn = chkMobile($("#mobile").val());
	if (chkReturn.Res != 1) {
		ShowErrMsg("��׼ȷ����11λ�ֻ����롣");
		return false;
	}
	if (null != $("#SMSCode") && undefined != $("#SMSCode")) {
		var smscode = $("#SMSCode").val();
		if (6 != smscode.length || !IsAllDigital(smscode)) {
			ShowErrMsg("��׼ȷ���������֤�롣");
			return false;
		}
	}
	
	$("#hiddenProv").val( $("#Prov").val() );
	$("#hiddenCity").val( $("#City").val() );
	$("#hiddenDist").val( $("#Dist").val() );
	$("#isTransact").val( $("#temp_transact").val() );
	if ("" == $("#City").val()) {
		ShowErrMsg("��ѡ���������ڳ��С�");
		return false;
	}
	
	if ($("#frimName").val() == "ѧ��������ְ��Ա�ݲ�����" ) {
		ShowErrMsg("��׼ȷ���뵥λ���ƣ�2-30���֡�");
		return false;
	}
	chkReturn = chkText($("#frimName").val(), 2, 30);
	if (chkReturn.Res != 1) {
		ShowErrMsg("��׼ȷ���뵥λ���ƣ�2-30���֡�");
		return false;
	}
/*
	chkReturn = chkText($("#detailAddr").val(), 5, 30);
	if (chkReturn.Res != 1) {
		ShowErrMsg("����ȷ��д��ϸ��ַ��5��30���֡�");
		return false;
	}
*/
	if ("0" == $("#qualification").val()) {
		ShowErrMsg("��ѡ������ѧ����");
		return false;
	}
	
	if ($("#isAgree").hasClass("sel")) {
		return true;
	}else{
		ShowErrMsg("��ȷ�����ú�Լ��");
		return false;
	}

}

//ajaxУ���Ƿ��Ѿ��ǳֿ��û�
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

//ajax��ȡ������֤��
function getSMSCode() {
	$("#btnGetSMSCode").click(function() {});
	var chkReturn = chkMobile($("#mobile").val());
	if (chkReturn.Res != 1) {
		ShowErrMsg("����д��ȷ���ֻ���");
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
	        		$("#btnGetSMSCode").val("���»�ȡ(60)");
	        		var btntextchange = setInterval(function() {
	        			lefttime--;
	        			$("#btnGetSMSCode").val("���»�ȡ(" + lefttime + ")");
	
	        			if (0 == lefttime) {
	        				$("#btnGetSMSCode").val("���»�ȡ");
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

//��ʾ������Ϣ
var ShowErrMsg = function(errMsg) {
	$("#errMsgDiv").html("<em>!</em>" + errMsg);
	$("#errMsgDiv").css({"display":"block"});
}

//���ع�����
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
