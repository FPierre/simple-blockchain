const CryptoJS = require('crypto-js')

module.exports = class Block {
  constructor (index, previousHash, timestamp, data, hash) {
    this.index = index
    this.previousHash = previousHash.toString()
    this.timestamp = timestamp
    this.data = data
    this.hash = hash.toString()
  }

  static calculateHash (index, previousHash, timestamp, data) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
  }

  // OPTIMIZE: used only on Block.isValidNewBlock method. No need to static?
  static calculateHashForBlock (block) {
    return Block.calculateHash(block.index, block.previousHash, block.timestamp, block.data)
  }

  static isValidNewBlock (newBlock, previousBlock) {
    if (previousBlock.index + 1 !== newBlock.index) {
      console.log('Invalid index')
      return false
    } else if (previousBlock.hash !== newBlock.previousHash) {
      console.log('Invalid previousHash')
      return false
    } else if (Block.calculateHashForBlock(newBlock) !== newBlock.hash) {
      console.log(typeof (newBlock.hash) + ' ' + typeof Block.calculateHashForBlock(newBlock))
      console.log(`Invalid hash: ${Block.calculateHashForBlock(newBlock)} ${newBlock.hash}`)
      return false
    }

    return true
  }
}
