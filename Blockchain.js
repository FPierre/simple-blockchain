const CryptoJS = require('crypto-js')

const Block = require('./Block')

module.exports = class Blockchain {
  constructor () {
    const genesisBlock = new Block(0, '0', 1504272150, 'genesis block', '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7')
    this.blockchain = [genesisBlock]
  }

  calculateHash (index, previousHash, timestamp, data) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
  }

  addBlock (newBlock) {
    if (isValidNewBlock(newBlock, getLatestBlock())) {
      this.blockchain.push(newBlock)
    }
  }

  getLatestBlock () {
    this.blockchain[this.blockchain.length - 1]
  }

  replaceChain (newBlocks) {
    if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
      console.log('Received blockchain is valid. Replacing current blockchain with received blockchain')
      this.blockchain = newBlocks
      broadcast(responseLatestMsg())
    } else {
      console.log('Received blockchain invalid')
    }
  }
}

const queryChainLengthMsg = () => ({'type': MessageType.QUERY_LATEST})
const queryAllMsg = () => ({'type': MessageType.QUERY_ALL})
const responseChainMsg = () =>({
  type: MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(blockchain)
})
const responseLatestMsg = () => ({
  type: MessageType.RESPONSE_BLOCKCHAIN,
  data: JSON.stringify([getLatestBlock()])
})

const write = (ws, message) => ws.send(JSON.stringify(message))
const broadcast = (message) => sockets.forEach(socket => write(socket, message))

connectToPeers(initialPeers)
initHttpServer()
initP2PServer()
