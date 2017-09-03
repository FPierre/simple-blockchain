const Peer = require('./Peer')
const P2PServer = require('./P2PServer')
const HTTPServer = require('./HTTPServer')

const INITIAL_PEERS = process.env.PEERS ? process.env.PEERS.split(',') : []
const HTTP_PORT = process.env.HTTP_PORT || 3001
const P2P_PORT = process.env.P2P_PORT || 6001

Peer.connectToPeers(INITIAL_PEERS)
const p2pServer = new P2PServer(P2P_PORT)
const httpServer = new HTTPServer(HTTP_PORT, p2pServer.sockets)

p2pServer.start()
httpServer.start()
