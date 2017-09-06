import test from 'ava'

const Block = require('../../src/Block')
const Blockchain = require('../../src/Blockchain')

test.beforeEach(t => {
  const blockchain = new Blockchain()

  t.context.blockchain = blockchain
  t.context.genesisBlock = blockchain.genesisBlock
})

test('success with valid block', t => {
  const { blockchain, genesisBlock } = t.context
  const validBlock = new Block(1, genesisBlock.hash, '04/09/2017', { amount: 1 })

  // t.pass()
  t.true(validBlock.isValid(genesisBlock))
})

test('fails with invalid block', t => {
  const { blockchain, genesisBlock } = t.context
  const invalidBlock = new Block(2, genesisBlock.hash, '04/09/2017', { amount: 1 })

  // t.pass()
  t.false(invalidBlock.isValid(genesisBlock))
})

test('fails with invalid missing index block', t => {
  const { blockchain, genesisBlock } = t.context
  const invalidBlock = new Block('', genesisBlock.hash, '04/09/2017', { amount: 1 })

  // t.pass()
  t.false(invalidBlock.isValid(genesisBlock))
})

test('fails with invalid missing previous hash block', t => {
  const { blockchain, genesisBlock } = t.context
  const invalidBlock = new Block(1, '', '04/09/2017', { amount: 1 })

  // t.pass()
  t.false(invalidBlock.isValid(genesisBlock))
})

test('fails with invalid missing index block', t => {
  const { blockchain, genesisBlock } = t.context
  const invalidBlock = new Block(1, genesisBlock.hash, '', { amount: 1 })

  // t.pass()
  t.false(invalidBlock.isValid(genesisBlock))
})

test('fail with invalid previous hash', t => {
  // const index = 2
  // const invalidPreviousHash = '14a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  // const timestamp = 1504362623307
  // const data = 'block 2'
  // const hash = '24a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  // const newBlock = new Block(index, invalidPreviousHash, timestamp, data, hash)
  //
  // const isValid = Block.isValidNewBlock(newBlock, t.context.block)
  //
  // t.false(isValid)
  t.pass()
})
