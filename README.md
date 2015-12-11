

# debugger.js

![](logo.png)

The motive of debugger js was to create a cross browser console, so that every person can debug in any browser with same look and feel. With help of debugger.js one can easily debug the website or phonegap application on mobile device.




# Getting Started

Install via bower

```sh
bower install debugger.js
```

Install via npm

```sh
npm install debugger.js
```

Include in html
```html
 <link rel="stylesheet" href="debugger.css">
 <script src="debugger-lib.js"></script>
<script src="debugger.js"></script>
```



## Documentation


|                  | Option| 
 ----------------- | ---------------------------- | ------------------
| debuggerLog.init(options); | `Initilaize the console` 
| debuggerLog.destroy(); | `destroy the console`

one can configure the opions for console, below are setting needed

```js
 var options = {
        'enableKeys': true,
        'keys':{
            'open':'alt+o',
            'clear':'alt+c'
        }
    }
```

## Keys

|                  | Option| 
 ----------------- | ---------------------------- | ------------------
| alt+o | `open debugger` 
| alt+c | `clear console` 



## Features

* Easy configurable
* Cross platform
* Works on mobile device


## Browser Support

| <img src="https://cdn0.iconfinder.com/data/icons/jfk/512/chrome-512.png" width="100px" height="100px" alt="Chrome logo"> | <img src="https://cdn1.iconfinder.com/data/icons/appicns/513/appicns_Firefox.png" width="100px" height="100px" alt="Firefox logo"> | <img src="http://icons.iconarchive.com/icons/cornmanthe3rd/plex/512/Internet-ie-icon.png" width="100px" height="100px" alt="Internet Explorer logo"> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Opera_browser_logo_2013_vector.svg/512px-Opera_browser_logo_2013_vector.svg.png" width="100px" height="100px" alt="Opera logo"> | <img src="http://icons.iconarchive.com/icons/osullivanluke/orb-os-x/512/Safari-icon.png" width="100px" height="100px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| 42+ ✔ | 40+ ✔ | 8+ ✔ | 29+ ✔ |  8+ ✔ |



## Requirements

* jquery
* fontawsome



### Todo

- [x] Keys support
- [ ] Find in html
- [ ] XHR Request
- [ ] Sorting of different type of console



----------

## Contributing

Open an issue first to discuss potential changes/additions. If you have questions with the guide, feel free to leave them as issues in the repository. If you find a typo, create a pull request. The idea is to keep the content up to date and use github’s native feature to help tell the story with issues and PR’s, which are all searchable via google. Why? Because odds are if you have a question, someone else does too! You can learn more here at about how to contribute.

*By contributing to this repository you are agreeing to make your content available subject to the license of this repository.*

### Process
    1. Discuss the changes in a GitHub issue.
    2. Open a Pull Request, reference the issue, and explain the change and why it adds value.
    3. The Pull Request will be evaluated and either merged or declined.

## License

 Use this guide. Attributions are appreciated._

### Copyright

Copyright (c) 2014-2015 [Tushar Borole](http://www.tusharborole.com)

### (The MIT License)
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##Last but not least
This is made in India with love and passion  ʕ´•ᴥ•`ʔ

<a href="../../" target="_blank"><img src="http://lonamowers-hrd.appspot.com/images/made_india.jpg" height="200"></a>
