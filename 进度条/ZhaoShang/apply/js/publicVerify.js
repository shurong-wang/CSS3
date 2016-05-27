;

String.prototype.trim = function() { return this.replace(/(^\s*)|(\s*$)/g, ""); };

//检查用户的中文名，iName 为输入姓名， nMinLen,nMaxLen为最小最大长度
function chkUserName(iName, nMinLen, nMaxLen) {
    var res = 3,msg = "";
    if (iName.length >= nMinLen && iName.length <= nMaxLen) { 
    	res = 1; 
    }
    if (0 != iName.length && (iName.length < nMinLen || iName.length > nMaxLen)) {
        res = 3;
        msg = nMinLen + "-" + nMaxLen + "个中文字符";
    }
    var reg = /^[^~!@#\$%^&\*\(\)_\+\-=\{\}\|<>\?\[\];':",\.0123456789]+$/;
    if (!reg.test(iName)) {
        res = 3;
        msg = nMinLen + "-" + nMaxLen + "个中文字符";
    }
    if (0 == iName.length) {
        res = 2;
        msg = "";
    }
    return { "Res": res, "Msg": msg };
}

//检查是否全为字母
function IsAllLetter(str) {
    str = str.toUpperCase();
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != ' ' && (str.charAt(i) < 'A' || str.charAt(i) > 'Z')) { return false; }
    }
    return true;
}

//检查是否全为数字
function IsAllDigital(str) {
    if (null == str) {  
    	return true; 
    }
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) > '9' || str.charAt(i) < '0') {
            return false;
        }
    }
    return true;
}

//检查用户的英文姓名
function chkPinYinName(iPinyin, nMinLen, nMaxLen) {
    var res = 3,msg = "";

    if (iPinyin.length >= nMinLen && iPinyin.length <= nMaxLen && IsAllLetter(iPinyin)) {
    	res = 1; 
    }
    if (0 == iPinyin.length) {
        res = 2; //没有输入内容时不显示
    }
    
    return { "Res": res, "Msg": msg };
}

//检查身份证号(一代15位)
function chkID(iIDNO) {
    var area = {11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: " 上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: " 湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: " 陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    var reg = /^(\d{14}|\d{17})(\d|x|X)$/,res = 2,msg = "";

    if (iIDNO.length > 0) {
        if (reg.test(iIDNO)) {
            var areacode = iIDNO.substr(0, 2);
            if (null == area[areacode] || undefined == area[areacode]) {
                res = 3;
                msg = "请输入正确的身份证号码";
            }else {
                if (15 == iIDNO.length) {
                    var iyear = iIDNO.substr(6, 2),
                    	imonth = iIDNO.substr(8, 2),
                    	iday = iIDNO.substr(10, 2);
                    
                    var chkDate= IsValidDate(iyear, imonth, iday);
                    res = chkDate.Res;
                    msg = "请输入正确的身份证号码";
                }else {
                    var chkID2 = IsValidID2(iIDNO);
                    res = chkID2.Res;
                    msg = chkID2.Msg;
                }
            }
        }else {
            res = 3;
            msg = "请输入正确的身份证号码";
        }
    }
    
    return { "Res": res, "Msg": msg };
}

//检查身份证号(二代18位)
function IsValidID2(iIDNO) {
    var res = 2,msg = "",arr=[1,0,'X',9,8,7,6,5,4,3,2];
    var iyear = iIDNO.substr(6, 4),
    	imonth = iIDNO.substr(10, 2),
    	iday = iIDNO.substr(12, 2);
    
    var chkDate = IsValidDate(iyear, imonth, iday);
    
    if (1 != chkDate.Res) {
        return { "Res": chkDate.Res, "Msg": "请输入正确的身份证号码" };
    }
    
    var a, b, c;
    a = parseInt(iIDNO.substr(0, 1)) * 7 + parseInt(iIDNO.substr(1, 1)) * 9 + parseInt(iIDNO.substr(2, 1)) * 10;
    a = a + parseInt(iIDNO.substr(3, 1)) * 5 + parseInt(iIDNO.substr(4, 1)) * 8 + parseInt(iIDNO.substr(5, 1)) * 4;
    a = a + parseInt(iIDNO.substr(6, 1)) * 2 + parseInt(iIDNO.substr(7, 1)) * 1 + parseInt(iIDNO.substr(8, 1)) * 6;
    a = a + parseInt(iIDNO.substr(9, 1)) * 3 + parseInt(iIDNO.substr(10, 1)) * 7 + parseInt(iIDNO.substr(11, 1)) * 9;
    a = a + parseInt(iIDNO.substr(12, 1)) * 10 + parseInt(iIDNO.substr(13, 1)) * 5 + parseInt(iIDNO.substr(14, 1)) * 8;
    a = a + parseInt(iIDNO.substr(15, 1)) * 4 + parseInt(iIDNO.substr(16, 1)) * 2;
    b = a % 11;
    c = 2 == b ? iIDNO.substr(17, 1).toUpperCase() : parseInt(iIDNO.substr(17, 1));
    
    if (c == arr[b]) {
        res = 1;
    } else {
        res = 3;
        msg = "请输入正确的身份证号码";
    }
    return { "Res": res, "Msg": msg };
}

//验证出生日期
function IsValidDate(iYear, iMonth, iDay) {
    var res = 2, msg = "";
    if (2 == iYear.length) {
        var tempyear = '20' + iYear,nNow = new Date();
        iYear = parseInt(nNow.getFullYear()) < parseInt(tempyear) ? ("19" + iYear) : tempyear;
    }
    try{
        var tempdate = new Date(iYear + '/' + iMonth + '/' + iDay);
        if (tempdate.getFullYear() != iYear || tempdate.getMonth() != (iMonth-1) || tempdate.getDate() != iDay) {
            res = 3;
            msg = "日期出错";
        } else {
            res = 1;
        }
    }catch(e){
        res = 3;
        msg = "日期出错";
    }
    return { "Res": res, "Msg": msg };
}

//18至60周岁的境内人士才能申请
function chkAge(iIDNO) {
    var iyear, imonth, iday, nNow = new Date(), res = 2, msg = "";
    if (15 == iIDNO.length) {
        iyear = iIDNO.substr(6, 2);
        imonth = iIDNO.substr(8, 2);
        iday = iIDNO.substr(10, 2);
        var tempyear = '20' + iyear;

        iyear = parseInt(nNow.getFullYear()) < parseInt(tempyear) ? ("19" + iyear) : tempyear;
    } else {
        iyear = iIDNO.substr(6, 4);
        imonth = iIDNO.substr(10, 2);
        iday = iIDNO.substr(12, 2);
    }

    var birday = new Date(iyear + "/" + imonth + "/" + iday);
    var beginyear = parseInt(iyear) + 18, endyear = parseInt(iyear) + 60;
    var beginday = new Date(beginyear + "/" + imonth + "/" + iday), endday = new Date(endyear + "/" + imonth + "/" + iday);

    if (beginday < nNow && endday > nNow) { 
    	res = 1; 
    } else {
        res = 3;
        msg = "目前只接受18-60周岁人士通过身份证提出的申请";
    }
    return { "Res": res, "Msg": msg };
}

//境内人士要求14周岁以上才能拥有附属卡
function chkAgeIs14(iIDNO) {
    var iyear, imonth, iday, nNow = new Date(), res = 2, msg = "";
    if (15 == iIDNO.length) {
        iyear = iIDNO.substr(6, 2);
        imonth = iIDNO.substr(8, 2);
        iday = iIDNO.substr(10, 2);
        var tempyear = '20' + iyear;

        iyear = parseInt(nNow.getFullYear()) < parseInt(tempyear) ? ("19" + iyear) : tempyear;
    } else {
        iyear = iIDNO.substr(6, 4);
        imonth = iIDNO.substr(10, 2);
        iday = iIDNO.substr(12, 2);
    }
    var birday = new Date(iyear + "/" + imonth + "/" + iday);
    var beginyear = parseInt(iyear) + 14;
    var beginday = new Date(beginyear + "/" + imonth + "/" + iday);

    if (beginday < nNow) { 
    	res = 1; 
    } else {
        res = 3;
        msg = "境内人士要求14周岁以上才能拥有附属卡";
    }
    return { "Res": res, "Msg": msg };
}

//检查手机号
function chkMobile(iMobile) {
    var res = 3, msg = "",reg = /^[0]{0,1}1[0-9]{10,10}$/;

    if (reg.test(iMobile)) {
    	res = 1; 
    } else { 
    	msg = "手机号码填写不正确"; 
    }
    if (0 == iMobile.length) {
        res = 2;
        msg = "";
    }
    return { "Res": res, "Msg": msg };
}

//验证电话号吗
function IsValidPhone(iZone, iPhoneNum, iExtension) {
    if (IsAllDigital(iZone) && iZone.length >= 3 && iZone.length <= 4 && IsAllDigital(iPhoneNum)
		&& (iPhoneNum.length == 7 || iPhoneNum.length == 8 || iPhoneNum.length == 11) && IsAllDigital(iExtension)) {//全部正确返回1
        return { "Res": "1", "Msg": "" };
    }
    //如果全部正确，前面的则已经返回，这里只处理部分输入，并且已输入的部分无论长度还是内容都是正确的
    if ((IsAllDigital(iZone) && (iZone.length == 0 || (iZone.length >= 3 && iZone.length <= 4)))
	&& (IsAllDigital(iPhoneNum) && (iPhoneNum.length == 0 || (iPhoneNum.length == 7 || iPhoneNum.length == 8 || iPhoneNum.length == 11)))
	&& IsAllDigital(iExtension)) {
        return { "Res": "2", "Msg": "" };
    }
    return { "Res": "3", "Msg": "电话号码位数不正确" };
}

//检查Email
function chkEmail(iEmail) {
    var res = 1,msg = "";
    var reg = /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (0 == iEmail.length) {
        res = 2;
    } else {
        if (!reg.test(iEmail)) {
            res = 3;
            msg = "邮箱格式不正确";
        }
    }
    return { "Res": res, "Msg": msg };
}

//该函数允许用户输入中文，英文，数字等内容
function chkText(iText, nMinLen, nMaxLen) {
    var res = 3, msg = "请填写" + nMinLen + "-" + nMaxLen + "个汉字";

    if (iText.length >= nMinLen && iText.length <= nMaxLen) { 
    	res = 1; 
    }
    if (0 != iText.length && (iText.length < nMinLen || iText.length > nMaxLen)) { 
    	res = 3;  
    }
    var reg = /^[^~!@#\$%^&\*_\+\-\{\}\|<>\?\[\];':",\.]+$/;
    if (!reg.test(iText)) {  
    	res = 3; 
    }
    if (0 == iText.length) {
        res = 2; //没有输入内容时不显示
    }
    return { "Res": res, "Msg": msg };
}

