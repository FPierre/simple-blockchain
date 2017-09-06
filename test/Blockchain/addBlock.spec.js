import test from 'ava'

const Block = require('../../src/Block')
const Blockchain = require('../../src/Blockchain')

test.beforeEach(t => {
  const blockchain = new Blockchain()

	t.context.blockchain = blockchain
  t.context.genesisBlock = blockchain.genesisBlock
})

test('success to add valid block in chain', t => {
  const { blockchain, genesisBlock } = t.context
  const validBlock = new Block(1, genesisBlock.hash, '04/09/2017', { amount: 1 })

  blockchain.addBlock(validBlock)

  // t.pass()
  t.is(blockchain.getLatestBlock(), validBlock)
})

test('fails to add invalid block in chain', t => {
  const { blockchain, genesisBlock } = t.context
  const invalidBlock = new Block(2, genesisBlock.hash, '04/09/2017', { amount: 1 })

  blockchain.addBlock(invalidBlock)

  // t.pass()
  t.not(blockchain.getLatestBlock(), invalidBlock)
  t.is(blockchain.getLatestBlock(), genesisBlock)
})
