const WebSocket = require('ws')

const messagesTypes = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2
}

const queryAllMsg = () => ({ type: messagesTypes.QUERY_ALL })
const queryChainLengthMsg = () => ({ type: messagesTypes.QUERY_LATEST })

const responseChainMsg = () => ({
  type: messagesTypes.RESPONSE_BLOCKCHAIN,
  data: JSON.stringify(blockchain)
})

const write = (ws, message) => ws.send(JSON.stringify(message))

const connectToPeers = newPeers => {
  newPeers.forEach(peer => {
    const ws = new WebSocket(peer)

    ws.on('open', () => initConnection(ws))
    ws.on('error', () => {
      console.log('Connection failed')
    })
  })
}

const responseLatestMsg = () => ({
  type: messagesTypes.RESPONSE_BLOCKCHAIN,
  data: JSON.stringify([getLatestBlock()])
})

const initMessageHandler = ws => {
  ws.on('message', data => {
    const message = JSON.parse(data)
    console.log(`Received message ${JSON.stringify(message)}`)

    switch (message.type) {
      case messagesTypes.QUERY_LATEST:
        write(ws, responseLatestMsg())
        break
      case messagesTypes.QUERY_ALL:
        write(ws, responseChainMsg())
        break
      case messagesTypes.RESPONSE_BLOCKCHAIN:
        handleBlockchainResponse(message)
        break
    }
  })
}

const handleBlockchainResponse = message => {
  const receivedBlocks = JSON.parse(message.data).sort((b1, b2) => (b1.index - b2.index))
  const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1]
  const latestBlockHeld = getLatestBlock()

  if (latestBlockReceived.index > latestBlockHeld.index) {
    console.log(`Blockchain possibly behind. We got: ${latestBlockHeld.index} Peer got: ${latestBlockReceived.index}`)

    if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
      console.log('We can append the received block to our chain')
      blockchain.push(latestBlockReceived)
      P2PServer.broadcast(responseLatestMsg())
    } else if (receivedBlocks.length === 1) {
      console.log('We have to query the chain from our peer')
      P2PServer.broadcast(queryAllMsg())
    } else {
      console.log('Received blockchain is longer than current blockchain')
      if (mustReplaceChain(receivedBlocks)) {
        P2PServer.broadcast(responseLatestMsg())
      }
    }
  } else {
    console.log('Received blockchain is not longer than received blockchain. Do nothing')
  }
}

const initErrorHandler = ws => {
  const closeConnection = ws => {
    console.log(`Connection failed to peer: ${ws.url}`)
    sockets.splice(sockets.indexOf(ws), 1)
  }

  ws.on('close', () => closeConnection(ws))
  ws.on('error', () => closeConnection(ws))
}

const initConnection = ws => {
  sockets.push(ws)
  initMessageHandler(ws)
  initErrorHandler(ws)
  write(ws, queryChainLengthMsg())
}

module.exports = {
  connectToPeers,
  initConnection,
  responseLatestMsg
}
