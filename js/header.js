function moblie_header(){
    var btn = document.getElementById("moblie-header-button");
    var ul = document.getElementById("mobile-header-ul");
    var close_btn = document.getElementById("mobile-header-ul").getElementsByClassName("close-menu-button")[0];
    btn.addEventListener("click", function(e){
        ul.setAttribute("show", "true");
    });
    close_btn.addEventListener("click", function(e){
        ul.setAttribute("show", "false");
    });
}

function headerload(){
    var self = this;
    this.configfile = "/webside.json";
    this.pc_header_ul_element = document.getElementById("pc-header-ul");
    this.mobile_header_ul_element = document.getElementById("mobile-header-ul");

    this._addMobile = function(title, url){
        var mobile = this.mobile_header_ul_element;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = url;
        a.innerHTML = title;
        li.appendChild(a);
        mobile.insertBefore(li, mobile.childNodes[2]);
    }

    this.addMobile = function(data){
        var i;
        for (i = data.content.length; i > 0; i--){
            this._addMobile(data.content[i - 1].title, data.content[i - 1].url);
        }
    }

    this._addPC = function(title, url){
        var pc = this.pc_header_ul_element;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = url;
        a.innerHTML = title;
        li.appendChild(a);
        pc.appendChild(li);
    }

    this.addPC = function(data){
        var i;
        for (i = 0; i < data.content.length; i++){
            this._addPC(data.content[i].title, data.content[i].url);
        }
    }

    this.changeLogo = function(url){
        var logo = document.getElementById("header-logo");
        logo.src = url;
    }

    this.changeText = function(text){
        var h1 = document.getElementById("header-text");
        h1.innerHTML = text;
    }

    this.changeLogoLink = function(url){
        var link = document.getElementById("logo-link");
        link.href = url;
    }

    this.requestsConfig = function(succ, err){
        $.ajax({
            url: this.configfile,
            type: "GET",
            dataType: "json",
            success: succ,
            error: err
        });
    }

    this.removeAllNodes = function(element, _i = 0){
        var i;
        var childs = element.childNodes;
        for(i = childs.length - 1; i >= 0; i--) { 
            element.removeChild(childs[i - _i]);
        }
    }
}

var headerld = new headerload();
headerld.requestsConfig(function(data){
    headerld.addPC(data.header);
    headerld.addMobile(data.header);
    if (data.header.logo.logo != undefined || data.header.logo.logo != null){
        headerld.changeLogo(data.header.logo.logo);
    }
    
    if (data.header.logo.text != undefined || data.header.logo.text != null){
        headerld.changeText(data.header.logo.text);
    }

    if (data.header.logo.url != undefined || data.header.logo.url != null){
        headerld.changeLogoLink(data.header.logo.url);
    }
    moblie_header();
}, function(){
    console.error("HeaderLoadError");
});