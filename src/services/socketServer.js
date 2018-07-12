import { Server } from 'mock-socket'
import { _ } from '@utils'

const INTERVAL = 1000

class MockServer {
  constructor(url, interval) {
    this.interval = interval || INTERVAL
    this.server = new Server(url)
    this.server.on('connection', socket => {
      socket.on('message', (e) => {
        if (this.onMessge) this.onMessge(e)
      })
      socket.on('close', () => {
        if (this.onClose) this.onClose()
      })
      this.sendJson = (obj) => {
        socket.send(JSON.stringify(obj))
      }
      this.sendIntervalJson = (obj) => {
        setInterval(() => {
          this.sendJson(obj)
        }, INTERVAL)
      }
    })
  }
}


const mockServer1 = new MockServer('ws://192.168.70.131/ws')
const mockServer2 = new Server('ws://localhost:9000/ws')

setInterval(() => {
  mockServer1.sendJson(
    {
      "price": _.random(1000, 10000),
      "minPrice": _.random(1000, 10000),
      "maxPrice": _.random(1000, 10000),
      "chanId": 204,
      "pair": "BTCUSD"
    }
  )
}, INTERVAL)

