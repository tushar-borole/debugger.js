$(document).ready(function () {
    debuggerLog.init(options);

    $('#console').click(function () {

        console.log('Console')

    })
    $('#info').click(function () {

        console.info('Info in console')

    })
    $('#warn').click(function () {

        console.warn('warn in console')

    })
    $('#error').click(function () {

        console.error('error in console')

    })

    $('#xhr').click(function () {

        $.get('params.json')

        $.post('params.json')

    })




    $('#undefined').click(function () {

        test = test + 1

    })


    var options = {
        'enableKeys': true,
        'keys': {
            'open': 'alt+o',
            'clear': 'alt+c'
        }
    }



    var testDebug = {
        'test': 'check'
    }

    console.log(testDebug)
})