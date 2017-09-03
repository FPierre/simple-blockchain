import test from 'ava'

const Core = require('../../src/Core')

// It is not possible to validate newBlock with hash comparaison:
// timestamp is created in Core.generateNextBlock, hash can't be found outside
test('generateNextBlock success', t => {
  const newBlockData = 'block 1'
  const expectedPreviousHash = Core.genesisBlock.hash

  const newBlock = Core.generateNextBlock(newBlockData)
  const actualPreviousHash = newBlock.previousHash

  t.is(expectedPreviousHash, actualPreviousHash)
})
