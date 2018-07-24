import { delay } from 'roadhog-api-doc'

export default delay({
  'Get /mock/api/user': (req, res) => {
    res.send(
      {
        userInfo: {
          email:'2278095567@qq.com',
          userId: '56',
          userToken: "56",
        }
      }
    )
  },
  'Post /mock/api/v1.0/User/Login': (req, res) => {
    res.send(
      {
        data:{
          email:'2278095567@qq.com',
          userId: 'mockId',
          token: "mockToken",
        }

      }
    )
  }
}, 300)
