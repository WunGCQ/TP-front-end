/**
 * Created by wungcq on 15/3/9.
 */
window.time_line_controller = function(){
    return this;
};
HTMLCollection.prototype._indexOf = function(elem){
    var index = 0;
    for(var i = 0; i<this.length; i++ ){
        if(this[i].innerHTML ==elem.innerHTML){
            return index;
        }
        else{
            index++;
        }
    }
    if(index>this.length){
        return -1;
    }
};
NodeList.prototype._indexOf = function(elem){
    var index = 0;
    for(var i = 0; i<this.length; i++ ){
        if(this[i].innerHTML ==elem.innerHTML){
            return index;
        }
        else{
            index++;
        }
    }
    if(index>this.length){
        return -1;
    }
};

time_line_controller.prototype.user_regist_year = 2011;
time_line_controller.prototype.today = new Date();

time_line_controller.prototype._init = function(callback){
    this.year = parseInt(this.today.getFullYear());
    this.month = parseInt(this.today.getMonth()) + 1;
    var fragment_str = "";
    for(var i = this.year; i >= this.user_regist_year; i--) {

        fragment_str += '<div class="year-point inactive"><div class="i"></div><time>'+i+'</time>';

        if(this.year == i) {
            for(var j = this.month; j>= 1; j--) {

                fragment_str+= '<div class="month-point-wrapper">'+'<div class="month-point-box"><div class="i month-point"></div></div>'+'<span class="hidden">'+j+'月'+'</span>'+'</div>';

            }
        }else {
            for(var k = 12; k>= 1; k--) {

                fragment_str+= '<div class="month-point-wrapper">'+'<div class="month-point-box"><div class="i month-point"></div></div>'+'<span class="hidden">'+k+'月'+'</span>'+'</div>';

            }
        }
        fragment_str += "</div>";
    }
    document.getElementsByClassName("time-line")[0].getElementsByClassName("ul")[0].innerHTML = fragment_str;
    this.bind();
};
time_line_controller.prototype.bind = function(){
    $(".year-point").mouseover(function(){
        var target = this;
        var year_points = target.parentNode.children;
        var index = year_points._indexOf(target);
        for(var i = 0; i< year_points.length;i++) {
            if(i!=index) {
                year_points[i].className = "year-point inactive";
            }
        }
        target.className = "year-point active";
    });

    $(".month-point-wrapper").hover(function(){
        var elem = this;
        var points = elem.parentNode.getElementsByClassName("month-point-wrapper");
        var index = points._indexOf(elem)==-1 ? (-1):(points._indexOf(elem));
        //$(points[index].children[0].children[0]).css({"box-shadow": "0 0 1px 1px rgba(255, 255, 255, .6)"});
        if(index>-1){
            var r = 9;
            for(var i = index; i >= 0; i--) {
                if(r<1){
                    r=1;
                }
                $(points[i].getElementsByClassName("month-point")[0]).css({"width":r,"height":r});
                if(r == 1) {
                    $(points[i].getElementsByClassName("month-point")[0]).css({"box-shadow": "0 0 1px 1px rgba(255, 255, 255, .6)"});
                }
                r--;
            }
            r = 9;
            for(var j = index; j<points.length; j++) {
                if(r<1){
                    r=1;
                }
                $(points[j].getElementsByClassName("month-point")[0]).css({"width":r,"height":r});
                if(r == 1) {
                    $(points[j].getElementsByClassName("month-point")[0]).css({"box-shadow": "0 0 1px 1px rgba(255, 255, 255, .6)"});
                }
                r--;
            }
        }
    });
    $(".time-line").mouseleave(function(){
        $(".year-point").attr("class","year-point inactive");
    });
};

//实例化
window.time_line_controller_entity = new window.time_line_controller();
time_line_controller_entity._init();