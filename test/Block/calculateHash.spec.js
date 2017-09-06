import test from 'ava'

const Block = require('../../src/Block')

test('success to returns valid hash from block params', t => {
  const expectedHash = '852ced9ae4e3c58dfb0f1d7a9fdae813c0bf1f70a2da9dc9f85853f091ec239f'
  const block = new Block(1, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', '04/09/17', { amount: 1 })

  const actualHash = block.hash

  t.is(expectedHash, actualHash)
})
