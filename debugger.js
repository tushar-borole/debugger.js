(function () {

    var panelHtml = '<div class="console-panel-container">' +
        '<div class="console-header">' +
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
            $('.console-body').hide();
            $('#minimize i').attr('class', 'fa fa-square-o');
        } else {
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
           var xhrText=request.method+" "+ request.url
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