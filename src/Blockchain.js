const Block = require('./Block')

module.exports = class Blockchain {
  constructor () {
    this.genesisBlock = this.createGenesisBlock()
    this.chain = [this.genesisBlock]
  }

  createGenesisBlock () {
    return new Block(0, '', '04/09/2017', {})
  }

  getLatestBlock () {
    return this.chain[this.chain.length - 1]
  }

  addBlock (newBlock) {
    const previousBlock = this.getLatestBlock()

    if (newBlock.isValid(previousBlock)) {
      newBlock.hash = newBlock.calculateHash()
      this.chain.push(newBlock)
    }
  }

  isValidChain () {
    // console.log('isValidChain')

    // Empty blockchain
    if (!this.chain.length) {
      return false
    }

    // Blockchain contains Genesis block only
    // Following comparison is impossible: this.chain === [this.genesisBlock]
    if (this.chain.length === 1 && this.chain[0] === this.genesisBlock) {
      return true
    }

    return this.chain.every((block, index, chain) => {
      if (block === this.genesisBlock) {
        return true
      }

      const previousBlock = chain[index - 1]

      if (previousBlock) {
        return block.isValid(previousBlock)
      }
    })
  }
}
