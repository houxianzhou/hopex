import axios from 'axios'
import { _, localSave } from '@utils'
import pathToRegexp from 'path-to-regexp'
import { stringify } from 'qs'
import { message as Message } from 'antd'

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
  const { method = 'get', formData = false, params, query, body, needLoop = false, needWatch = true, ...rest } = options
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
      return res
    })
    .catch((error) => {
      if (_.has(error, 'response.status')) {
        switch (error.response.status) {
          case 401:
            return new Promise((resolve) => {

            })
          default:
        }
      }


      if (needWatch) {
        if (_.has(error, 'response.data.errMsg')||_.has(error, 'response.data.errStr')) {
          Message.error(_.get(error, 'response.data.errMsg')||_.get(error, 'response.data.errStr'))
        } else {
          if (method === 'get') {
            Message.error('数据获取失败')
          } else {
            Message.error('操作失败')
          }
        }
        console.log(url + '请求出错')
      }
      if (needLoop) {
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


