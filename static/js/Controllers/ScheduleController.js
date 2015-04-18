function ScheduleController(){
    var scheduler_controller = this;
    this.fillHtml = function(data, date){
        var schedule_tpl = $('#schedule_tpl').html();
        $('#schedule-board-list-box').innerHTML = juicer(schedule_tpl,data);
        calendar_control.set_day_todo_bar_length(data.week_count);
        schedule_board_instance.fill_schedule_board_title(date);   
    };
    this.errorAlert = function(s) {
        alert(s);
    };
    this.change = function(element) {
        $('.day-box.active').removeClass('active');
        $(element).addClass('active');
        schedule_board_instance.fill_schedule_board_title(new Date($(element).attr("data-date")));
    };
}