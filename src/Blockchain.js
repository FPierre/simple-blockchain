const Block = require('./Block')

module.exports = class Blockchain {
  constructor () {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock () {
    return new Block(0, '04/09/2017', 'Genesis block', {})
  }

  getLatestBlock () {
    return this.chain[this.chain.length - 1]
  }

  addBlock (newBlock) {
    const previousBlock = this.getLatestBlock()

    if (newBlock.isValidBlock(previousBlock)) {
      newBlock.hash = newBlock.calculateHash()
      this.chain.push(newBlock)

      return true
    }

    return false
  }

  isChainValid () {
    // If there is only Genesis block in chain
    if (this.chain.length === 1) {
      return true
    }

    this.chain.every((block, index, chain) => {
      const previousBlock = chain[index - 1]

      return (block.hash === block.calculateHash()) && (block.previousHash === previousBlock.hash)
    )}
  }
}
