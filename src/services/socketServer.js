import { Server } from 'mock-socket'
import { _ } from '@utils'
import { SOCKETURL } from '@constants'

const INTERVAL = 1000

class MockServer {
  constructor(url, interval) {
    this.interval = interval || INTERVAL
    this.server = new Server(url)
    this.server.on('connection', socket => {
      this.socket = socket
      if (this.onConnection) {
        this.onConnection(socket)
      }
      socket.on('message', (e) => {
        if (this.onMessge) this.onMessge(e)
      })
      socket.on('close', () => {
        if (this.onClose) this.onClose()
      })
    })
  }

  sendJson = (obj) => {
    if (this.socket) {
      this.socket.send(JSON.stringify(obj))
    }
  }
}

const mockServer1 = new MockServer(SOCKETURL.kline)
const mockServer2 = new Server(SOCKETURL.test)

mockServer1.onConnection = () => {
  setInterval(() => {
    mockServer1.sendJson({
      "price": _.random(1000, 10000),
      "minPrice": _.random(1000, 10000),
      "maxPrice": _.random(1000, 10000),
      "chanId": 204,
      "pair": "BTCUSD"
    })
  }, 1000)
}

