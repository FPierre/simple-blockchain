const WebSocket = require('ws')

module.exports = class P2PServer {
  constructor (P2P_PORT) {
    this.P2P_PORT = P2P_PORT
    this.sockets = []

    console.log(`Listening websocket p2p port on: ${this.P2P_PORT}`)
  }

  start () {
    const server = new WebSocket.Server({ port: this.P2P_PORT })
    server.on('connection', ws => Peer.initConnection(ws))
  }

  static broadcast (msg) {
    this.sockets.forEach(socket => socket.send(JSON.stringify(msg)))
  }
}
