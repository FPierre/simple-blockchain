import test from 'ava'

const Block = require('../../src/Block')

test('calculateHash success to returns valid hash from block params', t => {
  const expectedHash = 'daf5447901d9e4156619ac827eb1f6bb8744bad1dcf0e41780b2cfca66795f65'
  const block = new Block(1, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', '04/09/17', { amount: 1 })

  const actualHash = block.hash

  t.is(expectedHash, actualHash)
})
