(function ($) {
    $.fn.dragcheck = function (options) {
        
        var opts = $.extend({}, $.fn.dragcheck.defaults, options);

        return this.each(function () {
            var $this = $(this);

            var enabled = false;
            var state = false;
            var startIndex = null;
            
            // meta data plugin support
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

            $(':checkbox', $this)
                .mousedown(function () {
                    var $obj = $(this);
                    enabled = true;
                    state = !$obj.is(':checked');
                    startIndex = (o.container ? $obj.parents(o.container).index() : $obj.index());

                    $obj.one('mouseout', function () {
                        if (enabled) {
                            o.onSelect($(this), state);
                        }
                    });
                })
                .mouseover(function () {
                    if (enabled) {
                        var $obj = $(this);
                        var sourceRow = (o.container ? $obj.parents(o.container) : $obj);
                        var targetRow = (o.container ? $obj.parents(o.container).parent().children(o.container).eq(startIndex) : $obj.parent().children(':checkbox').eq(startIndex));

                        var endIndex = sourceRow.index();
                        if (endIndex > startIndex) {
                            var prevelements = sourceRow.prevUntil(targetRow, o.container || ':checkbox');
                            o.onSelect((o.container ? targetRow.find(':checkbox') : targetRow), state);
                            o.onSelect((o.container ? sourceRow.find(':checkbox') : sourceRow), state);
                            $.each((o.container ? prevelements.find(':checkbox') : prevelements), function() {
                                o.onSelect($(this), state);
                            });
                        }
                        else if (endIndex < startIndex) {
                            var nextelements = sourceRow.nextUntil(targetRow, o.container || ':checkbox');
                            o.onSelect((o.container ? targetRow.find(':checkbox') : targetRow), state);
                            o.onSelect((o.container ? sourceRow.find(':checkbox') : sourceRow), state);
                            $.each((o.container ? nextelements.find(':checkbox') : nextelements), function () {
                                o.onSelect($(this), state);
                            });
                        }
                    }
                });

            $('html').mouseup(function () {
                enabled = false;
            });
        });
    };
    
    $.fn.dragcheck.defaults = {
        container: null,
        onSelect: function (obj, state) { }
    };
})(jQuery);
