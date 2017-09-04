const SHA256 = require('crypto-js/sha256')

module.exports = class Block {
  constructor (index, previousHash, timestamp, data) {
    this.index = index
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.data = data
    this.hash = this.calculateHash()
  }

  calculateHash () {
    console.log(SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString())
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
  }

  isBlockValid (previousBlock) {
    return (this.index === previousBlock.index + 1) &&
           (this.previousHash === previousBlock.hash) &&
           (this.hash === this.calculateHash())
  }
}
