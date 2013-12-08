var base58 = require('../lib/bs58')
  , conv = require('convert-hex')

require('terst')

describe('+ encode(input)', function() {
  describe('> when input a byte array', function() {
    it('should convert to the base58 encoding', function() {
      var privateKeyAndChecksum = "801184CD2CDD640CA42CFC3A091C51D549B2F016D454B2774019C2B2D2E08529FD206EC97E"
      var privateKeyWIF = base58.encode(conv.hexToBytes(privateKeyAndChecksum))
      EQ (privateKeyWIF, "5Hx15HFGyep2CfPxsJKe2fXJsCVn5DEiyoeGGF6JZjGbTRnqfiD")

      var unencodedAddress = "003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187"
      var address = base58.encode(conv.hexToBytes(unencodedAddress))
      EQ (address, "16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS")
    })
  })
})

describe('+ decode(input)', function() {
  describe('> when a byte array is input', function() {
    it('should convert to a a byte array', function() {
       var address = "16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS"
    EQ (conv.bytesToHex(base58.decode(address)), "003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187")
    })
  })
})


