function imgShow(){
    var eleevent = $("#markdown-element img");
    var body = document.body;
    var show_item = document.createElement("div");
    show_item.setAttribute("show", "false");
    show_item.id = "img-show-item";
    var show_img = document.createElement("img");
    show_item.appendChild(show_img);
    body.appendChild(show_item);
    
    eleevent.click(function(e){
        show_img.src = e.target.src;
        show_item.setAttribute("show", "true");
    });

    show_item.onclick = function(){
        this.setAttribute("show", "false");
    }
}

function readPageLoad(callback){
    var self = this;
    var cback = callback;
    this.path = "/posts/";
    this.id = "markdown-element";
    
    this.load = function(){
        $("title").text(decodeURI(this.getHash("title")));
        var file = this.path + this.getHash("id") + ".md"
        this.getContent(file, function(data){
            var htmldata = marked(data);
            var markdown_element = document.getElementById(self.id)
            markdown_element.innerHTML = htmldata;
            cback();
        },function(e){

            switch (e.status) {
                case 404:
                    $("title").text("404 NotFound");
                    var htmldata = marked("# 404 Not Found\n+ 非常抱歉, 您访问的页面不存在!\n+ 可能是网站管理员配置文件配置错了~\n+ [什么是404?](https://developer.mozilla.org/zh-CN/docs/Glossary/404)");       
                    break;

                case 403:
                    $("title").text("403 Forbidden");
                    var htmldata = marked("# 403 Forbidden\n+ 拒绝访问!\n+ [什么是403?](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/403)");       
                    break;
            
                default:
                    $("title").text("请求失败");
                    var htmldata = marked("# 请求失败\n1. 可能是服务器出现问题\n2. 您的配置不正确");       
                    break;
            }
            document.getElementById(self.id).innerHTML = htmldata;
            cback();
        });
    }

    this.getHash = function(key){
        var hash = window.location.hash.replace("#", "");
        var hashkv = hash.split("&");
        var hashkvlist = {};
        var i;
        for(i = 0;i < hashkv.length;i++){
            var kv = hashkv[i].split("=");
            hashkvlist[kv[0]] = kv[1];
        }
        return hashkvlist[key];
    }

    this.getContent = function(filename, success, error){
        $.ajax({
            url: filename,
            type: "GET",
            dataType: "text",
            success: success,
            error: error
        });
    }

    window.addEventListener("hashchange", function(e){
        self.load();
    });
    this.load();
}

var load =  new readPageLoad(function(){
    prismJSLoad();
    // 动态处理a标签
    var a_link_http = $("a[href^='http://']"), a_link_https = $("a[href^='https://']");
    a_link_http.attr("target", "_blank");
    a_link_https.attr("target", "_blank");
    a_link_http.append('&nbsp;<i class="fa fa-external-link-square"></i>');
    a_link_https.append('&nbsp;<i class="fa fa-external-link"></i>');
    imgShow();
});