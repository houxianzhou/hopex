import { PATH } from '@constants'

export default [
  {
    path: '/',
    model: ['global/user', 'global/theme', 'global/modal']
  },
  {
    dest: 'dashboard',
    name: '首页',
    path: PATH.dashboard,
    model: ['dashboard'],
    route: 'DashBoard'
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
    path: '/asset',
    model: ['asset/index','history/index', 'home/index'],
    route: 'Asset'
  },
  {
    name: '历史',
    path: PATH.history,
    model: ['history/index', 'home/index'],
    route: 'History'
  },
  {
    name: '解释说明',
    path: '/question',
    model: ['account'],
    route: 'Question'
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
