/**
 * Created by WunG on 2015/2/6.
 */
function waterfall_layout_control() {
    this.arg = arguments[0];
    this.water_fall_wrapper_id = this.arg.water_fall_warpper_id||"water_fall_wrapper";
    this.content_wrapper_class = this.arg.content_wrapper_class||"card-row";
    this.content_class = this.arg.content_class||"card";
    this.content_box_width = this.arg.content_box_width||350;
    this.get_water_fall_wrapper = function () {
        return (document.getElementById(this.water_fall_wrapper_id));
    };
    this.calc_row_number = function() {
        var waterfall_width = document.getElementById(this.water_fall_wrapper_id)._css("width");
        var width = parseInt(waterfall_width);
        return Math.floor(width/this.content_box_width);
    };

    this.get_lowest_row = function() {
        var row_number = this.calc_row_number();
        var lower_number = 65535;
        var res = 0;
        var content_wrappers = document.getElementsByClassName(this.content_wrapper_class);
        //寻找最底部靠上的列
        while(row_number--) {
            if(parseInt(content_wrappers[row_number]._css("height"))<lower_number) { //为了使信息尽量靠左放置，所以设为小于号
                res = row_number;
            }
        }
        return content_wrappers[lower_number];
    };

    //TODO
    this.form_content_fragment = function() {
        var range = document.createRange();
        var str = ['<div class="card"></div>'];
    };

    //TODO
    this.add_content = function(elem) {
        this.find_lowest_row().appendChild(fragment);
        return fragment;
    };

    //引用一下张鑫旭的代码,开源大法好,这是为填充内容的容器添加动画的函数
    window.funTransitionHeight = function(element, time) { // time, 数值，可缺省
        if (typeof window.getComputedStyle == "undefined") return;

        var height = element._css("height");
        element._css("height", "auto");
        var targetHeight = element._css("height");
        element._css("height", height);
        setTimeout(function() {
            if (time) element.style.transition = "height "+ time +"ms";
            element._css("height", targetHeight);
        }, 15);
    };
    return this;
}


//Node.prototype._css = function(style_name,value)  {
//    if(typeof window.getComputedStyle == "undefined")  {
//        return;
//    }
//    else {
//        if(value!=null) {
//            this.style[style_name] = value;
//        }
//        return getComputedStyle(this)[style_name];
//    }
//};