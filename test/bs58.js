var assert = require('assert')
var base58 = require('../lib/bs58')

var fixtures = require('./fixtures.json')

describe('base58', function() {
  describe('encode', function() {
    fixtures.valid.forEach(function(f) {
      it('can encode ' + f.hex, function() {
        var actual = base58.encode(new Buffer(f.hex, 'hex'))

        assert.strictEqual(actual, f.string)
      })
    })
  })

  describe('decode', function() {
    fixtures.valid.forEach(function(f) {
      it('can decode ' + f.string, function() {
        var actual = base58.decode(f.string).toString('hex')

        assert.strictEqual(actual, f.hex)
      })
    })

    fixtures.invalid.forEach(function(f) {
      it('throws on ' + f.description, function() {
        assert.throws(function() {
          base58.decode(f.string)
        }, /Non-base58 character/)
      })
    })
  })
})
