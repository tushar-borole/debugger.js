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

    
     var options = {
        'enableKeys': true,
        'keys':{
            'open':'alt+o',
            'clear':'alt+c'
        }
    }

    debuggerLog.init(options);
  
    var testDebug = {
        'test': 'check'
    }

console.log(testDebug)
})