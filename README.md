bs58
===

JavaScript component to compute [Base58](https://en.bitcoin.it/wiki/Base58Check_encoding) check encoding for Bitcoin. See this article for more details: [bitcoin address](http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript).


Usage
-----

### Installation

    npm install --save bs58

### browser

You can use this module in the browser. Install [Browserify](https://github.com/substack/node-browserify):

    npm install -g browserify

then run:

    browserify < lib/bs58.js > lib/bs85.bundle.js


Api
---

### encode(input)

`input` can be either a hex string, an array of bytes, or a [Buffer](http://nodejs.org/api/buffer.html). It returns a `string`.

**example (hex string)**:

```js
var base58 = require('bs58');

var unencodedData = "0x003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187"; //<-- notice the "0x" prefix?
var out = base58.encode(unencodedData);
console.log(out); // => 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS"
```

** example (byte array)**:

```js
var base58 = require('bs58');
var conv = require('binstring')

var unencodedData = "003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187";
var out = base58.encode(conv(unencodedData: {in: 'hex', out: 'bytes'}));
console.log(out); // => 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS"
```

** example (Buffer)**:

```js
var base58 = require('bs58');
var conv = require('binstring')

var unencodedData = "003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187";
var out = base58.encode(conv(unencodedData: {in: 'hex', out: 'buffer'}));
console.log(out); // => 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS"
```


### decode(input)

`input` must be a base 58 encoded string. Returns a `Buffer`.

**exmample**:

```js
var base58 = require('base58');

var address = "16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS";
var out = base58.decode(address)
console.log(out.toString('hex')); // => 003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187
```


Credits
-------

Most of the code from Stefan Thomas in https://github.com/bitcoinjs/bitcoinjs-lib


License
-------

(MIT License)


