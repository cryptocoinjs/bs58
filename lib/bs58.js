
// Base58 encoding/decoding
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc
// Made generic

var BTC_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

function baseCodec(alphabet) {
  var alphabetMap = {}
  for(var i = 0; i < alphabet.length; ++i) {
    alphabetMap[alphabet.charAt(i)] = i
  }
  var base = alphabet.length
  var firstChar = alphabet[0]

  function encode(buffer) {
    if (buffer.length === 0) return ''

    var i, j, digits = [0]
    for (i = 0; i < buffer.length; ++i) {
      for (j = 0; j < digits.length; ++j) digits[j] <<= 8

      digits[0] += buffer[i]

      var carry = 0
      for (j = 0; j < digits.length; ++j) {
        digits[j] += carry

        carry = (digits[j] / base) | 0
        digits[j] %= base
      }

      while (carry) {
        digits.push(carry % base)

        carry = (carry / base) | 0
      }
    }

    // deal with leading zeros
    for (i = 0; buffer[i] === 0 && i < buffer.length - 1; ++i) digits.push(0)

    // convert digits to a string
    var str = ""
    for (i = digits.length - 1; i >= 0; --i) {
      str += alphabet[digits[i]]
    }

    return str
  }

  function decode(string) {
    if (string.length === 0) return []

    var i, j, bytes = [0]
    for (i = 0; i < string.length; ++i) {
      var c = string[i]
      if (!(c in alphabetMap)) throw new Error('Non-base' +base+ ' character')

      for (j = 0; j < bytes.length; ++j) bytes[j] *= base
      bytes[0] += alphabetMap[c]

      var carry = 0
      for (j = 0; j < bytes.length; ++j) {
        bytes[j] += carry

        carry = bytes[j] >> 8
        bytes[j] &= 0xff
      }

      while (carry) {
        bytes.push(carry & 0xff)

        carry >>= 8
      }
    }

    // deal with leading zeros
    for (i = 0; string[i] === firstChar &&
                i < string.length - 1; ++i)
      bytes.push(0)

    return bytes.reverse()
  }

  return {
    encode: encode,
    decode: decode
  }
}

// Export default bitcoin alphabet for backwards compat
var api = baseCodec(BTC_ALPHABET)
// Let's be flexible here, so BTC like apps can use this module
api.baseCodec = baseCodec
module.exports = api
