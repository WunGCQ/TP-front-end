/**
 * Created by wungcq on 15/4/5.
 */
window.Model = function(){
    return this;
};
Model.prototype.get = function(){
    var token = undefined;
    $.ajax({

    });

    var form = document.forms[0];
    form = document.getElementsByTagName("form")[0];
    form = document.querySelector("#container .box>form");
    var f= new FormData();
    f.append("name","value");
    //获取数据
    function getData(form,isUsingFormData){

        //自己写比较累，但是checkData不能依赖于不可读的FormData
        if(!isUsingFormData){
            var form_data = [];
            for(var i in form){
                form_data[i] = form[i].value;
            }

            return form_data;
        }else {
            var f = new FormData(form);
            return f;
        }

    }
    //检查数据
    function checkData () {
        var form  = this.formObj;
        var data = getData(form,false);
        var isLegal = true;
        if(data["username"]){
            var t = new RegExp(/^\w[0-9a-zA-Z](6,16)/);
            if(!data["username"].test(t)) {
               isLegal = false;
            }
            alert("username fault");
        }
        //.....
        return isLegal;
    }

    //DOM&&FORM取数据
    var input = document.getElementsByTagName("input");
    //TODO getElementsBy* 得到的返回值是以nodelist 或者 HTMLcoleestion的形式存在的，但是以使用Array方法操作
    var t = Array.prototype.unshift.call(input);
    t.setAttribute("data-user_id","233");
    $(t).attr("data-user");//"233"
    $(t).attr("data-user","2333333").attr("data-name","233");
    $(t).attr("name",$(t).attr("name") + new Date().getTime());


    function sendData(){
        var xhr = new XMLHttpRequest();
        xhr.open('get/post/put/delete','/api/',true);
        if(checkData()) {
            var data = getData(this.formObj,true);
        } else {
            return;
        }
        token  = localStorage.getItem("token")||"";
        xhr.setRequestHeader("token",token);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200) {
                alert("yoooo");
            }
            else if(xhr.status == 413) {
                console.error("the file is too large!");
            }else if(xhr.status == 404){
                alert("233");
            }
        };
        xhr.send(data);
    }
};
