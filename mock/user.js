import { delay } from 'roadhog-api-doc'

export default delay({
  'Get /mock/api/user': (req, res) => {
    res.send(
      {
        userInfo: {
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
          userId: 'mockId',
          token: "mockToken",
        }

      }
    )
  }
}, 300)
