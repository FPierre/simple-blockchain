const express = require('express')
const bodyParser = require('body-parser')
const webSocket = require('ws')

const Block = require('./Block')

module.exports = class Server {
  constructor (HTTPPort, P2PPort, blockchain) {
    this.app = express()
    this.app.use(bodyParser.json())

    this.sockets = []
    this.HTTPPort = HTTPPort
    this.P2PPort = P2PPort
    this.blockchain = blockchain
  }

  broadcast (message) {
    sockets.forEach(socket => write(socket, message))
  }

  initP2PServer () {
    const server = new WebSocket.Server({ port: this.P2PPort })
    server.on('connection', ws => this.initConnection(ws))

    console.log(`listening websocket p2p port on: ${this.P2PPort}`)
  }

  initConnection (ws) {
    this.sockets.push(ws)
    this.initMessageHandler(ws)
    initErrorHandler(ws)
    write(ws, queryChainLengthMsg())
  }

  initMessageHandler (ws) {
    ws.on('message', (data) => {
      const message = JSON.parse(data)
      console.log('Received message' + JSON.stringify(message))

      switch (message.type) {
        case MessageType.QUERY_LATEST:
          write(ws, responseLatestMsg())
          break
        case MessageType.QUERY_ALL:
          write(ws, responseChainMsg())
          break
        case MessageType.RESPONSE_BLOCKCHAIN:
          handleBlockchainResponse(message)
          break
      }
    })
  }

  initErrorHandler (ws) {
    const closeConnection (ws) {
      console.log(`connection failed to peer: ${ws.url}`)
      this.sockets.splice(this.sockets.indexOf(ws), 1)
    }

    ws.on('close', () => closeConnection(ws))
    ws.on('error', () => closeConnection(ws))
  }

  connectToPeers (newPeers) {
    newPeers.forEach((peer) => {
      const ws = new webSocket(peer)

      ws.on('open', () => this.initConnection(ws))

      ws.on('error', () => {
        console.log('connection failed')
      })
    })
  }

  handleBlockchainResponse (message) {
    const receivedBlocks = JSON.parse(message.data).sort((b1, b2) => (b1.index - b2.index))
    const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1]
    const latestBlockHeld = getLatestBlock()

    if (latestBlockReceived.index > latestBlockHeld.index) {
      console.log('blockchain possibly behind. We got: ' + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);

      if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
        console.log("We can append the received block to our chain");

        blockchain.push(latestBlockReceived);
        broadcast(responseLatestMsg());
      } else if (receivedBlocks.length === 1) {
        console.log("We have to query the chain from our peer");

        broadcast(queryAllMsg());
      } else {
        console.log("Received blockchain is longer than current blockchain");

        replaceChain(receivedBlocks);
      }
    } else {
      console.log('received blockchain is not longer than received blockchain. Do nothing');
    }
  }

  initHTTPServer () {
    this.app.get('/blocks', (req, res) => res.send(JSON.stringify(this.blockchain.blockchain)))

    this.app.post('/mineBlock', (req, res) => {
      const newBlock = Block.generateNextBlock(req.body.data)

      addBlock(newBlock)
      broadcast(responseLatestMsg())
      console.log('block added: ' + JSON.stringify(newBlock))

      res.send()
    })

    this.app.get('/peers', (req, res) => {
      res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort))
    })

    this.app.post('/addPeer', (req, res) => {
      connectToPeers([req.body.peer])
      res.send()
    })
  }

  start () {
    this.initHTTPServer()
    this.app.listen(this.HTTPPort, () => console.log(`Listening http on port: ${this.HTTPPort}`))
  }
}
