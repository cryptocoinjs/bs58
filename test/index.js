var test = require('tape')
var base58 = require('../')

var fixtures = require('./fixtures.json')

test('base58', function (t) {
  t.test('encode', function (t) {
    fixtures.valid.forEach(function (f) {
      t.test('can encode ' + f.hex, function (t) {
        var actual = base58.encode(Buffer.from(f.hex, 'hex'))
        t.equal(actual, f.string)
        t.end()
      })
    })

    t.end()
  })

  t.test('decode', function (t) {
    fixtures.valid.forEach(function (f) {
      t.test('can decode ' + f.string, function (t) {
        var actual = base58.decode(f.string).toString('hex')
        t.same(actual, f.hex)
        t.end()
      })
    })

    fixtures.invalid.forEach(function (f) {
      t.test('throws on ' + f.description, function (t) {
        t.throws(function () {
          base58.decode(f.string)
        }, /^Error: Non-base58 character$/)
        t.end()
      })
    })

    t.end()
  })

  t.end()
})
