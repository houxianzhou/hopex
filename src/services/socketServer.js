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


// const mockServer2 = new MockServer(SOCKETURL.ws2)


// mockServer2.onConnection = () => {
//   setInterval(() => {
//     mockServer2.sendJson({
//       "price": _.random(1000, 10000),
//       "minPrice": _.random(1000, 10000),
//       "maxPrice": _.random(1000, 10000),
//       "chanId": 204,
//       "pair": "BTCUSD"
//     })
//   }, 1000)
// }


const mockServer1 = new MockServer(SOCKETURL.ws1)

mockServer1.onMessage = (e) => {
  const { head: { method }, param } = JSON.parse(e)
  if (method === 'kline.query') {
    mockServer1.sendJson(
      {
        "isTrusted": false,
        "data": {
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
            "records": [
              ["1530853200", "1", "1", "1", "1", "5", "5", "BTCUSD永续"],
              ["1530939600", "1", "1", "1", "1", "0", "0", "BTCUSD永续"],
              ["1531026000", "1", "1", "1", "1", "1", "1", "BTCUSD永续"],
              ["1531112400", "1", "2", "2", "1", "3561", "3562", "BTCUSD永续"],
              ["1531198800", "2", "2", "2", "2", "1", "2", "BTCUSD永续"],
              ["1531285200", "2", "2", "2", "2", "0", "0", "BTCUSD永续"],
              ["1531371600", "2", "2", "2", "2", "0", "0", "BTCUSD永续"],
              ["1531458000", "2", "200", "200", "1", "888279", "98595765", "BTCUSD永续"]
            ]
          },
          "errCode": "0",
          "errStr": "success",
          "ret": "0"
        }
      }
    )
  }
}
console.log(mockServer1)

