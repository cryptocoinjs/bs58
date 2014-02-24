var BigInteger = require('bigi');

'use strict'

module.exports.decode = decode;
module.exports.encode = encode;


var alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var base = BigInteger.valueOf(58);

var positions = {};
for (var i=0 ; i < alphabet.length ; ++i) {
  positions[alphabet[i]] = i;
}

function encode (input) {
  var bi = BigInteger.fromByteArrayUnsigned(input);
  var chars = [];

  while (bi.compareTo(base) >= 0) {
    var mod = bi.mod(base);
    chars.push(alphabet[mod.intValue()]);
    bi = bi.subtract(mod).divide(base);
  }
  chars.push(alphabet[bi.intValue()]);

  // Convert leading zeros too.
  for (var i = 0; i < input.length; i++) {
    if (input[i] == 0x00) {
      chars.push(alphabet[0]);
    } else break;
  }

  return chars.reverse().join('');
}


function decode (input) {
  var base = BigInteger.valueOf(58);

  var length = input.length;
  var num = BigInteger.valueOf(0);
  var leading_zero = 0;
  var seen_other = false;
  for (var i=0; i<length ; ++i) {
    var char = input[i];
    var p = positions[char];

    // if we encounter an invalid character, decoding fails
    if (p === undefined) {
      throw new Error('invalid base58 string: ' + input);
    }

    num = num.multiply(base).add(BigInteger.valueOf(p));

    if (char == '1' && !seen_other) {
      ++leading_zero;
    }
    else {
      seen_other = true;
    }
  }

  var bytes = num.toByteArrayUnsigned();

  // remove leading zeros
  while (leading_zero-- > 0) {
    bytes.unshift(0);
  }

  return bytes;
}
