/**
 * Created by MoonDropX on 2015/4/16.
 */

function modal() {
    return this;
}

//news_modal

news_modal = function(){
    return this;
};

news_modal.prototype = new modal();

news_modal.prototype.show = function(){
    $('.modal-news').fadeIn();
};

news_modal.prototype.hide = function(){
    $('.modal-news').fadeOut();
};

//todo_modal

todo_modal = function(){
    return this;
};

todo_modal.prototype.show = function(){
    $('.modal-todo').fadeIn();
};

todo_modal.prototype.hide = function(){
    $('.modal-todo').fadeOut();
};

todo_modal.prototype.toggle = function(that){
    that = $(that).parent().children('.todo-details');
    if(that.css('display') == 'none')
        that.fadeIn('fast');
    else
        that.fadeOut('fast');
};

todo_modal.prototype.show_add = function(){
    $('.todo-add-box').fadeIn();
    $('.elem').css('opacity','0.7');
};

window.modals = new modal();
window.news_modal_entity = new news_modal();
window.todo_modal_entity = new todo_modal();

$('#container').delegate('.card','click',function() {
    if($(this).hasClass('news-card')){
        window.news_modal_entity.show();
    }
    else if($(this).hasClass('todo-card')){
        window.todo_modal_entity.show();
    }
});