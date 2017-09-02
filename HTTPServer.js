const express = require('express')
const bodyParser = require('body-parser')

const BlockchainAdministrator = require('./BlockchainAdministrator')
const Peer = require('./Peer')

module.exports = class HTTPServer {
  constructor (HTTP_PORT, sockets) {
    this.HTTP_PORT = HTTP_PORT
    this.app = express()
    this.app.use(bodyParser.json())

    this.app.get('/blocks', (req, res) => res.send(JSON.stringify(BlockchainAdministrator.blockchain)))

    this.app.post('/mine', (req, res) => {
      const newBlock = BlockchainAdministrator.generateNextBlock(req.body.data)

      BlockchainAdministrator.addBlock(newBlock)
      P2PServer.broadcast(BlockchainAdministrator.responseLatestMsg())
      console.log(`Block added: ${JSON.stringify(newBlock)}`)
      res.send()
    })

    this.app.get('/peers', (req, res) => {
      res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort))
    })

    this.app.post('/addPeer', (req, res) => {
      Peer.connectToPeers([req.body.peer])
      res.send()
    })
  }

  start () {
    this.app.listen(this.HTTP_PORT, () => console.log(`Listening http on port: ${this.HTTP_PORT}`))
  }
}
