window.RegisterModel = function(){
    return this;
};
RegisterModel.prototype.getData=function(){
    var inputs = $('#register-one-card input');
    var data = {
        "username": inputs[0].value,
        "passwd": inputs[1].value,
        "card_id": inputs[2].value,
        "card_passwd": inputs[3].value
    }
    return data;
}
RegisterModel.prototype.dataCheck = function(data){
    var rgExp, judge;
    rgExp = rgExpVerifyTable.username;
    if(!rgExp.exec(data.username)) {
        RegisterModel.prototype.errorAlert("用户名格式错误");
        return false;
    }
    rgExp = rgExpVerifyTable.passwd;
    if(!rgExp.exec(data.passwd)) {
        RegisterModel.prototype.errorAlert("注册密码不能少于8位");
        return false;
    }
    rgExp = rgExpVerifyTable.card_id;
    if(!rgExp.exec(data.card_id)) {
        RegisterModel.prototype.errorAlert("学号格式错误");
        return false;
    }
    rgExp = rgExpVerifyTable.card_passwd;
    if(!rgExp.exec(data.card_passwd)) {
        RegisterModel.prototype.errorAlert("一卡通密码为六位数字");
        return false;
    }
    return true;
}
RegisterModel.prototype.errorAlert = function(error){
    //错误提示，应该是个模态框block一下比较好吧，太麻烦，不写了等着ui写出来再加上吧
    alert(error);
}

RegisterModel.prototype.register = function(){
    var data = RegisterModel.prototype.getData();
    if(RegisterModel.prototype.dataCheck(data)){
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
                RegisterModel.prototype.errorAlert(result.error.message);
            }
        });
    }
}

RegisterModel.prototype.usernameLoseFocus = function(element){
    var username = element.val();
    var rgExp = rgExpVerifyTable.username;
    if(!rgExp.exec(username)) {
        RegisterModel.prototype.errorAlert("用户名格式错误，应不超过三十位");
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
            RegisterModel.prototype.errorAlert("用户名已被注册");
        }
    });
};

RegisterModel.prototype.cardIdLoseFocus = function(element){
    var card_id = element.val();
    var rgExp = rgExpVerifyTable.card_id;
    console.log(rgExpVerifyTable.card_id);
    if(!rgExp.exec(card_id)) {
        RegisterModel.prototype.errorAlert("学号格式错误");
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
            RegisterModel.prototype.errorAlert("学号已被注册");
        }
    });
};

