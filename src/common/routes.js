import { PATH } from '@constants'

export default [
  {
    path: '/',
    model: ['global/user', 'global/theme', 'global/modal']
  },
  {
    name: '合约交易',
    path: '/home',
    model: ['home/index'],
    route: 'Home'
  },
  {
    name: '资金管理',
    path: '/manage',
    route: 'User'
  },
  {
    name: '历史',
    path: '/history',
    route: 'User'
  },
  {
    name: '常见问题',
    path: '/question',
    route: 'User'
  },
  {
    name: '登录',
    path: PATH.login,
    route: 'User/Login'
  },
  {
    name: '注册',
    path: '/user/register',
    route: 'User/Register'
  },
]
