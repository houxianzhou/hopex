import { _ } from '@utils'
import { SOCKETURL } from '@constants'

class Ws {
  constructor(url) {
    this.ws = new WebSocket(url) // window.ReconnectingWebSocket(url, null, { debug: true, reconnectInterval: 0 })
    this.onConnectLists = []
    this.onMessagesLists = []
    this.promiseFunsLists = []
    this.ws.onopen = () => {
      console.log(`${url}连接开启.....`)
      this.onConnectLists.forEach(item => item())
    }
    this.ws.onmessage = (e) => {
      this.onMessagesLists.forEach(item => item(e))
      this.promiseFunsLists.forEach(([resolve, func], index) => {
        const result = func(e)
        if (!!result) {
          resolve(result)
          this.promiseFunsLists.splice(index, 1)
        }
      })
    }
    this.ws.onclose = (e) => {
      console.log(`${url}连接关闭...`, e)
      this.reConnect(e)
    }
    this.ws.onerror = (e) => {
      console.log(`${url}连接错误`, e)
      // 连接错误自动会促发连接关闭，这里不需要再次连接
    }
  }

  reConnect = (e) => {
    if (e.type === 'close' || e.type === 'error') {
      if (_.get(e, 'reason') === 'selfClose') return console.log('主动断开不再重新连接')
      if (this.suddenDead) this.suddenDead()
    }
  }

  onConnect = (func) => {
    this.onConnectLists.push(func)
  }

  onMessage = (func) => {
    this.onMessagesLists.push(func)
  }

  close = () => {
    this.ws.close(4000, 'selfClose')
  }

  sendJson = (json) => {
    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(json))
      return true
    } else {
      console.log(this.ws.readyState, '当前websocket连接状态不正常')
    }
  }

  sendJsonPromise = (json, func) => {
    return new Promise((resolve, reject) => {
      if (this.sendJson(json)) {
        this.promiseFunsLists.push([resolve, func])
      } else {
        reject('sendJson方法遇到异常')
      }
    })
  }
}

class Wss {
  constructor(reconnectInterval = 1000) {
    this.sockets = {}
    this.reconnectInterval = reconnectInterval
  }

  getSocket = (name) => {
    const url = _.get(SOCKETURL, [name])
    if (url) {
      if (!_.get(this.sockets, [url])) {
        const ws = new Ws(url)
        ws.suddenDead = () => {
          delete this.sockets[url]
          setTimeout(() => {
            this.getSocket(name)
          }, this.reconnectInterval)
        }
        this.sockets[url] = ws
        return ws
      }
      return this.sockets[url]
    } else {
      console.log('socket路径未找到通常由于name错误')
    }
  }
}


export default new Wss()
