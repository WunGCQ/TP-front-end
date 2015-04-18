window.ScheduleModel = function(){
    window.schedule_board_instance = new schedule_board();
    return this;
}

ScheduleModel.prototype.get_schedule = function(date, fillHtml, errorAlert){
    var day = date.toLocaleDateString().split("/").join("-");
    $.ajax({
        type: 'get',
        url: getBase()+'/schedule?date='+day,
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("User-Agent",navigator.userAgent); 
            xhr.setRequestHeader("token", localStorage.token);
        },
        dataType: 'json',
        success: function(data,xhr){
            fillHtml(data, date);
        },
        error: function(xhr,m,t){
            console.log(xhr);
            var result = eval("("+xhr.responseText+")");
            errorAlert(result.error.message);
        }
    });
};