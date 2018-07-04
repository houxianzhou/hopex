import { request } from '@utils'
import { API } from "@constants"

const { PREFIX, USERIP } = API

// 最新成交列表
export async function getLatestRecord(payload) {
  return await request(`${PREFIX}/order`, {
    method: 'post',
    body: payload
  })
}

// 委托列表
export async function getEnsureRecord(payload) {
  return await request(`${PREFIX}/tc`, {
    method: 'post',
    body: payload,
    needLoop: true,
    needWatch: false
  })
}


