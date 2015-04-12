//
/////数据检查正则表///
//username: 1个以上30个任意字符以内
//passwd: 8位以上20位以下的字母和数字
//card_id: 头两位字母+6位数字||8位数字
//card_passwd: 6位数字
//
var rgExpVerifyTable = {
    username: /^.{1,30}$/,
    passwd: /^[0-9a-zA-Z]{8,20}$/,
    card_id: /^(([a-z]{2}\d{6})|(\d{8}))$/,
    card_passwd: /^\d{6}$/
};