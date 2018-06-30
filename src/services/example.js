import {request} from '@utils'

export async function query() {
  return await request('/api/users', {
    method: 'post',
    body: {
      name: 'weixiaoyi'
    }
  })
}
