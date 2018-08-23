import { Server } from 'mock-socket'
import { _, moment } from '@utils'
import { SOCKETURL } from '@constants'

class MockServer {
  constructor(url, INTERVAL = 1000) {
    this.interval = null
    this.subScribes = []
    this.server = new Server(url)
    this.server.on('connection', socket => {
      clearTimeout(this.interval)
      this.socket = socket
      if (this.onConnection) {
        this.onConnection(socket)
      }
      socket.on('message', (e) => {
        if (this.onMessage) this.onMessage(e)
      })
      socket.on('close', (e) => {
        if (this.onClose) this.onClose()
      })

      this.interval = setInterval(() => {
        this.subScribes.forEach((item = {}) => {
          if (_.isFunction(item.func)) {
            item.func()
          }
        })
      }, INTERVAL)
    })
  }

  sendJson = (obj) => {
    if (this.socket) {
      this.socket.send(JSON.stringify(obj))
    }
  }

  subScribe = (obj) => {
    if (_.has(obj, 'name') && _.has(obj, 'func')) {
      _.remove(this.subScribes, item => item.name === obj.name)
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

