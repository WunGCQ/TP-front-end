/**
 * Created by WunG on 2015/2/4.
 */
var UI_animate = {};
UI_animate.shake = function(obj){
    if(obj.className.indexOf("animate-shaking")==-1){
        if(obj.classList[0]=="undefined"){
            obj.className = "animate-shaking";
        }
        else{
            obj.className += " animate-shaking";
        }

    }
    else{

    }
};
UI_animate.remove_animation = function(obj){
    var classname = obj.className.split(' ');
    var temp_class_name = "";
    for(var i = 0;i< classname.length; i++) {
        if(classname[i].indexOf('animate')==-1 && classname[i]!="undefined"){
            temp_class_name+=" "+classname[i];
        }
    }
    obj.className = temp_class_name;
    return;
};