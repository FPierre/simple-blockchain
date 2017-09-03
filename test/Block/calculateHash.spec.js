import test from 'ava'

const Block = require('../../Block')

const index = 1
const previousHash = '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7'
const timestamp = 1602282150
const data = 'block 1'

test('calculateHash', t => {
  const expectedHash = 'daf5447901d9e4156619ac827eb1f6bb8744bad1dcf0e41780b2cfca66795f65'
  const actualHash = Block.calculateHash(index, previousHash, timestamp, data)

  t.is(expectedHash, actualHash)
}, index, previousHash, timestamp, data)
