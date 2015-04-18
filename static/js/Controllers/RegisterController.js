function RegisterController() {
    var register_controller = this;
    this.getData = function() {
        var inputs = $('#register-one-card input');
        var data = {
            "username": inputs[0].value,
            "passwd": inputs[1].value,
            "card_id": inputs[2].value,
            "card_passwd": inputs[3].value
        }
        return data;
    };
    this.errorAlert = function(s) {
        //错误提示，应该是个模态框block一下比较好吧，太麻烦，不写了等着ui写出来再加上吧
        alert(s);
    };
    // this.init = (function(){
    //     var ri = new RegisterModel();
    //     $('#register-one-card > .button').click(function(){ri.register( register_controller.getData(), register_controller.errorAlert ); });
    //     $('#register-one-card>input:eq(0)').blur(function(){ ri.usernameLoseFocus( $(this).val(), register_controller.errorAlert ); });
    //     $('#register-one-card>input:eq(2)').blur(function(){ ri.cardIdLoseFocus( $(this).val(), register_controller.errorAlert ); });
    // })();
    return this;
}
$(function(){
        var ri = new RegisterModel();
        var register_controller = new RegisterController();
        $('#register-one-card > .button').click(function(){ri.register( register_controller.getData(), register_controller.errorAlert ); });
        $('#register-one-card>input:eq(0)').blur(function(){ ri.usernameLoseFocus( $(this).val(), register_controller.errorAlert ); });
        $('#register-one-card>input:eq(2)').blur(function(){ ri.cardIdLoseFocus( $(this).val(), register_controller.errorAlert ); });
    });