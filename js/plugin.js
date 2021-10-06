function _Plugin(){
    var self = this;
    var package = [];
    var ImportCallBack = [];
    var pack = package;

    this.ConfigFileName = "config.json";
    this.PluginDirPath = "/plugins/"
    this.api = new _Api();

    function _Api(){
        /**
         * 获取所有包的名称
         * @return {Array}
         */
        this.getAllPlugin = function(){
            return package;
        }

        /**
         * 当有包导入时触发
         * @param {function}callback 回调函数
         */
        this.packageIm = function(callback){
            if (typeof callback != "function"){
                return false;
            }
            ImportCallBack.push(callback);
            return true;
        }

        /**
         * 
         * @param {String} package 包名
         * @returns {String | null}
         */
        this.getPackageDir = function(package){
            var i;
            for (i = 0; i < pack.length; i++){
                if (package == pack[i]){
                    return self.PluginDirPath + package + '/';
                }
            }
            return null;
        }
    }

    function importCallBack(PackageName){
        var i;
        for (i = 0; i < ImportCallBack.length; i++){
            ImportCallBack[i](PackageName);
        }
    }

    this.init = function(){
    }

    this.use = function(package, success = function(){console.log("Success")}, error = console.error){
        var i;
        for (i = 0; i < pack.length; i++){
            if (package == pack[i]){
                console.warn("Plugin: Package already exists!");
                error("Plugin: Package already exists!");
                return false;
            }
        }

        importCallBack(package);

        pack.push(package);
        var style_item = $("#plugins-style");
        var script_item = $("#plugins-script");
        this.getConfig(package, function(data){
            var cfg_parse = self.configParse(data, package);
            var path = self.PluginDirPath + package + '/'
            var append = cfg_parse["append"];
            var selector = cfg_parse["selector"];
            var styles = cfg_parse["styles"]
            var scripts = cfg_parse["scripts"];
            var file = cfg_parse["file"];
            self.getFileContent(path + file, function(data){
                var elem = $(selector);
                var i;
                if (append){
                    elem.append(data);
                }else{
                    elem.prepend(data);
                }

                for (i = 0; i < styles.length; i++){
                    style_item.append(styles[i]);
                }

                for (i = 0; i < scripts.length; i++){
                    script_item.append(scripts[i]);
                }

                success();
            }, error);
        }, function(e){
            if (e.status == 404){
                pack.pop();
                console.error("PluginPackageError: Package does not exist or is invalid");
            }
            error(e);
        });
    }

    this.configParse = function(data, package){
        var pligindir = this.PluginDirPath;
        var packname = package;
        var path = pligindir + packname + '/'
        var styles = data.styles;
        var scripts = data.scripts;
        var stylelist = [];
        var scriptlist = [];
        var i;
        var rtdata = {};

        rtdata["selector"] = data.htmlcode[0];
        rtdata["file"] = data.htmlcode[1];
        if (data.htmlcode[2] == 0){
            rtdata["append"] = true;
        }else{
            rtdata["append"] = false;
        }

        for (i = 0; i < styles.length; i++){
            stylelist.push('<link rel="stylesheet" href="' + path + styles[i] + '"></link>');
        }

        for (i = 0; i < scripts.length; i++){
            scriptlist.push('<script src="' + path + scripts[i] + '"></script>');
        }
       rtdata["scripts"] = scriptlist;
       rtdata["styles"] = stylelist;
       return rtdata;
    }

    this.getConfig = function(PackageName, success, error){
        var configfile = this.ConfigFileName;
        var pligindir = this.PluginDirPath;
        var packname = PackageName;
        var path = pligindir + packname + '/' + configfile;
        $.ajax({
            url: path,
            type: "GET",
            dataType: "json",
            async: true,
            success: success,
            error: error
        });
    }

    this.getFileContent = function(file, success, error){
        $.ajax({
            url: file,
            type: "GET",
            async: true,
            success: success,
            error: error
        })
    }

    this.init();
}

var plugin = new _Plugin();