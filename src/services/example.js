import request from '@utils/request';

export async function query() {
  return await request('/api/users', {
    method: 'post',
    body: {
      name: 'weixiaoyi'
    }
  });
}
