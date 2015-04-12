$(function(){
    var li = new LoginModel();
    $('#login-one-card > .button').click(function(){
        li.login();
    });
    var ri = new RegisterModel();
    $('#register-one-card > .button').click(function(){ri.register();});
    $('#register-one-card>input:eq(0)').blur(function(){ri.usernameLoseFocus($(this));});
    $('#register-one-card>input:eq(2)').blur(function(){ri.cardIdLoseFocus($(this));});
});