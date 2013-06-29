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

            var $checkboxes = $(':checkbox', $this);
            $checkboxes
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

            if(o.labelSelect) {
                $checkboxes
                    .each(function() {
                            var $obj = $(this);
                            var $parent = $obj.parent();
                            if(!$parent.is('label')) {
                                $parent = $('label[for="' + $obj.attr('name') + '"]');
                                $parent.on('click', function() { $obj.trigger('click'); });
                            }
                            else {
                                // Mandatory if the label is the parent of the checkbox because it will propagate
                                //    and cause an infinite event loop
                                $obj.on('mousedown', function(event) { event.stopPropagation(); });
                                $obj.on('mouseover', function(event) { event.stopPropagation(); });
                            }

                            $parent.on('mousedown', function(event) { event.stopPropagation(); $obj.trigger('mousedown'); });
                            $parent.on('mouseover', function(event) { event.stopPropagation(); $obj.trigger('mouseover'); });
                        });
            }

            $('html').mouseup(function () {
                enabled = false;
            });
        });
    };
    
    $.fn.dragcheck.defaults = {
        container: null,
        labelSelect: false,
        onSelect: function (obj, state) { }
    };
})(jQuery);
