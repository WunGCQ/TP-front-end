function get_style(elem,attr) {
    if(elem.style[attr]){
        //若样式存在于html中,优先获取
        return elem.style[attr];
    }else if(elem.currentStyle){
        //IE下获取CSS属性最终样式(同于CSS优先级)
        return elem.currentStyle[attr];
    }else if(document.defaultView && document.defaultView.getComputedStyle){
        //W3C标准方法获取CSS属性最终样式(同于CSS优先级)
        //注意,此法属性原格式(text-align)获取的,故要转换一下
        attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
        //获取样式对象并获取属性值
        return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attr);
    }else{
        return null;
    }
}
function set_style(elem,css) {
    if(elem!=null || typeof(elem)!=undefined){
        elem.style.cssText = css;
        return true;
    }
    else{
        return false;
    }

}

var cookie_methods ={};
//JS操作cookies方法!
//写cookies
cookie_methods.set_cookie = function (name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};
//读取cookies
cookie_methods.get_cookie = function(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
};
//删除cookies
cookie_methods.delCookie = function(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};
//使用示例
cookie_methods.set_cookie("name","hayden");
//alert(cookie_methods.get_cookie("name"));