import { _ } from '@utils'

class Ws {
  constructor(url) {
    this.ws = new window.ReconnectingWebSocket(url, null, { debug: true, reconnectInterval: 800 })
    this.ws.onopen = () => {
      console.log(`${url}连接已开启.....`)
      if (this.onConnect) this.onConnect()
    }
    this.ws.onmessage = (e) => {
      if (this.onMessage) this.onMessage(e)
    }
    this.ws.onclose = function () {
      console.log(`${url}连接已关闭...`)
      if (this.onClose) this.onClose()
    }
    this.ws.onerror = (e) => {
      console.log(`${url}错误`, e)
    }
  }

  sendJson = (json) => {
    this.ws.send(JSON.stringify(json))
  }
}

const sockets = {}

const getSocket = (url) => {
  if (!_.get(sockets, [url])) {
    const ws = new Ws(url)
    sockets[url] = ws
    return ws
  }
  return sockets[url]
}

export default getSocket
