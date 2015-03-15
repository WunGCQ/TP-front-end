/**
 * Created by wungcq on 15/3/10.
 */
function month_calendar() {
    var that = this;
    return this;
}

month_calendar.prototype._init = function() {
    this.set_calendar();
};

month_calendar.prototype.wrapper = document.getElementsByClassName("month-calendar")[0];

month_calendar.prototype.month_of_current_calendar_view = (new Date().getFullYear())+"/"+(new Date().getMonth()+1);

month_calendar.prototype.get_month_on_the_current_calendar_view = function(){
    if(this.month_of_current_calendar_view) {
        return this.month_of_current_calendar_view;
    }
    else{
        this.month_of_current_calendar_view = this.wrapper.getAttribute("data-year-month");
        return this.month_of_current_calendar_view;
    }
};

month_calendar.prototype.change_month = function(direction){

    var year_slash_month = this.get_month_on_the_current_calendar_view().split("/");

    var m = new Date(year_slash_month[0],year_slash_month[1]-1,1);
    //向后翻
    if(direction>0) {

        if(m.getMonth()==11){
            this.month_of_current_calendar_view = (m.getFullYear()+1)+"/1";
        }else{
            this.month_of_current_calendar_view = (m.getFullYear()+"/"+(m.getMonth()+2));
        }
    }
    //向前翻
    else {
        if(m.getMonth()==0){
            this.month_of_current_calendar_view = (m.getFullYear()-1)+"/12";
        }else{
            this.month_of_current_calendar_view = (m.getFullYear())+"/"+(m.getMonth());
        }
    }
    this.set_calendar();
    //return this.month_of_current_calendar_view;

};


month_calendar.prototype.get_the_first_week_of_the_month_sequence = function(){
    var year_slash_month = this.month_of_current_calendar_view.split("/");
    var first_day_of_the_month = new Date(year_slash_month[0],year_slash_month[1]-1,1);
    var month = first_day_of_the_month.getMonth();
    var the_first_week_sequence_of_the_month = -1;
    var iterator = first_day_of_the_month;
    var first_day_of_the_year = new Date(first_day_of_the_month.getFullYear(),0,1);
    var monday_of_the_first_week_of_the_year = {};
    var t = first_day_of_the_year.getDay();
    if(t==1) {
        monday_of_the_first_week_of_the_year = first_day_of_the_year;
    }
    else if(t == 0){ //周日
        monday_of_the_first_week_of_the_year = first_day_of_the_year.setDate(first_day_of_the_year.getDate()+1);
    }
    else{
        monday_of_the_first_week_of_the_year = first_day_of_the_year.setDate(first_day_of_the_year.getDate()+(8-t));
    }
    var week_sequence = Math.floor((first_day_of_the_month - monday_of_the_first_week_of_the_year)/(1000*3600*24*7))+1;
    return week_sequence;
};


month_calendar.prototype.set_calendar = function() {
    var year_slash_month = this.month_of_current_calendar_view.split("/");
    var first_day_of_the_month = new Date(year_slash_month[0],year_slash_month[1]-1,1);
    var month = first_day_of_the_month.getMonth()+1;
    var iterator = first_day_of_the_month;
    var first_week_of_the_month = this.get_the_first_week_of_the_month_sequence();
    var week_number = first_week_of_the_month - 1;
    var str = [ '<tr>',
                    '<td class="week-number">', '<span></span>', '</td>',
                    '<td>', '<span></span>', '</td>',
                    '<td>', '<span></span>', '</td>',
                    '<td>', '<span></span>', '</td>',
                    '<td>', '<span></span>', '</td>',
                    '<td>', '<span></span>', '</td>',
                    '<td>', '<span></span>', '</td>',
                    '<td>', '<span></span>', '</td>',
                '</tr>'];
            // 填充位3r+2
    var fragment_str = "";
    var today = new Date();
    while(iterator.getMonth()+1==month) {
        //还没有确定本月第一周的周数时
        var week_day = iterator.getDay()==0?7:iterator.getDay();//星期天编号改为7
        var month_date = iterator.getDate();
        if(month_date==1||week_day==1 ) {
            var temp_str = str.concat();
            week_number ++;
            temp_str[2] = '<span>'+week_number+'</span>';
        }

        if(iterator.toDateString()==today.toDateString()){

            temp_str[3*week_day + 1] = '<td  class="today">';

        }

        temp_str[3*week_day + 2] = '<span>'+month_date+'</span>';



        if(week_day==7){
            fragment_str += temp_str.join("");
        }
        var temp = iterator;
        temp.setDate(iterator.getDate()+1);
        if(temp.getDate()==1){ //说明到了月末
            if(month_date!=7){ //之前已经添加过了
                fragment_str += temp_str.join("");
            }
            break;
        }else{
            iterator = temp;
        }

    }
    this.wrapper.getElementsByClassName("month-number")[0].innerHTML = '<span>' +(month.toString())+"月" + '</span>';
    this.wrapper.getElementsByTagName("tbody")[0].innerHTML = fragment_str;
    var data_year_month = first_day_of_the_month.getFullYear()+"/"+(month);
    this.wrapper.setAttribute("data-year-month",data_year_month);
};

window.month_calendar_entity = new month_calendar();
month_calendar_entity._init();
