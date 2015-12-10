(function (jQuery) {

    jQuery.hotkeys = {
        version: "0.2.0",

        specialKeys: {
            8: "backspace",
            9: "tab",
            10: "return",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            59: ";",
            61: "=",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
        },

        shiftNums: {
            "`": "~",
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": "\"",
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        },

        // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
        textAcceptingInputTypes: [
      "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
      "datetime-local", "search", "color", "tel"],

        // default input types not to bind to unless bound directly
        textInputTypes: /textarea|input|select/i,

        options: {
            filterInputAcceptingElements: true,
            filterTextInputs: true,
            filterContentEditable: true
        }
    };

    function keyHandler(handleObj) {
        if (typeof handleObj.data === "string") {
            handleObj.data = {
                keys: handleObj.data
            };
        }

        // Only care when a possible input has been specified
        if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
            return;
        }

        var origHandler = handleObj.handler,
            keys = handleObj.data.keys.toLowerCase().split(" ");

        handleObj.handler = function (event) {
            //      Don't fire in text-accepting inputs that we didn't directly bind to
            if (this !== event.target &&
                (jQuery.hotkeys.options.filterInputAcceptingElements &&
                    jQuery.hotkeys.textInputTypes.test(event.target.nodeName) ||
                    (jQuery.hotkeys.options.filterContentEditable && jQuery(event.target).attr('contenteditable')) ||
                    (jQuery.hotkeys.options.filterTextInputs &&
                        jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1))) {
                return;
            }

            var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
                character = String.fromCharCode(event.which).toLowerCase(),
                modif = "",
                possible = {};

            jQuery.each(["alt", "ctrl", "shift"], function (index, specialKey) {

                if (event[specialKey + 'Key'] && special !== specialKey) {
                    modif += specialKey + '+';
                }
            });

            // metaKey is triggered off ctrlKey erronously
            if (event.metaKey && !event.ctrlKey && special !== "meta") {
                modif += "meta+";
            }

            if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
                modif = modif.replace("alt+ctrl+shift+", "hyper+");
            }

            if (special) {
                possible[modif + special] = true;
            } else {
                possible[modif + character] = true;
                possible[modif + jQuery.hotkeys.shiftNums[character]] = true;

                // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
                if (modif === "shift+") {
                    possible[jQuery.hotkeys.shiftNums[character]] = true;
                }
            }

            for (var i = 0, l = keys.length; i < l; i++) {
                if (possible[keys[i]]) {
                    return origHandler.apply(this, arguments);
                }
            }
        };
    }

    jQuery.each(["keydown", "keyup", "keypress"], function () {
        jQuery.event.special[this] = {
            add: keyHandler
        };
    });

})(jQuery || this.jQuery || window.jQuery);
// XHook - v1.3.3 - https://github.com/jpillora/xhook
// Jaime Pillora <dev@jpillora.com> - MIT Copyright 2015
(function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};t=a.document,d="before",c="after",m="readyState",l="addEventListener",k="removeEventListener",g="dispatchEvent",q="XMLHttpRequest",h="FormData",n=["load","loadend","loadstart"],e=["progress","abort","error","timeout"],w=parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase())||[])[1]),isNaN(w)&&(w=parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase())||[])[1])),(A=Array.prototype).indexOf||(A.indexOf=function(a){var b,c,d,e;for(b=d=0,e=this.length;e>d;b=++d)if(c=this[b],c===a)return b;return-1}),y=function(a,b){return Array.prototype.slice.call(a,b)},s=function(a){return"returnValue"===a||"totalSize"===a||"position"===a},v=function(a,b){var c,d;for(c in a)if(d=a[c],!s(c))try{b[c]=a[c]}catch(e){}return b},x=function(a,b,c){var d,e,f,h;for(e=function(a){return function(d){var e,f,h;e={};for(f in d)s(f)||(h=d[f],e[f]=h===b?c:h);return c[g](a,e)}},f=0,h=a.length;h>f;f++)d=a[f],c._has(d)&&(b["on"+d]=e(d))},u=function(a){var b;if(null!=t.createEventObject)return b=t.createEventObject(),b.type=a,b;try{return new Event(a)}catch(c){return{type:a}}},f=function(a){var c,d,e;return d={},e=function(a){return d[a]||[]},c={},c[l]=function(a,c,f){d[a]=e(a),d[a].indexOf(c)>=0||(f=f===b?d[a].length:f,d[a].splice(f,0,c))},c[k]=function(a,c){var f;return a===b?void(d={}):(c===b&&(d[a]=[]),f=e(a).indexOf(c),void(-1!==f&&e(a).splice(f,1)))},c[g]=function(){var d,f,g,h,i,j,k,l;for(d=y(arguments),f=d.shift(),a||(d[0]=v(d[0],u(f))),h=c["on"+f],h&&h.apply(b,d),l=e(f).concat(e("*")),g=j=0,k=l.length;k>j;g=++j)i=l[g],i.apply(b,d)},c._has=function(a){return!(!d[a]&&!c["on"+a])},a&&(c.listeners=function(a){return y(e(a))},c.on=c[l],c.off=c[k],c.fire=c[g],c.once=function(a,b){var d;return d=function(){return c.off(a,d),b.apply(null,arguments)},c.on(a,d)},c.destroy=function(){return d={}}),c},z=f(!0),z.EventEmitter=f,z[d]=function(a,b){if(a.length<1||a.length>2)throw"invalid hook";return z[l](d,a,b)},z[c]=function(a,b){if(a.length<2||a.length>3)throw"invalid hook";return z[l](c,a,b)},z.enable=function(){a[q]=p,i&&(a[h]=o)},z.disable=function(){a[q]=z[q],a[h]=i},r=z.headers=function(a,b){var c,d,e,f,g,h,i,j,k;switch(null==b&&(b={}),typeof a){case"object":d=[];for(e in a)g=a[e],f=e.toLowerCase(),d.push(""+f+":	"+g);return d.join("\n");case"string":for(d=a.split("\n"),i=0,j=d.length;j>i;i++)c=d[i],/([^:]+):\s*(.+)/.test(c)&&(f=null!=(k=RegExp.$1)?k.toLowerCase():void 0,h=RegExp.$2,null==b[f]&&(b[f]=h));return b}},i=a[h],o=function(a){var b;this.fd=a?new i(a):new i,this.form=a,b=[],Object.defineProperty(this,"entries",{get:function(){var c;return c=a?y(a.querySelectorAll("input,select")).filter(function(a){var b;return"checkbox"!==(b=a.type)&&"radio"!==b||a.checked}).map(function(a){return[a.name,"file"===a.type?a.files:a.value]}):[],c.concat(b)}}),this.append=function(a){return function(){var c;return c=y(arguments),b.push(c),a.fd.append.apply(a.fd,c)}}(this)},i&&(z[h]=i,a[h]=o),j=a[q],z[q]=j,p=a[q]=function(){var a,b,h,i,j,k,p,s,t,u,y,A,C,D,E,F,G;return a=-1,G=new z[q],u={},C=null,k=void 0,D=void 0,y=void 0,t=function(){var b,c,d,e;if(y.status=C||G.status,C===a&&10>w||(y.statusText=G.statusText),C!==a){e=r(G.getAllResponseHeaders());for(b in e)d=e[b],y.headers[b]||(c=b.toLowerCase(),y.headers[c]=d)}},s=function(){G.responseType&&"text"!==G.responseType?"document"===G.responseType?(y.xml=G.responseXML,y.data=G.responseXML):y.data=G.response:(y.text=G.responseText,y.data=G.responseText),"responseURL"in G&&(y.finalUrl=G.responseURL)},F=function(){j.status=y.status,j.statusText=y.statusText},E=function(){"text"in y&&(j.responseText=y.text),"xml"in y&&(j.responseXML=y.xml),"data"in y&&(j.response=y.data),"finalUrl"in y&&(j.responseURL=y.finalUrl)},i=function(a){for(;a>b&&4>b;)j[m]=++b,1===b&&j[g]("loadstart",{}),2===b&&F(),4===b&&(F(),E()),j[g]("readystatechange",{}),4===b&&setTimeout(h,0)},h=function(){k||j[g]("load",{}),j[g]("loadend",{}),k&&(j[m]=0)},b=0,A=function(a){var b,d;return 4!==a?void i(a):(b=z.listeners(c),d=function(){var a;return b.length?(a=b.shift(),2===a.length?(a(u,y),d()):3===a.length&&u.async?a(u,y,d):d()):i(4)},void d())},j=u.xhr=f(),G.onreadystatechange=function(){try{2===G[m]&&t()}catch(a){}4===G[m]&&(D=!1,t(),s()),A(G[m])},p=function(){k=!0},j[l]("error",p),j[l]("timeout",p),j[l]("abort",p),j[l]("progress",function(){3>b?A(3):j[g]("readystatechange",{})}),("withCredentials"in G||z.addWithCredentials)&&(j.withCredentials=!1),j.status=0,j.open=function(a,c,d,e,f){b=0,k=!1,D=!1,u.headers={},u.headerNames={},u.status=0,y={},y.headers={},u.method=a,u.url=c,u.async=d!==!1,u.user=e,u.pass=f,A(1)},j.send=function(a){var b,c,f,g,h,i,k,l;for(l=["type","timeout","withCredentials"],i=0,k=l.length;k>i;i++)c=l[i],f="type"===c?"responseType":c,f in j&&(u[c]=j[f]);u.body=a,h=function(){var a,b,d,g,h,i;for(x(e,G,j),j.upload&&x(e.concat(n),G.upload,j.upload),D=!0,G.open(u.method,u.url,u.async,u.user,u.pass),h=["type","timeout","withCredentials"],d=0,g=h.length;g>d;d++)c=h[d],f="type"===c?"responseType":c,c in u&&(G[f]=u[c]);i=u.headers;for(a in i)b=i[a],G.setRequestHeader(a,b);u.body instanceof o&&(u.body=u.body.fd),G.send(u.body)},b=z.listeners(d),(g=function(){var a,c;return b.length?(a=function(a){return"object"!=typeof a||"number"!=typeof a.status&&"number"!=typeof y.status?void g():(v(a,y),B.call(a,"data")<0&&(a.data=a.response||a.text),void A(4))},a.head=function(a){return v(a,y),A(2)},a.progress=function(a){return v(a,y),A(3)},c=b.shift(),1===c.length?a(c(u)):2===c.length&&u.async?c(u,a):a()):h()})()},j.abort=function(){C=a,D?G.abort():j[g]("abort",{})},j.setRequestHeader=function(a,b){var c,d;c=null!=a?a.toLowerCase():void 0,d=u.headerNames[c]=u.headerNames[c]||a,u.headers[d]&&(b=u.headers[d]+", "+b),u.headers[d]=b},j.getResponseHeader=function(a){var b;return b=null!=a?a.toLowerCase():void 0,y.headers[b]},j.getAllResponseHeaders=function(){return r(y.headers)},G.overrideMimeType&&(j.overrideMimeType=function(){return G.overrideMimeType.apply(G,arguments)}),G.upload&&(j.upload=u.upload=f()),j},"function"==typeof this.define&&this.define.amd?define("xhook",[],function(){return z}):(this.exports||this).xhook=z}).call(this,window);