(function ($) {
    'use strict';
    $.fn.autocomplete = function (options) {
        var opts = $.extend({
            url: undefined,
            callback: undefined,
            searchfield: $(this)
        }, $.fn.autocomplete.defaults, options);

        var typingTimer;

        if (opts.url === undefined) {
            console.log('You did not provide a resource to search');
            return null;
        }
        if (opts.callback === undefined) {
            console.log('You have not specified a callback function');
            return null;
        }

        $(this).on('keyup', function () {
            if (typingTimer) {
                clearTimeout(typingTimer);
            }
            typingTimer = setTimeout(function () {
                $.ajax({
                    url: opts.url,
                    data: {
                        "value": opts.searchfield.val()
                    },
                    method: 'get'
                }).success(function (data) {
                    opts.callback(data);
                });
            }, opts.delay);
        });

        return this;
    };

    $.fn.autocomplete.defaults = {
        event: 'keyup',
        delay: 400
    };

}(jQuery));
