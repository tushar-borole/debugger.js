(function () {

    var panelHtml = '<div class="console-panel-container">' +
        '<div class="console-header">' +
        '<div class="resize-handle"></div>' +
        '<ul class="left-action-button"><li><a id="clear" href="#">clear</a></li></ul>' +
        ' <ul class="console-action-btn">' +
        '<li><a id="minimize" href="#"><i class="fa fa-minus"></i></a></li>' +
        '<li><a id="close" href="#"><i class="fa fa-times"></i></a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="console-body"><ul id="log-container"></ul></div>' +
        '</div>';



    var defaults = {
        'enableKeys': true,
        'keys': {
            'open': 'alt+o',
            'clear': 'alt+c'
        }
    }


    // define a new console
    var logObject = {
        log: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'log-error');

        },
        info: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'info-error');
        },
        warn: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'warn-error');
        },
        error: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'error-error');
        }
    };

    /**
     * @description resize the console to move up and down
     * @author Tushar Borole
     */
    var resizeConsole = function () {

        (function ($) {
            $.fn.drags = function (opt) {

                opt = $.extend({
                    handle: "",
                    cursor: "n-resize"
                }, opt);

                if (opt.handle === "") {
                    var $el = this;
                } else {
                    var $el = this.find(opt.handle);
                }

                return $el.css('cursor', opt.cursor).on("mousedown", function (e) {
                     if (e.buttons == 1) {
                    if (opt.handle === "") {
                        var $drag = $(this).addClass('draggable');
                    } else {
                        var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
                    }
                    var z_idx = $drag.css('z-index'),
                        drg_h = $drag.outerHeight(),
                        drg_w = $drag.outerWidth(),
                        pos_y = $drag.offset().top + drg_h - e.pageY,
                        pos_x = $drag.offset().left + drg_w - e.pageX;

                    $drag.css('z-index', 1000).parents().on("mousemove", function (e) {

                        var height = $(window).height() - $drag.offset().top
                        var finalheight = height - drg_h
                        $('.console-panel-container').height(finalheight)
                        $('.draggable').offset({
                            top: e.pageY + pos_y - drg_h
                        }).on("mouseup", function () {
                            $(this).removeClass('draggable').css('z-index', z_idx);
                        });
                    });
                    e.preventDefault(); // disable selection
                     }
                }).on("mouseup", function () {
                    if (opt.handle === "") {
                        $(this).removeClass('draggable');
                    } else {
                        $(this).removeClass('active-handle').parent().removeClass('draggable');
                    }
                });

            }
        })(jQuery);
        $('.console-panel-container .resize-handle').drags();

     /*   $('.console-panel-container .resize-handle').mousemove(function (e) {
            if (e.buttons == 1) {
                var $drag = $('.resize-handle')
                var drg_h = $drag.outerHeight()
                var height = $(window).height() - $drag.offset().top
                var finalheight = height - drg_h
                $('.console-panel-container').height(finalheight)
                     $('.console-panel-container').height($(window).height()-$('.resize-handle').offset().top)

            }
        });*/

    };



    /**
     * @description create the console panel
     * @author Tushar Borole
     */
    var createThePanel = function () {
        $('body').append(panelHtml);
    };

    /**
     * @description remove the panel and destroy the objects related to it
     * @author Tushar Borole
     */
    var removeThePanel = function () {
        $('.console-panel-container').remove();
    };


    var enableKeyMode = function () {
        $(document).on('keydown', null, defaults.keys.clear, function () {
            clearTheConsole()
        });
        $(document).on('keydown', null, defaults.keys.open, function () {

            if ($(".console-panel-container").length) {
                removeThePanel();
            } else {
                createThePanel();
            }


        });
    }



    /**
     * @description initialize events
     * @author Tushar Borole
     */
    var initializeEvents = function () {
        $('.console-panel-container #minimize').click(function () {
            minimizeThePanel();
        });
        $('.console-panel-container #close').click(function () {
            removeThePanel();
        });
        $('.console-panel-container #clear').click(function () {
            clearTheConsole();
        });


    };

    /**
     * @description clear the console   
     * @author Tushar Borole
     */
    var clearTheConsole = function () {
        $('#log-container').empty();
    }









    var logErrorToScreen = function (text, classname) {
        var textHTML = '<li class=' + classname + '>' + text + '<li>';
        $('#log-container').append(textHTML);

    };



    /**
     * @description minimize the panel  
     * @author Tushar Borole
     */
    var minimizeThePanel = function () {
        var isVisible = $('.console-body').is(":visible");
        if (isVisible) {
            $('.console-panel-container').addClass('minimized-console');
            $('.console-body').hide();
            $('#minimize i').attr('class', 'fa fa-square-o');
        } else {
            $('.console-panel-container').removeClass('minimized-console');
            $('.console-body').show();
            $('#minimize i').attr('class', 'fa fa-minus');
        }



    };


    /**
     * @description ajax interceptor
     * @author Tushar Borole
     */
    var enableXhrInterceptor = function () {


        xhook.before(function (request) {
            var xhrText = request.method + " " + request.url
            logErrorToScreen(xhrText, 'xhr-log');
            //override request header 'Content-type'
            //request.headers['Content-type'] = 'awesome/file';
        });

        xhook.after(function (request, response) {
            //console.log(response)
            // response.headers['Foo'] = 'Bar';
        });


    };

    var init = function (data) {
        defaults = $.extend(defaults, data);
        createThePanel();
        initializeEvents();
        enableXhrInterceptor();
        resizeConsole();

        if (defaults.enableKeys) {
            enableKeyMode()
        }
        window.console = logObject; // overrite the log functionnality

    };




    // Public API
    window.debuggerLog = {
        init: init,
        destroy: removeThePanel
    };







    window.onerror = function (msg, url, line, col, error) {
        logErrorToScreen(msg, 'error-error');
    };

})();