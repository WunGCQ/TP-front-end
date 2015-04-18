window.RegisterModel = function(){
    return this;
};
RegisterModel.prototype.dataCheck = function(data, errorAlert){
    var rgExp, judge;
    rgExp = rgExpVerifyTable.username;
    if(!rgExp.exec(data.username)) {
        errorAlert("用户名格式错误");
        return false;
    }
    rgExp = rgExpVerifyTable.passwd;
    if(!rgExp.exec(data.passwd)) {
        errorAlert("注册密码不能少于8位");
        return false;
    }
    rgExp = rgExpVerifyTable.card_id;
    if(!rgExp.exec(data.card_id)) {
        errorAlert("学号格式错误");
        return false;
    }
    rgExp = rgExpVerifyTable.card_passwd;
    if(!rgExp.exec(data.card_passwd)) {
        errorAlert("一卡通密码为六位数字");
        return false;
    }
    return true;
}

RegisterModel.prototype.register = function(data, errorAlert){
    if(RegisterModel.prototype.dataCheck(data, errorAlert)){
        $.ajax({
            type: 'post',
            url: getBase()+'/register',
            data: {
                username: data.username,
                passwd: encryption(data.passwd),
                card_id: data.card_id,
                card_passwd: encryption(data.card_passwd)
            },
            beforeSend: function(XHR) { XHR.setRequestHeader("User-Agent",navigator.userAgent); },
            dataType: 'json',
            success: function(data,xhr){
                localStorage.token = data.token;
                window.location.href = './index.html';
            },
            error: function(xhr,m,t){
                var result = eval("("+xhr.responseText+")");
                errorAlert(result.error.message);
            }
        });
    }
}

RegisterModel.prototype.usernameLoseFocus = function(username, errorAlert){
    var rgExp = rgExpVerifyTable.username;
    if(!rgExp.exec(username)) {
        errorAlert("用户名格式错误，应不超过三十位");
        return;
    }
    $.ajax({
        type: 'get',
        url: getBase()+'/register',
        data:{
            username: username
        },
        beforeSend: function(XHR) { XHR.setRequestHeader("User-Agent",navigator.userAgent); console.log(username);},
        dataType: 'json',
        // success: function(data){
        //     if (data.message == 'success') console.log("用户名学号可注册");
        //     else console.log("???");
        // },
        error: function(data){
            errorAlert("用户名已被注册");
        }
    });
};

RegisterModel.prototype.cardIdLoseFocus = function(card_id, errorAlert){
    var rgExp = rgExpVerifyTable.card_id;
    console.log(rgExpVerifyTable.card_id);
    if(!rgExp.exec(card_id)) {
        errorAlert("学号格式错误");
        return;
    }
    $.ajax({
        type: 'get',
        url: getBase()+'/register',
        data:{
            card_id: card_id
        },
        beforeSend: function(XHR) { XHR.setRequestHeader("User-Agent",navigator.userAgent); },
        dataType: 'json',
        // success: function(data){
        //     if (data.message == 'success') console.log("用户名学号可注册");
        //     else console.log("???");
        // },
        error: function(data){
            errorAlert("学号已被注册");
        }
    });
};
