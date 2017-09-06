import test from 'ava'

const Blockchain = require('../../src/Blockchain')

test('success to return valid Genesis block', t => {
  const blockchain = new Blockchain()
  const expectedHash = 'e0c17e9c31dbbc2ac1baad68fa5339a4265f2cd493e42c0000c82dddb741944f'

  blockchain.createGenesisBlock()
  const actualHash = blockchain.genesisBlock.hash

  // t.pass()
  t.is(expectedHash, actualHash)
})
