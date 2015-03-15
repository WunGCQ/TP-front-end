/**
 * Created by WunG on 2015/1/31.
 */
function calendar() {
    /*
     判断是否是闰年
     */
    this.is_lunar_year = function (Year) {
        if ((Year % 4 == 0 && Year % 100 != 0) || (Year % 400 == 0)) {
            return 1;
        }
        else {
            return 0;
        }
    };
//每个月有多少天
    this.days_in_every_month = {
        1: 31,
        2: 28 + this.is_lunar_year(this.this_year),
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    };
    this.week_in_Chinese = {
      1:"星期一",
      2:"星期二",
      3:"星期三",
      4:"星期四",
      5:"星期五",
      6:"星期六",
      0:"星期日"
    };
//今天
    this.today = new Date();
//今年
    this.this_year = parseInt(this.today.getFullYear());
//星期几 字符形式
    this.week_day = this.today.toDateString().slice(0, 3);
//星期几 数字顺序
    this.the_week_day_sequence_of_today = (this.today.getDay()==0?7:this.today.getDay());
//星期几 中文
    this.the_week_day_in_Chinese = this.week_in_Chinese[this.today.getDay().toString()];

    /*获取this block及其内部元素的DOM*/
    this.get_calendar_views = function () {
        var res = {};
        res.calendar_view = document.getElementById('calendar');
        res.day_block_array = res.calendar_view.children;

        res.day_span_array = (function () {
            var result = {};
            result.temp_span = [];
            result.temp_i = [];
            for (var i = 0; i < res.day_block_array.length - 1; i++) {
                result.temp_span.push(res.day_block_array[i].getElementsByTagName('span')[1]);
                result.temp_i.push(res.day_block_array[i].getElementsByTagName('i')[0]);
            }
            return result;
        })();
        res.day_todo_bar = res.day_span_array.temp_i;//显示进度条
        res.day_span_array = res.day_span_array.temp_span;//显示日期的span
        return res;
    };

    this.calendar_dom_tree = this.get_calendar_views();

    /*根据已经计算的部分属性来填充周历*/
    this.fill_calendar_day_block = function () {
        var iterator = this.today;
        var position = this.the_week_day_sequence_of_today;
        this.calendar_dom_tree.day_span_array[position - 1].innerHTML = this.today.getDate();//填充今天的位置
        this.calendar_dom_tree.day_span_array[position - 1].parentNode.setAttribute("data-date",this.today.toLocaleDateString());//绑定日期
        this.calendar_dom_tree.day_span_array[position - 1].parentNode.className+=" active";

        while (position >1) {
            iterator.setDate(iterator.getDate() - 1);//迭代器向前走一天
            position--;//位置前移
            this.calendar_dom_tree.day_span_array[position - 1].innerHTML = iterator.getDate();//填入值
            this.calendar_dom_tree.day_span_array[position - 1].parentNode.setAttribute("data-date",iterator.toLocaleDateString());//绑定日期

        }
        iterator = new Date();
        this.today = new Date();
        //iterator = this.today;
        position = this.the_week_day_sequence_of_today;
        while (position < 7) {
            iterator.setDate(iterator.getDate() + 1);//迭代器向后走一天
            position++;//位置后移
            this.calendar_dom_tree.day_span_array[position - 1].innerHTML = iterator.getDate();//填入值
            this.calendar_dom_tree.day_span_array[position - 1].parentNode.setAttribute("data-date",iterator.toLocaleDateString());//绑定日期
        }
    };



    this.set_day_todo_bar_length = function () {
        for (var i = 0; i < this.calendar_dom_tree.day_todo_bar.length; i++) {
            //TODO
            //补全ajax
            /*先放一段随机长度~*/
            var width = Math.floor(56 * Math.random()).toString() + "px";
            //this.calendar_dom_tree.day_todo_bar[i].style.cssText = "width:" + width + ";"
            this.calendar_dom_tree.day_todo_bar[i]._css("width",width);
        }

    };

    var calendar_control = this;//供自调用函数使用

    this.init = (function () {
        calendar_control.set_day_todo_bar_length();
        calendar_control.fill_calendar_day_block();
    })();

    this.add_single_class_to_day_block = (function(){
        for(var i=0; i<calendar_control.calendar_dom_tree.day_span_array.length; i++) {
            if(calendar_control.calendar_dom_tree.day_span_array[i].innerHTML.length<2){
                calendar_control.calendar_dom_tree.day_span_array[i].parentNode.className+=" single-number";
            }
        }

    })();
    return this;
}

