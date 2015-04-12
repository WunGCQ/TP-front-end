window.ScheduleModel = function(){
    window.schedule_board_instance = new schedule_board();
    return this;
}

ScheduleModel.prototype.get_schedule = function(date){
    var day = date.toLocaleDateString().split("/").join("-");
    $.ajax({
        type: 'get',
        url: getBase()+'/schedule?date='+day,
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("User-Agent",navigator.userAgent); 
            xhr.setRequestHeader("token", localStorage.token);

            console.log(xhr);
        },
        dataType: 'json',
        success: function(data,xhr){
            var schedule_tpl = $('#schedule_tpl').text();
            $('#schedule-board-list-box').innerHTML = juicer(schedule_tpl,data);
            calendar_control.set_day_todo_bar_length(data.week_count);
            schedule_board_instance.fill_schedule_board_title(date);   
        },
        error: function(xhr,m,t){
            console.log(xhr);
            var result = eval("("+xhr.responseText+")");
            ScheduleModel.prototype.errorAlert(result.error.message);
        }
    });
};
ScheduleModel.prototype.errorAlert = function(s) {
    alert(s);
};
ScheduleModel.prototype.change = function(element) {
    $('.day-box.active').removeClass('active');
    $(element).addClass('active');
    schedule_board_instance.fill_schedule_board_title(new Date($(element).attr("data-date")));
};