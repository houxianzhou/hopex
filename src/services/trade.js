import { request, asyncPayload } from '@utils'
import { API } from "@constants"

let { MOCKIP, USERIP, USERIP2, UserIp3, UserIp4 } = API
const MODE = 'mock1'

// mock数据
if (MODE === 'mock') {
  UserIp3 = `/mock${UserIp3}`
  UserIp4 = `/mock${UserIp4}`
  require('./socketServer')
}

// 最新成交列表
export async function getLatestRecord(payload) {
  return request(`${UserIp3}/market.deals`, {
    method: 'post',
    body: payload,
    needLoop: true,
    needWatch: false
  })
}

// 委托列表
export async function getEnsureRecord(payload) {
  return request(`${UserIp3}/market.active_delegate`, {
    method: 'post',
    body: payload,
    needLoop: true,
    needWatch: false
  })
}

// 查询用户钱包里面所有的结算货币(相关属性)
export async function getPurseAssetList(payload) {
  return request(`${MODE}`, {
    method: 'post',
    body: payload
  })
}

// 获取所有的合约列表
export async function getAllMarkets(payload) {
  return request(`${UserIp3}/market.list`, {
    method: 'post',
    body: payload
  })
}

// 获取所有的个人持仓列表
export async function getPosition(payload) {
  return request(`${UserIp4}/user.position`, {
    method: 'post',
    body: payload
  })
}

// 获取所有的个人合约列表
export async function getPersonalEnsure(payload) {
  return request(`${UserIp4}/order.user_active_delegate`, {
    method: 'post',
    body: payload
  })
}

// 撤单
export async function doCancelPersonEnsure(payload) {
  return request(`${UserIp4}/order.cancel`, {
    method: 'post',
    body: payload
  })
}

// 下限价单
export async function postLimitOrder(payload) {
  return await request(`${UserIp4}/order.put_limit`, {
    method: 'post',
    body: payload
  })
}


// 下市价单
export async function postMarketOrder(payload) {
  return await request(`${MODE}`, {
    method: 'post',
    body: payload
  })
}






