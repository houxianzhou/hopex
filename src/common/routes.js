import { PATH } from '@constants'

export default [
  {
    path: '/',
    model: ['global/user', 'global/theme', 'global/modal']
  },
  {
    dest: 'trade',
    name: '合约交易',
    path: PATH.home,
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
    path: PATH.register,
    route: 'User/Register'
  },
  {
    name: '忘记密码',
    path: PATH.forgetPassword,
    route: 'User/ForgetPassword'
  },
  {
    name: '我的账户',
    model: ['account'],
    path: PATH.myaccount,
    route: 'User/account'
  },
]
