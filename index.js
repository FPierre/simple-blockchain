const Blockchain = require('./Blockchain')
const Server = require('./Server')

const HTTPPort = process.env.HTTP_PORT || 3001
const P2PPort = process.env.P2P_PORT || 6001
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : []

const blockchain = new Blockchain()
const server = new Server(HTTPPort, P2PPort, blockchain)

server.start()
