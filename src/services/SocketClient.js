import { _, formatJson, getRes } from '@utils'
import { SOCKETURL } from '@constants'

class Ws {
  constructor(url) {
    this.ws = new WebSocket(url)
    this.onClosePromise = null
    this.onConnectPromiseLists = []
    this.sendJsonPromiseLists = []
    this.listeners = []
    this.ws.onopen = () => {
      console.log(`${url}连接开启.....`)
      this.onConnectPromiseLists.forEach((resolve) => {
        resolve()
      })
      this.onConnectPromiseLists = []
      if (_.keys(this.onConnectPromiseLists).length) {
        console.error('Ws设计错误,onConnectPromiseLists有剩余的为执行完')
      }
    }
    this.ws.onmessage = (e) => {
      if (e && e.data) {
        const res = formatJson(e.data)
        this.listeners.forEach(item => item.subscribe && item.subscribe(e, res))
        this.sendJsonPromiseLists.forEach(([resolve, func], index) => {
          const result = func(e)
          if (!!result) {
            resolve(result)
            this.sendJsonPromiseLists.splice(index, 1)
          }
        })
      }
    }
    this.ws.onclose = (e) => {
      console.log(`${url}连接关闭...`, e)
      if (this.onClosePromise) {
        this.onClosePromise(true)
        this.onClosePromise = null
      }
      this.repeatConnect(e)
    }
    this.ws.onerror = (e) => {
      console.log(`${url}连接错误`, e)
      // 连接错误自动会促发连接关闭，这里不需要再次连接
    }
  }

  isReadyState = () => {
    return this.ws.readyState === 1
  }

  repeatConnect = (e) => {
    if (e.type === 'close' || e.type === 'error') {
      if (_.get(e, 'reason') === 'selfClose') return console.log('主动断开不再重新连接')
      if (this.suddenDead) this.suddenDead()
    }
  }

  onConnectPromise = () => {
    return new Promise((resolve) => {
      if (this.isReadyState()) {
        return resolve()
      } else {
        this.onConnectPromiseLists.push(resolve)
      }
    })
  }

  listen = (obj = {}) => {
    if (_.has(obj, 'name') && _.has(obj, 'subscribe') && _.has(obj, 'unsubscribe') && _.has(obj, 'restart')) {
      console.log(obj.name,'name')
      _.remove(this.listeners, item => {
        console.log(item.name,obj.name,'name')
        return item.name === obj.name
      })
      this.listeners.push(obj)
    } else {
      console.log('取消订阅的函数必须包含name属性、subscribe属性、unsubscribe属性、restart属性')
    }
  }

  close = () => {
    this.ws.close(4000, 'selfClose')
  }

  closePromise = () => {
    return new Promise((resolve) => {
      this.close()
      this.onClosePromise = resolve
    })
  }

  sendJson = (json) => {
    if (this.isReadyState()) {
      this.ws.send(JSON.stringify(json))
      return true
    } else {
      console.log(this.ws.readyState, '当前websocket连接状态不正常')
    }
  }

  sendJsonPromise = (json, func) => {
    if (_.isFunction(func)) {
      return new Promise((resolve, reject) => {
        if (this.sendJson(json)) {
          this.sendJsonPromiseLists.push([resolve, func])
        } else {
          reject('sendJson方法遇到异常')
        }
      })
    } else {
      console.log('用来在message中验证结果正确性的判断方法必不可少')
    }
  }
}

class Wss {
  constructor(reconnectInterval = 1000) {
    this.sockets = {}
    this.interval = null
    this.reconnectInterval = reconnectInterval
  }

  getSocket = (name) => {
    if (_.keys(this.sockets).length > 2) {
      console.error('wss设计错误,长度超过了2')
    }
    const url = _.get(SOCKETURL, [name])
    if (url) {
      if (!_.get(this.sockets, [url])) {
        const ws = new Ws(url)
        ws.suddenDead = () => {
          delete this.sockets[url]
          clearTimeout(this.interval)
          this.interval = setTimeout(() => {
            this.getSocket(name)
            ws.listeners.forEach(item => item.restart && item.restart())
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

  closeAll = (isForce) => {
    if (isForce) {
      const promiseAll = _.values(this.sockets)
      return new Promise((resolve) => {
        let i = 0
        promiseAll.forEach((item = {}) => item.closePromise().then(
          (res) => {
            if (res) {
              i++
              if (i === promiseAll.length) {
                this.sockets = {}
                return resolve(true)
              }
            }
          }
        ).catch(error => console.log('断开连接失败', error)))
      })
    } else {
      let i = 0
      const promiseAll = []
      return new Promise((resolve, reject) => {
        _.values(this.sockets).forEach((item = {}) => item.listeners.forEach((item) => {
          if (item.unsubscribe) {
            promiseAll.push(item.unsubscribe)
          }
        }))
        if (promiseAll.length) {
          promiseAll.forEach(item => {
            const result = item()
            if (!result || !result.then) {
              reject('发现某些unsubscribe不是promise,会导致无法判断所有的socket是否取消订阅')
            } else {
              result.then(() => {
                i++
                if (i === promiseAll.length) {
                  resolve()
                }
              })
            }
          })
        } else {
          resolve()
        }
      })
    }
  }
}


export default new Wss()
