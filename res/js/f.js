(function() {

// f静态扩展
$.extend({
    // f启动方法
    f_boot  : function() {
        $.f_frag(); // 片段引用
    },
    f_frag  : function() {
        var div_replace = $('[f-replace]');
        var div_append  = $('[f-append]');
        var div_prepend = $('[f-prepend]');
        for (var i = 0; i < div_replace.length; i++) $(div_replace[i]).f_frag();
        for (var i = 0; i < div_append.length; i++)  $(div_append[i]).f_frag();
        for (var i = 0; i < div_prepend.length; i++) $(div_prepend[i]).f_frag();
    },
});

// f对象扩展
$.fn.extend({
    // 实施片段引用
    f_frag  : function() {
        var mode    = this.attr('f-replace') ? 'replace' : this.attr('f-append') ? 'append' : 'prepend';
        var path    = mode == 'replace' ? this.attr('f-replace') : mode == 'append' ? this.attr('f-append') : this.attr('f-prepend');
        var name    = path.replace(/^\s|\s$/g, '');
        var array   = name.split('.');
        var ext     = array[array.length - 1].toLowerCase();
        var string  = '';
        switch (ext) {
        case 'css':
            string = "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + path + "\">";
            break;
        case 'js':
            string = "<script src=\"" + path + "\"></script>";
            break;
        default:    // html
            break;
        }
        // dom operation
        switch (ext) {
        case 'css':
        case 'js':
            switch (mode) {
            case 'replace' :
                this.after($(string));
                this.detach();
                break;
            case 'append':
                this.append($(string));
                break;
            case 'prepend':
                this.prepend($(string));
                break;
            }
            break;
        default:    // html
            var div = $('<div></div>');
            var that = this;
            div.load(path, function() {
                string = div.html();
                switch (mode) {
                case 'replace' :
                    that.after($(string));
                    that.detach();
                    break;
                case 'append':
                    that.append($(string));
                    break;
                case 'prepend':
                    that.prepend($(string));
                    break;
                }
                $.f_frag(); // 片段中引入片段需再次实施
            });
            break;
        }
    },
});

})();

f = {};

