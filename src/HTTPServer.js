const express = require('express')
const bodyParser = require('body-parser')

const Core = require('./Core')
const Peer = require('./Peer')

module.exports = class HTTPServer {
  constructor (HTTP_PORT, sockets) {
    this.HTTP_PORT = HTTP_PORT
    this.app = express()
    this.app.use(bodyParser.json())

    this.app.get('/blocks', this.getBlocks.bind(this))
    this.app.post('/mine', this.postMine.bind(this))
    this.app.get('/peers', this.getPeers.bind(this))
    this.app.post('/peers', this.postPeers.bind(this))
  }

  start () {
    this.app.listen(this.HTTP_PORT, () => console.log(`Listening http on port: ${this.HTTP_PORT}`))
  }

  getBlocks (req, res) {
    res.send(JSON.stringify(Core.blockchain))
  }

  postMine (req, res) {
    const newBlock = Core.generateNextBlock(req.body.data)

    Core.addBlock(newBlock)
    P2PServer.broadcast(Core.responseLatestMsg())

    console.log(`Block added: ${JSON.stringify(newBlock)}`)
    res.send()
  }

  getPeers (req, res) {
    res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort))
  }

  postPeers (req, res) {
    Peer.connectToPeers([req.body.peer])
    res.send()
  }
}
