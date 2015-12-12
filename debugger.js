

(function () {

    var panelHtml = '<div class="console-panel-container"> <div class="console-header"> <div class="resize-handle"></div><ul class="left-action-button"> <li><a id="clear" href="#">clear</a></li><li> <input class="filter-checkbox" data-key="log" type="checkbox"/>Log</li><li> <input class="filter-checkbox" data-key="error" type="checkbox"/>Errors</li><li> <input class="filter-checkbox" data-key="warning" type="checkbox"/>Warnings</li><li> <input class="filter-checkbox" data-key="info" type="checkbox"/>Info</li><li> <input class="filter-checkbox" data-key="XHR" type="checkbox"/>XHR</li></ul> <ul class="console-action-btn"> <li><a id="minimize" href="#"><i class="fa fa-minus"></i></a></li><li><a id="close" href="#"><i class="fa fa-times"></i></a></li></ul> </div><div class="console-body"> <ul id="log-container"></ul> </div></div>';



    var defaults = {
        'enableKeys': true,
        'keys': {
            'open': 'alt+o',
            'clear': 'alt+c'
        }
    };


    // define a new console
    var logObject = {
        log: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'log-error', 'log');

        },
        info: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'info-error', 'info');
        },
        warn: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'warn-error', 'warning');
        },
        error: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'error-error', 'error');
        }
    };

    /**
     * @description resize the console to move up and down
     * @author Tushar Borole
     */
    var resizeConsole = function () {
        $('.console-panel-container .resize-handle').drags();
    };



    /**
     * @description create the console panel
     * @author Tushar Borole
     */
    var createThePanel = function () {
        /*  $.ajax({
              url: "template.html"
          }).done(function (data) {

              $('body').append(data)
          });*/

        $('body').append(panelHtml);
    };

    /**
     * @description remove the panel and destroy the objects related to it
     * @author Tushar Borole
     */
    var removeThePanel = function () {
        $('.console-panel-container').remove();
    };


    /**
     * filter diffeneret type of log in console
     * @author Tushar Borole
     */
    var filterLogs = function () {
        $('.filter-checkbox').click(function () {
            var checkedCheckbox = [];
            $('.filter-checkbox').each(function () {
                var isChecked = $(this).is(':checked');
                if (isChecked) {
                    var checkboxChecked = $(this).attr("data-key");
                    checkedCheckbox.push(checkboxChecked);
                }


            });
            $('#log-container li').hide();
            $.each(checkedCheckbox, function (index, value) {
                $('#log-container [data-key=' + value + ']').show();
            });



        });


    };


    var enableKeyMode = function () {
        $(document).on('keydown', null, defaults.keys.clear, function () {
            clearTheConsole();
        });
        $(document).on('keydown', null, defaults.keys.open, function () {

            if ($(".console-panel-container").length) {
                removeThePanel();
            } else {
                createThePanel();
            }


        });
    };



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
    };









    var logErrorToScreen = function (text, classname, key) {
        var textHTML = '<li data-key=' + key + ' class=' + classname + '>' + text + '<li>';
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
            var xhrText = request.method + " " + request.url;
            logErrorToScreen(xhrText, 'xhr-log', 'XHR');
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
        filterLogs();

        if (defaults.enableKeys) {
            enableKeyMode();
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