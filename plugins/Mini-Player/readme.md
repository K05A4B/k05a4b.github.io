# Mini-Player
---

> 使用
```javascript
plugin.use("Mini-Player",function(){
    /**
     * player.init(options = null, autoplay = false);
     * @param options 列表: [{title:"歌曲名", id:"网易云音乐ID"}]
     * @param autoplay 自动播放 (true:是, false:否)
    */
    player.init([
        {title:"歌曲名", id:"网易云音乐ID"},
        {title:"歌曲名2", id:"网易云音乐ID2"}
    ],true);
}, function(e){
    console.log("Error: " + e);
});
```