const SHA256 = require('crypto-js/sha256')

const isPositive = require('./Number')
const isValidDate = require('./String')

// throwIfMissingParam () => throw new Error('Missing parameter')

module.exports = class Block {
  // constructor (index = throwIfMissingParam(), previousHash, timestamp, data) {
  constructor (index, previousHash, timestamp, data) {
    this.index = index
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.data = data
    this.hash = this.calculateHash()
  }

  calculateHash () {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
  }

  isValid (previousBlock = null) {
    return !!(this.index && (this.index).isPositive() &&
             this.timestamp && (this.timestamp).isValidDate() &&
             this.previousHash && this.data &&
             (this.index === previousBlock.index + 1) &&
             (this.previousHash === previousBlock.hash) &&
             (this.hash === this.calculateHash()))
  }
}
