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
      socket.on('close', () => {
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
}

let times = 0
const mockServer1 = new MockServer(SOCKETURL.ws1)
mockServer1.onMessage = (e) => {
  const message = JSON.parse(e)
  // console.log(message, '-------------服务端响应订阅')
  const { head: { method } = {} } = message
  switch (method) {
    case 'kline.query': {
      const { param: { startTime, endTime } = {} } = message
      // console.log(moment.format(startTime), '------', moment.format(endTime))
      const periods = moment.getdays(startTime * 1000, endTime * 1000)
      mockServer1.sendJson(
        {
          "isTrusted": false,
          "head": {
            "method": "kline.query",
            "msgType": "response",
            "packType": "1",
            "lang": "cn",
            "version": "1.0.0",
            "timestamps": "1531480173066302",
            "serialNumber": "57"
          },
          "data": {
            "records": times++ > 2 ? [] : periods.map(item => {
              const h = 160 + _.random(30, 40)
              const o = h - _.random(10, 20)
              const c = o - _.random(10, 30)
              const l = c - _.random(10, 20)
              const v = _.random(100, 3000)
              return [item / 1000, o, c, h, l, v, 6, 'BTCUSD永续']
            })
          },
          "errCode": "0",
          "errStr": "success",
          "ret": "0"
        }
      )
    }
      break
    default:
  }
}


const mockServer2 = new MockServer(SOCKETURL.ws2)
mockServer2.onMessage = (e) => {
  const message = JSON.parse(e)
  const { channel } = message
  switch (channel) {
    case 'market': {
      mockServer2.subScribe({
        name: 'importantPrice',
        func: () => {
          mockServer2.sendJson({
            "price": _.random(1000, 10000),
            "minPrice": _.random(1000, 10000),
            "maxPrice": _.random(1000, 10000),
            "chanId": 204,
            "pair": "BTCUSD"
          })
        }
      })
    }
      break
    default:
  }
}

