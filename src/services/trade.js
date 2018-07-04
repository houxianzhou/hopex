import {request} from '@utils'


// 最新成交列表
export async function getLatestRecord() {
  return await request('/api/getLatestRecord')
}
