function CardsController() {
    var cards_controller = this;
    this.errorAlert = function(s) {
        alert(s);
    };
    this.fillHtml = function(data) {
        var function_tpl = $('#function_tpl').html();
        var article_picture_tpl = $('#article_picture_tpl').html();
        var activity_tpl = $('#activity_tpl').html();
        var inform_tpl = $('#inform_tpl').html();
        var article_tpl = $('#article_tpl').html();
        var todo_tpl = $('#todo_tpl').html();
        var row_1 = $('#row-1');
        var row_2 = $('#row-2');
        for (var i = data.todo.length - 1; i >= 0; i--) {
            cards_controller.fillRow(data.todo[i], i, row_1, row_2, function_tpl+todo_tpl, 0);
        };
        for (var i = data.inform.length - 1; i >= 0; i--) {
            cards_controller.fillRow(data.inform[i], i, row_1, row_2, function_tpl+inform_tpl, 1);
        };
        for (var i = data.activity.length - 1; i >= 0; i--) {
            cards_controller.fillRow(data.activity[i], i, row_1, row_2, function_tpl+activity_tpl, 1); 
        };
        for (var i = data.article_picture.length - 1; i >= 0; i--) {
            cards_controller.fillRow(data.article_picture[i], i, row_1, row_2, function_tpl+article_picture_tpl, 0);
        };
    };

    //type==1:  i为偶数在row2填充，==1反之。
    this.fillRow = function(data, i, row_1, row_2, add_tpl, type) {
        if(type==0&&i%2==0)
            row_1.append(juicer( add_tpl, data ));
        else if(type==0&&i%2==1)
            row_2.append(juicer( add_tpl, data ));
        else if(type==1&&i%2==0)
            row_2.append(juicer(add_tpl, data));
        else row_1.append(juicer(add_tpl, data));
    };
}