/**
 * Created by wungcq on 15/5/9.
 */
(function (Export) {
	var addArticle = function () {
		this.init();
		this.postUrl = '';
		this.template = '<div class="modal"><div class="modal-wrapper"><div class="modal-bg"></div><div class="modal-box"><div class="editor-box"><iframe style="width:100%;height:100%;overflow-x:hidden;overflow-y:auto;text-align:center;background-color:transparent;border:none" src="../ueditor1_4_3-src/edi.html" id="long-article-editor"></iframe></div><div class="editor-tag-box"><span class="txt">标签:</span> <span class="editor-tags new-tag" contenteditable="true" id="editor-new-tag">添加一个标签</span></div><div class="editor-submit-box"><div class="editor-article-visibility-box"><label for="article-visibility-all"><input type="radio" id="article-visibility-all" name="visibility" value="1"> 所有人可见</label><label for="article-visibility-friends"><input type="radio" id="article-visibility-friends" name="visibility"  checked="checked" value="0"> 仅与我互相关注的人可见</label></div><a class="editor-submit-button" id="editor-submit-button">发布</a></div></div></div></div>';
		return this;
	};

	addArticle.prototype = {
		init: function () {
			this.showBtn = $(".create-wrapper .icon.icon-wenzhang");
			this.bind();
		},
		bind: function () {
			var me = this;
			//添加监听事件，显示控件
			me.showBtn.click(function () {
				if ($(".modal").toArray().length == 0) {
					me.show.call(me);
					$(".modal").on("click", function (e) {
						if (e.target.classList.contains("modal-bg")) {
							me.removeEditor();
						}
					});
				}
			});
		},
		bindLater: function () {
			var me = this;
			me.tagWrapper = $(".editor-tag-box");
			me.submitBtn.click(function () {
				me.getData();
			});
			me.tagWrapper.on("click", function (e) {
				var _target = $(e.target);
				if (_target.hasClass("editor-tags")) {
					if (_target.hasClass("new-tag")) {
//						me.saveTag.call(me, _target);
					}else{
						me.editTag.call(me, _target);
					}
				}else if(_target.hasClass("remove-tag")) {
					me.removeTag(_target);
				}
			});
			me.tagWrapper.on("blur",function(e){
				var _target = $(e.target);
				if (_target.hasClass("editor-tags")) {
					if (_target.hasClass("new-tag")) {
						me.saveTag.call(me, _target);
					}else{
//						me.editTag.call(me, _target);
					}
				}
			});
			me.tagWrapper.on("keydown", function (e) {
				var _target = $(e.target);
				if(e.keyCode == 13){
					if (_target.hasClass("new-tag")) {
						me.saveTag.call(me,_target);
					}
				}
			});
		},
		show: function () {
			var me = this;
			$("body").append(me.template);
			$("html").css("overflow-y","hidden");
			this.submitBtn = $("#editor-submit-button");
			me.bindLater();
		},
		removeEditor: function () {
			$(".modal").remove();
			$("html").css("overflow-y","auto");
		},
		getHTML: function () {
			var me = this;
			var editorFrame = document.getElementById("long-article-editor");
			var editorWrapper = editorFrame.contentDocument.getElementById("ueditor_0");
			var editorContent = editorWrapper.contentDocument.body.innerHTML;
//			console.log(editorContent);
			return editorContent;
		},
		editTag: function (tag) {
			var me = this;
			if (tag.hasClass("new-tag")) {
			} else {
				var text = tag.text();
				tag.html(text);
				tag.addClass("new-tag").attr("contentEditable", "true");
				tag.focus();
			}
		},
		addTag: function (tag) {
			var me = this;
			me.tagWrapper.append(' <span class="editor-tags new-tag" contenteditable="true" id="editor-new-tag">添加一个标签</span>');

		},
		saveTag: function (tag) {
			var me = this;
			var html = tag.html();
			html.replace(/\n/g,"").replace(/\r/g,"");
			tag.html('<a class="remove-tag"></a>' + html);
			tag.removeAttr("contentEditable");
			tag.removeClass("new-tag");
			tag.blur();
			//检查是否还有可以供输入的标签，如果没有的话添加一个
			var newTagsCount = $(".new-tag").length;
			if(newTagsCount == 0){
				me.addTag();
			}
		},
		removeTag: function(tag) {
			var me = this;
			var tag = tag.parent();
			tag.remove();
			var newTagsCount = $(".new-tag").length;
			if(newTagsCount == 0){
				me.addTag();
			}

		},
		getTags: function() {
			var tags = $(".editor-tags").toArray();
			var len = tags.length;
			var tagsArr = [];
			for(var i = 0; i< len; i++) {
				var tag = $(tags[i]);
				if(!tag.hasClass("new-tag")) {
					var txt = tag.text();
					tagsArr.push(txt);
				}

			}
			return tagsArr;
		},
		getData: function() {
			var me = this;
			var content = me.getHTML();
			var tags = me.getTags();
			var visibility = $('input[name="visibility"]:checked').val();

			var res = {
				"content": content,
				"tags": tags,
				"visibility": visibility
			};
			console.log(res);

			return res;
		},


		publish: function(){
			var me = this;
			var url = me.postUrl;
			var data = me.getData();
			$.post(url,data, function(){
				//TODO 添加相关操作
				me.removeEditor();
			});
		}

	};

	var a = new addArticle();
	Export = a;
	return Export;
})();
