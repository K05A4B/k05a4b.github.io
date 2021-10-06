/**
 * @author KZ91
 * @data   2021/10/2 - 17:13
 * @description 音乐播放器挂件
 */

/* HTML code
    <div class="player-item">
        <audio src=""></audio>
        <button id="player-button" class="fa fa-music"></button>
        <div class="player-list-item" player-list-show="false">
            <div id="player-control-pane">
                <h4 class="player-music-title">null</h4>
                <div class="player-progress-item">
                    <div class="player-progress"></div>
                </div>
                <div class="control-button-item">
                    <button id="plyer-play-pause-button" class="fa"></button>
                </div>
            </div>
            <ul id="player-list"></ul>
        </div>    
    </div>
*/

var player = {
    songIndex: 0,
    title: $('#player-control-pane h4')[0],
    PlayerAudio: $(".player-item audio"),
    playerbutton: $(".player-item #player-button"),
    playpausebutton: $("#plyer-play-pause-button"),
    init: function(options = null, autoplay = false){
        var listele = $("#player-list")[0];
        var audio = $(".player-item audio")[0];
        if (options == null){
            var li = document.createElement("li");
            li.innerHTML = "无歌曲...";
            li.setAttribute("music-id", null);
            li.setAttribute("music-index", 0);
            listele.appendChild(li);
            this.listten();
            return false;
        }
        this.list = options;
        var i;
        for(i = 0;i < options.length ;i++){
            var li = document.createElement("li");
            li.innerHTML = options[i]["title"];
            li.setAttribute("music-id", options[i]["id"]);
            li.setAttribute("music-index", i);
            listele.appendChild(li);
        }

        this.title.innerHTML = this.list[this.songIndex]["title"];

        if (autoplay){
            audio.autoplay = true;
            $(".player-item #player-button").addClass("fa-spin")
            this.playpausebutton[0].innerHTML = "&#xf04c";
        }else{
            audio.autoplay = false;
            this.playpausebutton[0].innerHTML = "&#xf04b";
        }

        audio.src = "https://music.163.com/song/media/outer/url?id=" + this.list[0]["id"];
        this.listten();
    },
    listten: function(){
        var playerlistitem = $(".player-item .player-list-item");
        var progress = $("#player-control-pane .player-progress-item")
        var self = this;
        var delshowtimeout;

        this.playpausebutton.click(function(e){
            self.PlayerAudio[0].paused ? self.play(): self.pause();
        });
    
        this.playerbutton.hover(function(e){
            playerlistitem.attr("player-list-show", "true");
        },function(){
            delshowtimeout = setTimeout(function(){
                playerlistitem.attr("player-list-show", "false");
            }, 800)
        });
    
        playerlistitem.hover(function(e){
            clearTimeout(delshowtimeout);
            playerlistitem.attr("player-list-show", "true");
        }, function(){
            playerlistitem.attr("player-list-show", "false");
        });

        $("#player-list > li").click(function(e){
            self.title.innerHTML = e.target.innerHTML;
            self.PlayerAudio[0].src = "https://music.163.com/song/media/outer/url?id=" + e.target.getAttribute("music-id");
            self.songIndex = Number(e.target.getAttribute("msuci-index"));
            playerlistitem.attr("player-list-show", "false");
            self.playerbutton.addClass("fa-spin");
            self.play();
        });

        this.PlayerAudio[0].ontimeupdate = this.updateProgress;
        progress[0].onclick = this.setProgress;
        this.PlayerAudio[0].onended = function(e){
            self.next();
        };
    },
    updateProgress: function(e){
        var progress = $("#player-control-pane .player-progress-item .player-progress");
        const {
            duration,
            currentTime
        } = e.target;
        var progressPercent = (currentTime / duration) * 100;
        progress[0].style.width = (progressPercent + "%");
    },
    setProgress:function(e){
        var audio = $(".player-item audio")[0];
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    },
    next: function(){
        this.songIndex++;
        if (this.songIndex >= this.list.length){
            this.songIndex = 0;
        }
        var PlayerAudio = $(".player-item audio")[0];
        var id = this.list[this.songIndex]["id"];
        var title = this.list[this.songIndex]["title"];
        PlayerAudio.src = "https://music.163.com/song/media/outer/url?id=" + id;
        PlayerAudio.play();
        this.title.innerHTML = title;
    },
    play: function(){
        this.playpausebutton[0].innerHTML = "&#xf04c";
        this.title.innerHTML = this.list[this.songIndex]["title"];
        this.PlayerAudio[0].play();
        this.PlayerAudio[0].paused ? this.playerbutton.removeClass("fa-spin") : this.playerbutton.addClass("fa-spin");
    },
    pause: function(){
        this.playpausebutton[0].innerHTML = "&#xf04b";
        this.title.innerHTML = this.list[this.songIndex]["title"];
        this.PlayerAudio[0].pause();
        this.PlayerAudio[0].paused ? this.playerbutton.removeClass("fa-spin") : this.playerbutton.addClass("fa-spin");
    }
}
