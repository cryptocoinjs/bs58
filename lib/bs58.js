var BigInteger = require('bigi');

'use strict'

module.exports.decode = decode;
module.exports.encode = encode;

var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var ALPHABET_BUF = new Buffer(ALPHABET)
var LOOKUP = {};
for (var i=0 ; i < ALPHABET.length ; ++i) {
  LOOKUP[ALPHABET[i]] = i;
}

var BASE = 58;
var base = BigInteger.valueOf(BASE);


function encode (input) {
  var bi = BigInteger.fromBuffer(input)
  var result = new Buffer(input.length << 1)

  var i = result.length - 1
  while (bi.compareTo(BigInteger.ZERO) > 0) {
    var remainder = bi.mod(base)
    bi = bi.divide(base)

    result[i] = ALPHABET_BUF[remainder.intValue()]
    i--
  }

  // deal with leading zeros
  var j = 0
  while (input[j] === 0) {
    result[i] = ALPHABET_BUF[0]
    j++
    i--
  }

  return result.slice(i + 1, result.length).toString()
}


function decode (input) {
  var num = BigInteger.valueOf(0);
  var leadingZero = 0;
  var seenOther = false;
  for (var i = 0; i < input.length ; ++i) {
    var ch = input[i];
    var p = LOOKUP[ch];

    // if we encounter an invalid character, decoding fails
    if (p === undefined) {
      throw new Error('invalid base58 string: ' + input);
    }

    num = num.multiply(base).add(BigInteger.valueOf(p));

    if (ch == ALPHABET[0] && !seenOther) {
      ++leadingZero;
    }
    else {
      seenOther = true;
    }
  }

  var bytes = num.toByteArrayUnsigned();

  // remove leading zeros
  while (leadingZero-- > 0) {
    bytes.unshift(0);
  }

  return new Buffer(bytes);
}
