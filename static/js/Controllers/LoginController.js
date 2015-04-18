function LoginController() {
    var login_controller = this;
    this.getData = function(){
        var inputs = $('#login-one-card input');
        var data = {
            "username": inputs[0].value,
            "passwd": inputs[1].value,
        }
        return data;
    };
    this.errorAlert = function(s) {
        alert(s);
    };
    // this.init = (function () {
    //     var li = new LoginModel();
    //     $('#login-one-card > .button').click(function(){
    //         li.login(login_controller.getData(), login_controller.errorAlert);
    //     });
    // })();
    return this;
}
$(function () {
        var li = new LoginModel();
        var login_controller = new LoginController();
        $('#login-one-card > .button').click(function(){
            li.login(login_controller.getData(), login_controller.errorAlert);
        });
    });