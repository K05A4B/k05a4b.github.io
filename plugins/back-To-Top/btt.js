function backtotop(selector){
    var backtotop = $(selector);
    var timeout;
    var showbttheight = window.screenY + 10;
    window.onscroll = function(){
        if (document.body.scrollTop > showbttheight || document.documentElement.scrollTop > showbttheight){
            clearTimeout(timeout);
            backtotop.removeClass("backtotop-fade-out");
            backtotop.addClass("backtotop-fade-in");
            backtotop[0].style.display = "block";
            backtotop.removeClass("backtotop-fade-in");
        }else{
            backtotop.removeClass("backtotop-fade-in");
            backtotop.addClass("backtotop-fade-out");
            timeout = setTimeout(function(){backtotop[0].style.display = "none";}, 900);
        }
    }
    backtotop.on("click", function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}