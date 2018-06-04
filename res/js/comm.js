

$.fn.extend({
    load_res    : function(files) {
        for (var i in files) {
            var name    = files[i].replace(/^\s|\s$/g, "");
            var att     = name.split('.');
            var ext     = att[att.length - 1].toLowerCase();
            var isCSS   = ext == "css";
            var tag     = isCSS ? "link" : "script";
            var attr    = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
            var link    = (isCSS ? "href" : "src") + "='" + name + "'";

            if ($(tag + "[" + link + "]").length == 0)
                this.append($("<" + tag + attr + link + "></" + tag + ">"));
        } 
    } 
});

c = {};

c.load_parts = function(callback) {
    $('body').load_res([
        'res/bootstrap-4/css/bootstrap.min.css',
        'res/bootstrap-4/js/bootstrap.min.js'
    ]);
    $('body').load('parts/part-head.html');
    $('body').load('parts/part-foot.html', callback);
};



