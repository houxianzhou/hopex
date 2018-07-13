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
        if (this.onMessage) this.onMessage(e)
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

const mockServer2 = new MockServer(SOCKETURL.ws2)
const mockServer1 = new MockServer(SOCKETURL.ws1)

mockServer2.onConnection = () => {
  setInterval(() => {
    mockServer2.sendJson({
      "price": _.random(1000, 10000),
      "minPrice": _.random(1000, 10000),
      "maxPrice": _.random(1000, 10000),
      "chanId": 204,
      "pair": "BTCUSD"
    })
  }, 1000)
}

mockServer1.onConnection = () => {

}
mockServer1.onMessage = (e) => {
  const { head: { method }, param } = JSON.parse(e)
  if (method === 'kline.query') {
    mockServer1.sendJson({
      "head": {
        "method": "kline.query",
        "msgType": "response",
        "packType": "1",
        "lang": "cn",
        "version": "1.0.0",
        "timestamps": "1530075450",
        "serialNumber": "57"
      },
      "data": {
        "records": [
          [
            "1529424000",//时间戳
            "80",//开市值
            "80",//闭市值
            "80",//最高价
            "80",//最低价
            "2723",//成交量
            "217840",//成交额
            "BTCBCH"//合约名称
          ]
        ]
      },
      "errCode": "0",
      "errStr": "success",
      "ret": "0"
    })
  }
}

