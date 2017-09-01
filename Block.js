module.exports = class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index
    this.previousHash = previousHash.toString()
    this.timestamp = timestamp
    this.data = data
    this.hash = hash.toString()
  }

  static generateNextBlock (blockData) {
    const previousBlock = getLatestBlock()
    const previousHash = previousBlock.hash

    const nextIndex = previousBlock.index + 1
    const nextTimestamp = new Date().getTime()
    const nextHash = calculateHash(nextIndex, previousBlock.hashe, nextTimestamp, blockData)

    return new Block(nextIndex, previousHash, nextTimestamp, blockData, nextHash)
  }

  static isValidNewBlock (newBlock, previousBlock) {
    if (previousBlock.index + 1 !== newBlock.index) {
      console.log('invalid index')
      return false
    } else if (previousBlock.hash !== newBlock.previousHash) {
      console.log('invalid previoushash')
      return false
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
      console.log(`invalid hash: ${calculateHashForBlock(newBlock)} ${newBlock.hash}`)
      return false
    }

    return true
  }
}
