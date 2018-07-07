import { delay } from 'roadhog-api-doc';

export default delay({
  'Get /api/user': (req, res) => {
    res.send(
      {
        name: 'weixiaoyi'
      }
    )
  }
}, 2000)
