const Block = require('./Block')

const genesisBlock = new Block(0, '0', 1465154705, 'Genesis block', '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7')
const blockchain = [genesisBlock]
const getLatestBlock = () => blockchain[blockchain.length - 1]

const isValidChain = blockchainToValidate => {
  if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(genesisBlock) {
    return false
  }

  const tempBlocks = [blockchainToValidate[0]]

  for (const i = 1; i < blockchainToValidate.length; i++) {
    if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
      tempBlocks.push(blockchainToValidate[i])
    } else {
      return false
    }
  }

  return true
}

const mustReplaceChain = newBlocks => {
  if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
    console.log('Received blockchain is valid. Replacing current blockchain with received blockchain')
    blockchain = newBlocks

    return true
  } else {
    console.log('Received blockchain invalid')
    return false
  }
}

const addBlock = newBlock => {
  if (Block.isValidNewBlock(newBlock, getLatestBlock())) {
    blockchain.push(newBlock)
  }
}

const generateNextBlock = blockData => {
  const previousBlock = getLatestBlock()
  const nextIndex = previousBlock.index + 1
  // const nextTimestamp = new Date().getTime() / 1000
  const nextTimestamp = new Date().getTime()
  const nextHash = Block.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData)

  return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash)
}

module.exports = {
  addBlock,
  blockchain,
  generateNextBlock,
  getLatestBlock
}
