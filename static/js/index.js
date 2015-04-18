$(function(){
    var authorization_i = new AuthorizationModel();
    var anthorization_controller = new AuthorizationController();
    if(authorization_i.tokenTest(anthorization_controller.errorAlert)) {
        var schedule_i = new ScheduleModel();
        var cards_i = new CardsModel();
        var schedule_controller = new ScheduleController();
        var cards_controller = new CardsController();
        cards_i.getCards(cards_controller.fillHtml, cards_controller.errorAlert);
        schedule_i.get_schedule(new Date(), schedule_controller.fillHtml, schedule_controller.errorAlert);
        $('.day-box').click(function(){
            schedule_i.get_schedule(new Date($(this).attr("data-date")), schedule_controller.fillHtml, schedule_controller.errorAlert);
            schedule_controller.change(this);
        });
    }
});