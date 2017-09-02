import test from 'ava'

const Block = require('../Block')

const index = 1
const previousHash = '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7'
const timestamp = 1602282150
const data = 'block 1'
const hash = 'daf5447901d9e4156619ac827eb1f6bb8744bad1dcf0e41780b2cfca66795f65'
const block = new Block(index, previousHash, timestamp, data, hash)

test('static method calculateHash', t => {
  const expectedHash = 'daf5447901d9e4156619ac827eb1f6bb8744bad1dcf0e41780b2cfca66795f65'
  const actualHash = Block.calculateHash(index, previousHash, timestamp, data)

  t.is(expectedHash, actualHash)
}, index, previousHash, timestamp, data)

test('static method calculateHashForBlock', t => {
  const expectedHash = hash
  const actualHash = Block.calculateHashForBlock(block)

  t.is(expectedHash, actualHash)
}, hash, block)

test('static method isValidNewBlock', t => {
  const index = 2
  const previousHash = block.hash
  const timestamp = 1504362623307
  const data = 'block 2'
  const hash = '24a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  const newBlock = new Block(index, previousHash, timestamp, data, hash)

  const isValid = Block.isValidNewBlock(newBlock, block)

  t.true(isValid)
}, block)

test('static method isValidNewBlock fails without right index', t => {
  const index = 3
  const previousHash = block.hash
  const timestamp = 1504362623307
  const data = 'block 2'
  const hash = '24a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  const newBlock = new Block(index, previousHash, timestamp, data, hash)

  const isValid = Block.isValidNewBlock(newBlock, block)

  t.false(isValid)
}, block)

test('static method isValidNewBlock fail without right previous hash', t => {
  const index = 2
  const previousHash = '14a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  const timestamp = 1504362623307
  const data = 'block 2'
  const hash = '24a6e8beb7d3ed921c383b4dce36834b4ee2dd19d6f7e58ba945c4e2fadccb22'
  const newBlock = new Block(index, previousHash, timestamp, data, hash)

  const isValid = Block.isValidNewBlock(newBlock, block)

  t.false(isValid)
}, block)
