import test from 'ava'

const Block = require('../../src/Block')
const Core = require('../../src/Core')

test.beforeEach(t => {
  const index = 1
  const previousHash = '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7'
  const timestamp = 1602282150
  const data = 'block 1'
  const hash = 'daf5447901d9e4156619ac827eb1f6bb8744bad1dcf0e41780b2cfca66795f65'
  const block = new Block(index, previousHash, timestamp, data, hash)

  t.context.block = block
})

test('mustReplaceChain', t => {
  // Core.mustReplaceChain([t.context.block])

  t.pass()
})
