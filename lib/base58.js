!function(globals) {
'use strict'

var _imports = {}

//*** UMD BEGIN
if (typeof define !== 'undefined' && define.amd) { //require.js / AMD
  define(['cryptocoin-convert-hex', 'cryptocoin-convert-strings'], function(convertHex) {
    _imports.bytesToHex = convertHex.bytesToHex
    return ripemd160
  })
} else if (typeof module !== 'undefined' && module.exports) { //CommonJS
  try { //Node.js
    _imports.bytesToHex = require('cryptocoin-convert-hex').bytesToHex
    _imports.convertString = require('cryptocoin-convert-string')
  } catch (e) { //Component
    _imports.bytesToHex = require('convert-hex').bytesToHex
    _imports.convertString = require('convert-string')
  }
  module.exports = ripemd160
} else {
  _imports.bytesToHex = globals.convertHex.bytesToHex
  globals.ripemd160 = ripemd160
}
//*** UMD END




}(this);