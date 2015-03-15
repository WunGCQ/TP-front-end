/**
 * Created by WunG on 2015/2/3.
 */
/*备忘录控件*/
function schedule_board() {
    window.calendar_control = new calendar();
    this.today_lunar_date_string = get_CN_date();
    this.schedule_borad_box = document.getElementById("schedule-board-box");
    this.schedule_board_title_right_box = document.getElementById("schedule-board-title-right-box");

    //填充标题的日期
    this.fill_schedule_board_title_date = function(date) {
        this.schedule_board_title_right_box.getElementsByTagName("td")[0].innerHTML = date.toLocaleDateString();
    };

    //填充 星期几
    this.fill_schedule_board_title_week_day = function(date) {
        this.schedule_board_title_right_box.getElementsByTagName("td")[1].innerHTML = calendar_control.week_in_Chinese[date.getDay().toString()];
    };

    //填充 农历日期
    this.fill_schedule_board_title_CN_date = function(date) {
        this.schedule_board_title_right_box.getElementsByTagName("td")[2].innerHTML = get_CN_date(date);
    };

    //绑定 日期数据
    this.stick_date_attr_on_box = function(date) {
        this.schedule_borad_box.setAttribute("data-date",date.toLocaleDateString());
    };

    var schedule_board = this;
    //填充title部分
    this.fill_schedule_board_title = function(date) {
        schedule_board.fill_schedule_board_title_date(date);
        schedule_board.fill_schedule_board_title_week_day(date);
        schedule_board.fill_schedule_board_title_CN_date(date);
        schedule_board.stick_date_attr_on_box(date);
        //TODO
    };

    this.add_schdule_to_list = function() {

    };
    this.show_create_control = function() {

    };
    this.scroll_list = function() {

    };


    this.init = (function(){
        schedule_board.fill_schedule_board_title(calendar_control.today);
    })();

    return this;
}