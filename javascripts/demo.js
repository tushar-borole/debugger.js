$(document).ready(function () {


    $('#console').click(function () {

        console.log('Check the console for debugger js')

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