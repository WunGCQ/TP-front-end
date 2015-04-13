window.LoginModel = function(){
    return this;
}
LoginModel.prototype.login = function(data, errorAlert){
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
                errorAlert(result.error.message);
            }
        });
}