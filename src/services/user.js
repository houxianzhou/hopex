import { request } from '@utils'

export async function getCurrentUser() {
  return await request('/mock/api/user')
}

export async function doLogin(payload) {
  return await request('/api/v1.0/User/Login', {
    method: 'post',
    body: payload
  })
}

export async function doLoginOut(payload) {
  return await request('/api/v1.0/User/Logout')
}
