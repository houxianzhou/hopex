export default [
  {
    path: '/',
    model: ['global/user']
  },
  {
    path: '/home',
    model: ['home/index'],
    route: 'Home'
  },
  {
    path: '/user',
    route: 'User'
  }
]
