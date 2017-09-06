import test from 'ava'

const Block = require('../../src/Block')
const Blockchain = require('../../src/Blockchain')

test.beforeEach(t => {
  const blockchain = new Blockchain()

	t.context.blockchain = blockchain
  t.context.genesisBlock = blockchain.genesisBlock
})

test('success with Genesis block only in blockchain', t => {
  const { blockchain } = t.context

  // t.pass()
  t.true(blockchain.isValidChain())
})

test('success with valid block in blockchain', t => {
  const { blockchain, genesisBlock } = t.context
  const validBlock = new Block(1, genesisBlock.hash, '04/09/2017', { amount: 1 })

  blockchain.addBlock(validBlock)

  // t.pass()
  t.true(blockchain.isValidChain())
})

test('fails with empty blockchain', t => {
  const { blockchain } = t.context
  blockchain.chain = []

  // t.pass()
  t.false(blockchain.isValidChain())
})

test('fails with Genesis block not in first position in blockchain', t => {
  const { blockchain, genesisBlock } = t.context
  const validBlock = new Block(1, genesisBlock.hash, '04/09/2017', { amount: 1 })
  blockchain.chain = [validBlock, genesisBlock]

  // t.pass()
  t.false(blockchain.isValidChain())
})

test('fails with invalid block', t => {
  const { blockchain, genesisBlock } = t.context
  const invalidBlock = new Block(2, genesisBlock.hash, '04/09/2017', { amount: 1 })
  blockchain.chain = [invalidBlock, genesisBlock]

  // t.pass()
  t.false(blockchain.isValidChain())
})
