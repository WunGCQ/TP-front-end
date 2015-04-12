window.CardsModel = function(){
    return this;
};

CardsModel.prototype.getCards = function(){
    $.ajax({
        type: 'get',
        url: getBase()+'/users/cards',
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("User-Agent",navigator.userAgent); 
            xhr.setRequestHeader("token", localStorage.token);
        },
        dataType: 'json',
        success: function(data,xhr){
            CardsModel.prototype.fillHtml(CardsModel.prototype.classify(data.cards));
        },
        error: function(xhr,m,t){
            var result = eval("("+xhr.responseText+")");
            CardsModel.prototype.errorAlert(result.error.message);
        }
    });
};

CardsModel.prototype.errorAlert = function(s) {
    alert(s);
};

CardsModel.prototype.classify = function(data) {
    var typeData = {
        article_picture: [],
        activity: [],
        inform: [],
        todo: []
    };
    for (var i = data.length - 1; i >= 0; i--) {
        switch(data[i].type)
        {
            case "article-picture" :
                typeData.article_picture.push(data[i]);
                break;
            case "activity" :
                typeData.activity.push(data[i]);
                break;
            case "inform" :
                typeData.inform.push(data[i]);
                break;
            case "todo" :
                typeData.todo.push(data[i]);
                break;
        }
    };
    return typeData;
};

CardsModel.prototype.fillHtml = function(data) {
    var function_tpl = $('#function_tpl').text();
    var article_picture_tpl = $('#article_picture_tpl').text();
    var activity_tpl = $('#activity_tpl').text();
    var inform_tpl = $('#inform_tpl').text();
    var article_tpl = $('#article_tpl').text();
    var todo_tpl = $('#todo_tpl').text();
    // var ttt =  "<h1>${data.title}</h1>";
    // console.log(function_tpl+todo_tpl);
    var row_1 = $('#row-1');
    var row_2 = $('#row-2');
    // data.todo[0]={
    //     type:"todo",
    //     title:"TODO",
    //     finished: 6,
    //     todo:[{
    //         id: "sssss",
    //         title:"需求整理",
    //         time:"2015-04-06T00:00:00Z"
    //     },
    //     {
    //         id: "sssss",
    //         title:"接口设计",
    //         time:"2015-04-07T00:00:00Z"
    //     }]
    // };
    for (var i = data.todo.length - 1; i >= 0; i--) {
        CardsModel.prototype.fillRow(data.todo[i], i, row_1, row_2, function_tpl+todo_tpl, 0);
    };
    for (var i = data.inform.length - 1; i >= 0; i--) {
        CardsModel.prototype.fillRow(data.inform[i], i, row_1, row_2, function_tpl+inform_tpl, 1);
    };
    for (var i = data.activity.length - 1; i >= 0; i--) {
        CardsModel.prototype.fillRow(data.activity[i], i, row_1, row_2, function_tpl+activity_tpl, 1); 
    };
    for (var i = data.article_picture.length - 1; i >= 0; i--) {
        CardsModel.prototype.fillRow(data.article_picture[i], i, row_1, row_2, function_tpl+article_picture_tpl, 0);
    };
};
//type==1:  i为偶数在row2填充，==1反之。
CardsModel.prototype.fillRow = function(data, i, row_1, row_2, add_tpl, type) {
    console.log(data);
    if(type==0&&i%2==0)
        row_1.append(juicer( add_tpl, data ));
    else if(type==0&&i%2==1)
        row_2.append(juicer( add_tpl, data ));
    else if(type==1&&i%2==0)
        row_2.append(juicer(add_tpl, data));
    else row_1.append(juicer(add_tpl, data));
};