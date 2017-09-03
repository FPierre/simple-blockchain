import test from 'ava'

const Block = require('../../src/Block')

test.beforeEach(t => {
  const index = 1
  const previousHash = '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7'
  const timestamp = 1602282150
  const data = 'block 1'
  t.context.hash = 'daf5447901d9e4156619ac827eb1f6bb8744bad1dcf0e41780b2cfca66795f65'
  t.context.block = new Block(index, previousHash, timestamp, data, t.context.hash)
})

test('isValidNewBlock', t => {
  const index = 2
  const previousHash = t.context.hash
  const timestamp = 1504362623307
  const data = 'block 2'
  const hash = '24a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  const newBlock = new Block(index, previousHash, timestamp, data, hash)

  const isValid = Block.isValidNewBlock(newBlock, t.context.block)

  t.true(isValid)
})

test('isValidNewBlock fails with invalid index', t => {
  const invalidIndex = 3
  const previousHash = t.context.hash
  const timestamp = 1504362623307
  const data = 'block 2'
  const hash = '24a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  const newBlock = new Block(invalidIndex, previousHash, timestamp, data, hash)

  const isValid = Block.isValidNewBlock(newBlock, t.context.block)

  t.false(isValid)
})

test('isValidNewBlock fail with invalid previous hash', t => {
  const index = 2
  const invalidPreviousHash = '14a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  const timestamp = 1504362623307
  const data = 'block 2'
  const hash = '24a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  const newBlock = new Block(index, invalidPreviousHash, timestamp, data, hash)

  const isValid = Block.isValidNewBlock(newBlock, t.context.block)

  t.false(isValid)
})
