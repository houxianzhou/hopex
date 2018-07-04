import { request } from '@utils'
import { API } from "@constants"

const { PREFIX } = API

// 最新成交列表
export async function getLatestRecord(payload) {
  return await request(`${PREFIX}/order`, {
    method: 'post',
    body: payload
  })
}
