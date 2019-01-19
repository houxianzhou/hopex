import axios from 'axios'
import { _, localSave } from '@utils'
import { Toast } from '@components'
import pathToRegexp from 'path-to-regexp'
import { stringify } from 'qs'
// import { message as Message } from 'antd'

axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.maxContentLength = 20000000

axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

let interval = null


export function request(url = '', options = {}) {

  const { method = 'get', formData = false, params, query, body, needLoop = false, needWatch = true, errHandler, ...rest } = options
  if (params) {
    const toPath = pathToRegexp.compile(url)
    url = toPath(params)
  }
  const transform = formData ? {
    transformRequest: [(data, headers) => {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
      data = stringify(data)
      return data
    }]
  } : {}
  const token = _.get(localSave.getUserInfo(), 'userToken')
  return axios({
    ...{
      headers: {
        ...(token ? { Authorization: token } : {})
      },
      method,
      params: query,
      data: body,
      url,
      baseURL: ''
    },
    ...transform,
    ...rest
  })
    .then((res) => {
      if (String(_.get(res, 'data.ret')) !== '0') {
        if(method !== 'head') console.log('接口ret不为0，判断为错误')
        return Promise.reject({ response: res })
      }
      return res
    })
    .catch((error) => {
      if (_.has(error, 'response.status')) {
        switch (error.response.status) {
          case 401:
            localSave.remove('userInfo')
            return Promise.reject(error)
          default:
        }
      }
      if (method === 'head') {
        // 网络状态检测
        return Promise.resolve(_.get(error, 'response.status'))
      }
      if (needWatch) {
        if (_.get(error, 'response.data.ret') === '100100'
          || _.get(error, 'response.data.errStr') === 'token expired') {
        } else {
          if (errHandler) {
            let result
            // 需要单独的错误处理器
            const err = _.get(error, 'response.data')
            result = err ? errHandler(err) : errHandler(error)
            return result
          } else {
            if (_.has(error, 'response.data.errMsg') || _.has(error, 'response.data.errStr')) {
              const message = _.get(error, 'response.data.errMsg') || _.get(error, 'response.data.errStr')
              Toast.tip(message)
            } else {
              if (method === 'get') {
                Toast.tip('数据获取失败')
              } else {
                Toast.tip('操作失败')
              }
            }
          }
        }
        console.log(url + '请求出错')
      }
      if (needLoop) {
        // 发生错误需要重新请求
        clearTimeout(interval)
        interval = setTimeout(() => {
          return new Promise((resolve) => {
            const result = request(url, options)
            resolve(result)
          })
        }, 2000)
      }
    })
}


