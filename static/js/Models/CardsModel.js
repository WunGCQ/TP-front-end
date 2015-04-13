window.CardsModel = function(){
    return this;
};

CardsModel.prototype.getCards = function(fillHtml, errorAlert){
    $.ajax({
        type: 'get',
        url: getBase()+'/users/cards',
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("User-Agent",navigator.userAgent); 
            xhr.setRequestHeader("token", localStorage.token);
        },
        dataType: 'json',
        success: function(data,xhr){
            fillHtml(CardsModel.prototype.classify(data.cards));
        },
        error: function(xhr,m,t){
            var result = eval("("+xhr.responseText+")");
            errorAlert(result.error.message);
        }
    });
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
