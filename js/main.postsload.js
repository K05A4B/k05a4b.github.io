/* HTML code
    <li>
        <div class="main-article-item">
            <h3 class="main-article-title"><a href="">Title</a></h3>
            <div class="main-article-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque adipisci fugit suscipit quae impedit et dolorem quidem totam ut sit ullam, nemo quis, harum soluta quibusdam ducimus incidunt sapiente?</div>
            <div class="main-artivle-footer">
                <div class="main-artivle-meta-info">
                    <span>
                        <i class="fa fa-history"></i>
                        &nbsp;
                        2021/10/2 - 18:44
                    </span>
                </div>
                <a href="">Read More&nbsp;<i class="fa fa-angle-right"></i></a>
            </div>
        </div>
    </li>
*/
function postsload(jsonf, count = 10){
    var self = this;

    this.init = function(jsonf, count){
        self.jsonf = jsonf;
        self.count = count;
        self.get();
    }

    /**
     * 获取所有帖子
     */
    this.get = function(){
        $.ajax({
            url: this.jsonf,
            type: "GET",
            dataType: "json",
            success: function(data){
                self.data = data;
                var top = data.top;
                var _default = data.default;
                var i;
                for(i = 0; i < top.length; i++){
                    self.write(top[i], true)
                }
                for(i = 0; i < _default.length; i++){
                    self.write(_default[i]);
                }
            },error:function(e){
                console.log(e);
                self.write({"title": "错误!", "describe": e.statusText, "id":"error", "date":[2021,10,3,15,50]});
            }
        });
    }

    /**
     * 写入网页
     * @param options 传入一个字典{title:"Title",describe:"describe",id:"id"}
     * @param top 是否顶置[true:是|false:否]
     */
    this.write = function(options, top = false){
        var mcl = document.getElementById("main-content-list");
        var root_li = document.createElement("li");

        var article_item = document.createElement("div");
        article_item.className = "main-article-item";

        var article_title = document.createElement("h3");
        article_title.className = "main-article-title";
        article_title.innerHTML = "<a href=" + "./read.html#id=" + options.id + "&title=" + encodeURI(options.title) + ">" + options.title + "</a>";


        var article_body = document.createElement("div");
        article_body.innerHTML = options.describe;
        article_body.className = "main-article-body";

        var article_footer = document.createElement("div");
        article_footer.className = "main-artivle-footer";

        var article_meta_info = document.createElement("div");
        article_meta_info.className = "main-artivle-meta-info";

        var span_footer_date = document.createElement("span");
        span_footer_date.innerHTML = '<i class="fa fa-history"></i>&nbsp;' + options.date[0] + '/' + options.date[1] + '/' + options.date[2] + ' - ' + options.date[3] + ':' + options.date[4]
        article_meta_info.appendChild(span_footer_date);
        if (top){
            var span_footer_top = document.createElement("span");
            span_footer_top.innerHTML = '<i class="fa fa-paper-plane-o"></i>&nbsp;顶置';
            article_meta_info.appendChild(span_footer_top);
        }

        var read_more = document.createElement("a");
        read_more.href = "./read.html#id=" + options.id + "&title=" + encodeURI(options.title);
        read_more.innerHTML = 'Read More&nbsp;<i class="fa fa-angle-right"></i>';

        article_footer.appendChild(article_meta_info);
        article_footer.appendChild(read_more);

        article_item.appendChild(article_title);
        article_item.appendChild(article_body);
        article_item.appendChild(article_footer);
        root_li.appendChild(article_item);
        mcl.appendChild(root_li);

    }
    this.init(jsonf, count);
}