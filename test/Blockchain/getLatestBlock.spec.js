import test from 'ava'

const Block = require('../../src/Block')
const Blockchain = require('../../src/Blockchain')

test('success to returns lastest block from chain', t => {
	const blockchain = new Blockchain()
	const genesisBlock = blockchain.genesisBlock
  const newBlock = new Block(1, genesisBlock.hash, '04/09/2017', { amount: 1 })

  blockchain.addBlock(newBlock)

	// t.pass()
  t.is(blockchain.getLatestBlock(), newBlock)
})
