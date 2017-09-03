import test from 'ava'

const Block = require('../../Block')
const Core = require('../../Core')

const index = 1
const previousHash = '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7'
const timestamp = 1602282150
const data = 'block 1'
const hash = 'daf5447901d9e4156619ac827eb1f6bb8744bad1dcf0e41780b2cfca66795f65'
const block = new Block(index, previousHash, timestamp, data, hash)

const invalidIndex = 4
const invalidPreviousHash = '116534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7'
const invalidTimestamp = 1602282150
const invalidData = 'block 2'
const invalidHash = 'aaf5447901d9e4156619ac827eb1f6bb8744bad1dcf0e41780b2cfca66795f65'
const invalidBlock = new Block(invalidIndex, invalidPreviousHash, invalidTimestamp, invalidData, invalidHash)

test('isValidChain success with Genesis block in blockchain', t => {
  const genesisBlock = Core.genesisBlock
  const blockchain = [genesisBlock]

  const isValid = Core.isValidChain(blockchain)

  t.true(isValid)
})

test('isValidChain success with valid block in blockchain', t => {
  const blockchain = Core.blockchain

  Core.addBlock(block)

  const isValid = Core.isValidChain(blockchain)

  t.true(isValid)
}, block)

test('isValidChain fails without blocks in blockchain', t => {
  const blockchain = []

  const isValid = Core.isValidChain(blockchain)

  t.false(isValid)
})

test('isValidChain fails without Genesis block in first position in blockchain', t => {
  const genesisBlock = Core.genesisBlock
  const blockchain = [block, genesisBlock]

  const isValid = Core.isValidChain(blockchain)

  t.false(isValid)
}, block)

test('isValidChain fails without valid block', t => {
  const genesisBlock = Core.genesisBlock
  const blockchain = [genesisBlock, block, invalidBlock]

  const isValid = Core.isValidChain(blockchain)

  t.false(isValid)
}, block, invalidBlock)
