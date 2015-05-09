/**
 * Created by wungcq on 15/5/9.
 */
(function(){
	var addArticle = function(){
			this.init();
			this.template = '<div class="modal"><div class="modal-wrapper"><div class="modal-bg"></div><div class="modal-box"><div class="editor-box"><iframe style="width:100%;height:100%;overflow-x:hidden;overflow-y:auto;text-align:center;background-color:transparent;border:none" src="../ueditor1_4_3-src/edi.html"></iframe></div><div class="editor-tag-box"><span class="txt">标签:</span> <span class="editor-tags"><a class="remove-tag"></a>标签1</span> <span class="editor-tags"><a class="remove-tag"></a>这里是标签2</span> <span class="editor-tags new-tag" contenteditable="true" id="editor-new-tag">添加一个标签</span></div><div class="editor-submit-box"><div class="editor-article-visibility-box"><label for="article-visibility-all"><input type="radio" id="article-visibility-all" name="visibility" value="1"> 所有人可见</label><label for="article-visibility-friends"><input type="radio" id="article-visibility-friends" name="visibility" value="0"> 仅与我互相关注的人可见</label></div><a class="editor-submit-button">发布</a></div></div></div></div>';
			return this;
	};

	addArticle.prototype = {
		init: function() {
			this.btn = $(".create-wrapper .icon.icon-wenzhang");
			this.bind();
		},
		bind: function() {
			var me = this;
			me.btn.click(function() {
				if($(".modal").toArray().length == 0) {
					$("body").append(me.template);
					$(".modal").on("click", function(e) {
						if(e.target.classList.contains("modal-bg")) {
							$(".modal").remove();
						}
					});
				}
			});

		},
		show: function() {

		}
	};

	var a = new addArticle();
})();
