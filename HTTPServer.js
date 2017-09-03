const express = require('express')
const bodyParser = require('body-parser')

const Core = require('./Core')
const Peer = require('./Peer')

module.exports = class HTTPServer {
  constructor (HTTP_PORT, sockets) {
    this.HTTP_PORT = HTTP_PORT
    this.app = express()
    this.app.use(bodyParser.json())

    this.app.get('/blocks', this.getBlocks)
    this.app.post('/mine', this.postMine)
    this.app.get('/peers', this.getPeers)
    this.app.post('/peers', this.postPeers)
  }

  start () {
    this.app.listen(this.HTTP_PORT, () => console.log(`Listening http on port: ${this.HTTP_PORT}`))
  }

  getBlocks (req, res) {
    this.app.get('/blocks', (req, res) => {
      res.send(JSON.stringify(Core.blockchain))
    })
  }

  postMine (req, res) {
    this.app.post('/mine', (req, res) => {
      const newBlock = Core.generateNextBlock(req.body.data)

      Core.addBlock(newBlock)
      P2PServer.broadcast(Core.responseLatestMsg())

      console.log(`Block added: ${JSON.stringify(newBlock)}`)
      res.send()
    })
  }

  getPeers (req, res) {
    this.app.get('/peers', (req, res) => {
      res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort))
    })
  }

  postPeers (req, res) {
    this.app.post('/peers', (req, res) => {
      Peer.connectToPeers([req.body.peer])
      res.send()
    })
  }
}
