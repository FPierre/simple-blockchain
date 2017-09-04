import test from 'ava'

const Blockchain = require('../../src/Blockchain')

test('getLatestBlock success to returns Genesis block from empty chain', t => {
  const blockchain = new Blockchain()
  const genenisBlock = blockchain.chain[0]

  t.is(blockchain.getLastestBlock(), genesisBlock)
})

test('getLatestBlock success to returns lastest block from chain', t => {
  const blockchain = new Blockchain()
  const newBlock = new Block(1, genesisBlock.hash, '', { amount: 1 })

  blockchain.addBlock(newBlock)

  t.is(blockchain.getLastestBlock(), newBlock)
})
