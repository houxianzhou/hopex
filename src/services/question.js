import { request } from '@utils'
import { MODE } from "./trade"


let prefix = ''
// mock数据
if (MODE === 'mock') {
  prefix = '/mock'
}

export async function example() {
  return await request(`${prefix}/example`)
}

export async function example1(payload) {
  return await request(`${prefix}/example`, {
    method: 'post',
    body: payload,
  })
}

export async function example2(payload) {
  return await request(`${prefix}/example`, {
    query: payload,
  })
}


