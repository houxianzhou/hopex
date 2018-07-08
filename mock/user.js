import { delay } from 'roadhog-api-doc';

export default delay({
  'Get /api/user': (req, res) => {
    res.send(
      {
        userInfo: {
          userId: '56',
          userToken: "56",
        }
      }
    )
  }
}, 2000)
