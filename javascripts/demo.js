$(document).ready(function () {


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


    $('#undefined').click(function () {

        test = test + 1

    })


    debuggerLog.init();
  
    var testDebug = {
        'test': 'check'
    }

console.log(testDebug)
})