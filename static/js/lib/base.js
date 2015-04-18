function getBase(){
    var treaty = window.location.href.split("://")[0];
    var domain = window.location.href.split("://")[1].split("/")[0];
    //return treaty + "://" + domain;
    //测试
    return 'http://api.withinyou.cn/v1'
}