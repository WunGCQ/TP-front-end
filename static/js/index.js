$(function(){
    authorization_i = new AuthorizationModel();
    if(authorization_i.tokenTest()) {
        var schedule_i = new ScheduleModel();
        var cards_i = new CardsModel();
        cards_i.getCards();
        schedule_i.get_schedule(new Date());
        $('.day-box').click(function(){
            schedule_i.get_schedule(new Date($(this).attr("data-date")));
            schedule_i.change(this);
        });
    }
});