import { Server } from 'mock-socket'
import { _, moment } from '@utils'
import { SOCKETURL } from '@constants'

const INTERVAL = 1000

class MockServer {
  constructor(url, interval) {
    this.interval = interval || INTERVAL
    this.subScribes = []
    this.server = new Server(url)
    this.server.on('connection', socket => {
      this.socket = socket
      if (this.onConnection) {
        this.onConnection(socket)
      }
      socket.on('message', (e) => {
        if (this.onMessage) this.onMessage(e)
      })
      socket.on('close', (e) => {
        console.log(e,'---------------------')
        if (this.onClose) this.onClose()
      })

      setInterval(() => {
        this.subScribes.forEach((item = {}) => {
          if (_.isFunction(item.func)) {
            item.func()
          }
        })
      }, 2000)
    })
  }

  sendJson = (obj) => {
    if (this.socket) {
      this.socket.send(JSON.stringify(obj))
    }
  }

  subScribe = (obj) => {
    if (_.has(obj, 'name') && _.has(obj, 'func')) {
      this.subScribes.push(obj)
    } else {
      console.log('订阅的对象必须包含name属性和func属性')
    }
  }

  clearStacks = () => {
    this.subScribes = []
  }
}


const mockServer2 = new MockServer(SOCKETURL.ws)
mockServer2.onMessage = (e) => {
  if (!e) return
  const message = JSON.parse(e)
  const { head: { method } } = message
  if (method === 'price.subscribe') {
    mockServer2.subScribe({
      name: 'price.subscribe',
      func: () => {
        mockServer2.sendJson(
          {
            "method": "price.update",
            "timestamp": 1534853820063,
            "data": {
              "marketName": "BTCUSDT永续",
              "lastPrice": _.random(1, 100) + '',
              "lastPriceToUSD": `$${_.random(100, 200)}`,
              "direction": -1,
              "changePercent24": `-${_.random(200, 300)}%`,
              "marketPrice": `${_.random(300, 400)}`,
              "fairPrice": `${_.random(400, 500)}`,
              "price24Max": `${_.random(500, 600)}`,
              "price24Min": `${_.random(600, 700)}`,
              "amount24h": `${_.random(700, 800)}BTC`,
            }
          }
        )
      }
    })
  }
}

