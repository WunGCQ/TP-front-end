window.AuthorizationModel = function(){
    return this;
};

AuthorizationModel.prototype.tokenTest = function(errorAlert){
    var judge = false;
    $.ajax({
        type: 'get',
        url: getBase()+"/token_test",
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("User-Agent",navigator.userAgent); 
            xhr.setRequestHeader("token", localStorage.token);
        },
        dataType: 'json',
        async: false,
        success: function(data,xhr){
            judge = true;
            // console.log(judge);
            // console.log(data);
        },
        error: function(xhr,m,t){
            var result = eval("("+xhr.responseText+")");
            //console.log(errorAlert);
            errorAlert(result.error.message);
        }
    });
    // console.log(judge);
    return judge;
};

