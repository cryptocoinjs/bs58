import tape from 'tape'
import base58 from '../src/esm/index.js'
import fixtures from './fixtures.json' assert { type: "json" }

const { encode, decode } = base58
const { valid, invalid } = fixtures

tape('base58', function (t) {
  tape('encode', function (t) {
    valid.forEach(function (f) {
      tape('can encode ' + f.hex, function (t) {
        const actual = encode(Buffer.from(f.hex, 'hex'))
        t.equal(actual, f.string)
        t.end()
      })
    })

    t.end()
  })

  tape('decode', function (t) {
    valid.forEach(function (f) {
      tape('can decode ' + f.string, function (t) {
        const actual = Buffer.from(decode(f.string)).toString('hex')
        t.same(actual, f.hex)
        t.end()
      })
    })

    invalid.forEach(function (f) {
      tape('throws on ' + f.description, function (t) {
        t.throws(function () {
          decode(f.string)
        }, /^Error: Non-base58 character$/)
        t.end()
      })
    })

    t.end()
  })

  t.end()
})
