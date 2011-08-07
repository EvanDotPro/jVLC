(function($){  
    $.fn.vlc = function(options) {  
        var defaults = {  
            width:   300,
            height:  300,
            className:   'vlc-embed',
            src:     '',
            eventResolution: 100,
            onEmbedComplete: false,
            onMediaPlayerPositionChanged: false
        };  
        var options = $.extend(defaults, options); 
        var eventManager = function(vlc){
            var self = this;
            self.vlc = vlc.get(0);
            console.log(self.vlc);
            self.playTime = 0;
            self.run = function() {
                if (typeof self.vlc.input != 'undefined' && self.vlc.input.time != self.playTime) {
                    self.playTime = self.vlc.input.time;
                    if (options.onMediaPlayerPositionChanged) {
                        options.onMediaPlayerPositionChanged(self.vlc);
                    }
                }
                setTimeout(function() { self.run() }, options.eventResolution);
            };
        };
        return this.each(function(i) {  
            var id = 'vlc-'+i;
            var html = '<embed type="application/x-vlc-plugin" pluginspage="http://www.videolan.org" version="VideoLAN.VLCPlugin.2" target="'+options.src+'" width="'+options.width+'" height="'+options.height+'" class="'+options.className+'" id="'+id+'"></embed>';
            $(this).html(html);
            vlc = $('#'+id);
            if (options.onEmbedComplete) {
                options.onEmbedComplete(vlc);
            }
            em = new eventManager(vlc);
            em.run();
        });  
    };  
})(jQuery); 

