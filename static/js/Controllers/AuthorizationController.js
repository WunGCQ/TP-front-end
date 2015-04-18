//Controller
function AuthorizationController() {
    this.errorAlert = function (s) {
        alert(s);
        // window.location.href = getBase() + "login.html";
         // window.location.href = "http://127.0.0.1/TP-front-end/static/templates/login.html";
        window.location.href = "./login.html";
    };
}