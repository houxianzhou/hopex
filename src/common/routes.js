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
    route: 'DashBoard',
    show: false
  },
  {
    dest: 'trade',
    name: '合约交易',
    path: PATH.home,
    model: ['home/index', 'asset/index'],
    route: 'Home'
  },
  {
    name: '资金管理',
    path: '/asset',
    model: ['asset/index', 'history/index', 'home/index', 'account/index'],
    route: 'Asset',
    authority: [1]
  },
  {
    name: '历史',
    path: PATH.history,
    model: ['history/index', 'home/index'],
    route: 'History',
    authority: [1]
  },
  {
    name: '解释说明',
    path: '/question',
    model: ['question/index', 'home/index'],
    route: 'Question'
  },
  {
    name: '关于',
    path: '/about',
    model: ['home/index'],
    route: 'About'
  },
  {
    name: '登录',
    path: PATH.login,
    route: 'Entry/Login'
  },
  {
    name: '注册',
    path: PATH.register,
    route: 'Entry/Register'
  },
  {
    name: '忘记密码',
    path: PATH.forgetPassword,
    route: 'Entry/ForgetPassword',
  },
  {
    name: '我的账户',
    model: ['account', 'home/index'],
    path: PATH.myaccount,
    route: 'User/index',
    show: false,
    authority: [1]
  },
]
