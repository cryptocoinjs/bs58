var BigInteger = require('bigi');

'use strict'

module.exports.decode = decode;
module.exports.encode = encode;

var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var LOOKUP = {};
for (var i=0 ; i < ALPHABET.length ; ++i) {
  LOOKUP[ALPHABET[i]] = i;
}

var BASE = 58;
var base = BigInteger.valueOf(BASE);


function encode (input) {
  input = [].slice.call(input)

  var bi = BigInteger.fromByteArrayUnsigned(input);
  var chars = [];

  while (bi.compareTo(base) >= 0) {
    var mod = bi.mod(base);
    chars.push(ALPHABET[mod.intValue()]);
    bi = bi.subtract(mod).divide(base);
  }
  chars.push(ALPHABET[bi.intValue()]);

  // Convert leading zeros too.
  for (var i = 0; i < input.length; i++) {
    if (input[i] == 0x00) {
      chars.push(ALPHABET[0]);
    } else break;
  }

  return chars.reverse().join('');
}


function decode (input) {
  var base = BigInteger.valueOf(58);

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
