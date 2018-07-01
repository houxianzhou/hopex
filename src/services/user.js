import { request } from '@utils'

export async function getCurrentUser() {
  return await request('/api/user')
}
