import { _ } from '@utils'
import { SOCKETURL } from '@constants'

class Ws {
  constructor(url) {
    this.ws = new window.ReconnectingWebSocket(url, null, { debug: true, reconnectInterval: 800 })
    this.onConnectLists = []
    this.onMessagesLists = []
    this.promiseFunsLists = []
    this.ws.onopen = () => {
      console.log(`${url}连接已开启.....`)
      this.onConnectLists.forEach(item => item())
    }
    this.ws.onmessage = (e) => {
      this.onMessagesLists.forEach(item => item(e))
      this.promiseFunsLists.forEach(([resolve, func], index) => {
        if (func(e)) {
          resolve(e)
          this.promiseFunsLists.splice(index, 1)
        }
      })
    }
    this.ws.onclose = function () {
      console.log(`${url}连接已关闭...`)
      if (this.onClose) this.onClose()
    }
    this.ws.onerror = (e) => {
      console.log(`${url}错误`, e)
    }
  }

  onConnect = (func) => {
    this.onConnectLists.push(func)
  }

  onMessage = (func) => {
    this.onMessagesLists.push(func)
  }

  sendJson = (json) => {
    this.ws.send(JSON.stringify(json))
  }

  sendJsonPromise = (json, func) => {
    return new Promise((resolve) => {
      this.sendJson(json)
      this.promiseFunsLists.push([resolve, func])
    })
  }
}

class Wss {
  constructor() {
    this.sockets = {}
  }

  getSocket = (name) => {
    const url = _.get(SOCKETURL, [name])
    if (url) {
      if (!_.get(this.sockets, [url])) {
        const ws = new Ws(url)
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
