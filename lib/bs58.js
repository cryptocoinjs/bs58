// Base58 encoding/decoding

'use strict'

module.exports.decode = decode;
module.exports.encode = encode;

var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var INVERSE_ALPHABET = {};
var BASE = 58;

ALPHABET.split('').forEach(function(c, i){ INVERSE_ALPHABET[c] = i; });

/**
 * Encodes a node Buffer as base58.
 *
 * @param {Buffer} input The buffer to encode.
 *
 * @return {string} The input encoded as base58.
 */
function encode (input) {
  // Handle the edge case for empty input.
  if(input.length == 0) return '';

  // Convert from bytes to base58.
  var digits = [0];
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < digits.length; j++) { digits[j] <<= 8; }
    digits[digits.length - 1] += input[i];

    var carry = 0;
    for (var j = digits.length - 1; j >= 0; j--){
      digits[j] += carry;
      carry = (digits[j] / BASE) | 0;
      digits[j] %= BASE;
    }

    while (carry) {
      digits.unshift(carry);
      carry = (digits[0] / BASE) | 0;
      digits[0] %= BASE;
    }
  }

  // Preserve leading padding characters.
  for (var i = 0; i < input.length - 1 && input[i] == 0; i++) { digits.unshift(0); }

  // Encode the digits with the base58 alphabet.
  return digits.map(function(digit) { return ALPHABET[digit]; }).join('');
}

/**
 * Decodes a base58 string as a Buffer.
 *
 * @param {string} input The string to decode.
 *
 * @return {Buffer} The input decoded into a Buffer.
 */
function decode (input) {
  // Handle the edge case for empty input.
  if(input.length == 0) return new Buffer([]);

  // Decode the base58 input.
  input = input.split('').map(function(c){
    if(typeof INVERSE_ALPHABET[c] === 'undefined') { throw('Non-base58 character'); }
    return INVERSE_ALPHABET[c];
  });

  // Convert the base58 digits into a byte array.
  var bytes = [0];
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < bytes.length; j++) { bytes[j] *= BASE; }
    bytes[bytes.length - 1] += input[i];

    var carry = 0;
    for (var j = bytes.length - 1; j >= 0; j--){
      bytes[j] += carry;
      carry = bytes[j] >> 8;
      bytes[j] &= 0xff;
    }
    
    while (carry) {
      bytes.unshift(carry);
      carry = bytes[0] >> 8;
      bytes[0] &= 0xff;
    }
  }

  // Preserve leading padding characters.
  for (var i = 0; i < input.length - 1 && input[i] == 0; i++) { bytes.unshift(0); }

  // Create a Buffer with the byte array.
  return new Buffer(bytes);
}
