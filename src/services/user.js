import { request } from '@utils'

export async function getCurrentUser() {
  return await request('/mock/api/user')
}
