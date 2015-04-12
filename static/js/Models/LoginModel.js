window.LoginModel = function(){
    return this;
}

LoginModel.prototype.getData=function(){
    var inputs = $('#login-one-card input');
    var data = {
        "username": inputs[0].value,
        "passwd": inputs[1].value,
    }
    return data;
}

LoginModel.prototype.errorAlert = function(error){
    //错误提示，应该是个模态框block一下比较好吧，太麻烦，不写了等着ui写出来再加上吧
    alert(error);
}

LoginModel.prototype.login = function(){
    var data = LoginModel.prototype.getData();
    $.ajax({
            type: 'post',
            url: getBase()+'/login',
            data: {
                username: data.username,
                passwd: encryption(data.passwd),
            },
            beforeSend: function(XHR) { XHR.setRequestHeader("User-Agent",navigator.userAgent); },
            dataType: 'json',
            success: function(data,xhr){
                localStorage.token = data.token;
                //alert(localStorage.token);
                window.location.href = './index.html';
            },
            error: function(xhr,m,t){
                var result = eval("("+xhr.responseText+")");
                LoginModel.prototype.errorAlert(result.error.message);
            }
        });
}