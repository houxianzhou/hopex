import { request, asyncPayload } from '@utils'
import { API } from "@constants"

const { PREFIX, USERIP } = API
const MODE = PREFIX

// K线图
export async function getKline(payload) {
  return asyncPayload(payload, (payload) => {
    return request(`${MODE}/tc`, {
      method: 'post',
      body: payload,
      needLoop: true,
      needWatch: false
    })
  })
}

// 最新成交列表
export async function getLatestRecord(payload) {
  return asyncPayload(payload, (payload) => {
    return request(`${MODE}/tc`, {
      method: 'post',
      body: payload,
      needLoop: true,
      needWatch: false
    })
  })
}

// 委托列表
export async function getEnsureRecord(payload) {
  return asyncPayload(payload, (payload) => {
    return request(`${MODE}/tc`, {
      method: 'post',
      body: payload,
      needLoop: true,
      needWatch: false
    })
  })
}

// 下限价单
export async function postLimitOrder(payload) {
  return await request(`${MODE}/tc`, {
    method: 'post',
    body: payload
  })
}


// 下市价单
export async function postMarketOrder(payload) {
  return await request(`${MODE}/tc`, {
    method: 'post',
    body: payload
  })
}


