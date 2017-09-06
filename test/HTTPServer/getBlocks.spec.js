import test from 'ava'

const HTTPServer = require('../../src/HTTPServer')

test.beforeEach(async t => {
  // const HTTP_PORT = process.env.HTTP_PORT || 3001
  // const p2pServerSockets = []
  // const httpServer = new HTTPServer(HTTP_PORT, p2pServerSockets)
  //
  // await httpServer.start()
  //
  // t.context.server = httpServer
  t.pass()
})

test.serial('getBlocks', async t => {
  // const { server } = t.context
  //
  // const res = await request(server).get('/blocks')
  //
  // t.is(res.status, 200)
  // t.is(res.body.name, `test`)
  t.pass()
})

// [{"index":0,"previousHash":"0","timestamp":1465154705,"data":"Genesis block","hash":"816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"}]
