var base58 = require('../')
var fixtures = require('./fixtures')

require('terst')

describe('+ encode(input)', function() {
  it('should properly encode hex values', function() {
    fixtures.valid.forEach(function(f) {
      var out = base58.encode(new Buffer(f.hex, 'hex'))
      EQ (out, f.string)
    })
  })
})

describe('+ decode(input)', function() {
  it('should properly decode base58 encoded values', function() {
    fixtures.valid.forEach(function(f) {
      var out = base58.decode(f.string)
      EQ (out.toString('hex'), f.hex)
    })
  })

  fixtures.invalid.forEach(function(f) {
    it('throws on ' + f.description, function() {
      THROWS (function() {
        base58.decode(f.string)
      })
    })
  })
})


