;

String.prototype.trim = function() { return this.replace(/(^\s*)|(\s*$)/g, ""); };

//����û�����������iName Ϊ���������� nMinLen,nMaxLenΪ��С��󳤶�
function chkUserName(iName, nMinLen, nMaxLen) {
    var res = 3,msg = "";
    if (iName.length >= nMinLen && iName.length <= nMaxLen) { 
    	res = 1; 
    }
    if (0 != iName.length && (iName.length < nMinLen || iName.length > nMaxLen)) {
        res = 3;
        msg = nMinLen + "-" + nMaxLen + "�������ַ�";
    }
    var reg = /^[^~!@#\$%^&\*\(\)_\+\-=\{\}\|<>\?\[\];':",\.0123456789]+$/;
    if (!reg.test(iName)) {
        res = 3;
        msg = nMinLen + "-" + nMaxLen + "�������ַ�";
    }
    if (0 == iName.length) {
        res = 2;
        msg = "";
    }
    return { "Res": res, "Msg": msg };
}

//����Ƿ�ȫΪ��ĸ
function IsAllLetter(str) {
    str = str.toUpperCase();
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != ' ' && (str.charAt(i) < 'A' || str.charAt(i) > 'Z')) { return false; }
    }
    return true;
}

//����Ƿ�ȫΪ����
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

//����û���Ӣ������
function chkPinYinName(iPinyin, nMinLen, nMaxLen) {
    var res = 3,msg = "";

    if (iPinyin.length >= nMinLen && iPinyin.length <= nMaxLen && IsAllLetter(iPinyin)) {
    	res = 1; 
    }
    if (0 == iPinyin.length) {
        res = 2; //û����������ʱ����ʾ
    }
    
    return { "Res": res, "Msg": msg };
}

//������֤��(һ��15λ)
function chkID(iIDNO) {
    var area = {11: "����", 12: "���", 13: "�ӱ�", 14: "ɽ��", 15: "���ɹ�", 21: "����", 22: "����", 23: "������", 31: " �Ϻ�", 32: "����", 33: "�㽭", 34: "����", 35: "����", 36: "����", 37: "ɽ��", 41: "����", 42: "����", 43: " ����", 44: "�㶫", 45: "����", 46: "����", 50: "����", 51: "�Ĵ�", 52: "����", 53: "����", 54: "����", 61: " ����", 62: "����", 63: "�ຣ", 64: "����", 65: "�½�", 71: "̨��", 81: "���", 82: "����", 91: "����" };
    var reg = /^(\d{14}|\d{17})(\d|x|X)$/,res = 2,msg = "";

    if (iIDNO.length > 0) {
        if (reg.test(iIDNO)) {
            var areacode = iIDNO.substr(0, 2);
            if (null == area[areacode] || undefined == area[areacode]) {
                res = 3;
                msg = "��������ȷ�����֤����";
            }else {
                if (15 == iIDNO.length) {
                    var iyear = iIDNO.substr(6, 2),
                    	imonth = iIDNO.substr(8, 2),
                    	iday = iIDNO.substr(10, 2);
                    
                    var chkDate= IsValidDate(iyear, imonth, iday);
                    res = chkDate.Res;
                    msg = "��������ȷ�����֤����";
                }else {
                    var chkID2 = IsValidID2(iIDNO);
                    res = chkID2.Res;
                    msg = chkID2.Msg;
                }
            }
        }else {
            res = 3;
            msg = "��������ȷ�����֤����";
        }
    }
    
    return { "Res": res, "Msg": msg };
}

//������֤��(����18λ)
function IsValidID2(iIDNO) {
    var res = 2,msg = "",arr=[1,0,'X',9,8,7,6,5,4,3,2];
    var iyear = iIDNO.substr(6, 4),
    	imonth = iIDNO.substr(10, 2),
    	iday = iIDNO.substr(12, 2);
    
    var chkDate = IsValidDate(iyear, imonth, iday);
    
    if (1 != chkDate.Res) {
        return { "Res": chkDate.Res, "Msg": "��������ȷ�����֤����" };
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
        msg = "��������ȷ�����֤����";
    }
    return { "Res": res, "Msg": msg };
}

//��֤��������
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
            msg = "���ڳ���";
        } else {
            res = 1;
        }
    }catch(e){
        res = 3;
        msg = "���ڳ���";
    }
    return { "Res": res, "Msg": msg };
}

//18��60����ľ�����ʿ��������
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
        msg = "Ŀǰֻ����18-60������ʿͨ�����֤���������";
    }
    return { "Res": res, "Msg": msg };
}

//������ʿҪ��14�������ϲ���ӵ�и�����
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
        msg = "������ʿҪ��14�������ϲ���ӵ�и�����";
    }
    return { "Res": res, "Msg": msg };
}

//����ֻ���
function chkMobile(iMobile) {
    var res = 3, msg = "",reg = /^[0]{0,1}1[0-9]{10,10}$/;

    if (reg.test(iMobile)) {
    	res = 1; 
    } else { 
    	msg = "�ֻ�������д����ȷ"; 
    }
    if (0 == iMobile.length) {
        res = 2;
        msg = "";
    }
    return { "Res": res, "Msg": msg };
}

//��֤�绰����
function IsValidPhone(iZone, iPhoneNum, iExtension) {
    if (IsAllDigital(iZone) && iZone.length >= 3 && iZone.length <= 4 && IsAllDigital(iPhoneNum)
		&& (iPhoneNum.length == 7 || iPhoneNum.length == 8 || iPhoneNum.length == 11) && IsAllDigital(iExtension)) {//ȫ����ȷ����1
        return { "Res": "1", "Msg": "" };
    }
    //���ȫ����ȷ��ǰ������Ѿ����أ�����ֻ���������룬����������Ĳ������۳��Ȼ������ݶ�����ȷ��
    if ((IsAllDigital(iZone) && (iZone.length == 0 || (iZone.length >= 3 && iZone.length <= 4)))
	&& (IsAllDigital(iPhoneNum) && (iPhoneNum.length == 0 || (iPhoneNum.length == 7 || iPhoneNum.length == 8 || iPhoneNum.length == 11)))
	&& IsAllDigital(iExtension)) {
        return { "Res": "2", "Msg": "" };
    }
    return { "Res": "3", "Msg": "�绰����λ������ȷ" };
}

//���Email
function chkEmail(iEmail) {
    var res = 1,msg = "";
    var reg = /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (0 == iEmail.length) {
        res = 2;
    } else {
        if (!reg.test(iEmail)) {
            res = 3;
            msg = "�����ʽ����ȷ";
        }
    }
    return { "Res": res, "Msg": msg };
}

//�ú��������û��������ģ�Ӣ�ģ����ֵ�����
function chkText(iText, nMinLen, nMaxLen) {
    var res = 3, msg = "����д" + nMinLen + "-" + nMaxLen + "������";

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
        res = 2; //û����������ʱ����ʾ
    }
    return { "Res": res, "Msg": msg };
}

