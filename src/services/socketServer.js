import { Server } from 'mock-socket'
import { _ } from '@utils'


const mockServer = new Server('ws://192.168.70.131/ws');

mockServer.on('connection', socket => {
  socket.on('message', () => {
  })
  socket.on('close', () => {
  })

  setInterval(() => {

    socket.send(
      JSON.stringify(
        {
          "price": _.random(1000, 10000),
          "minPrice": 6194.191012722739,
          "maxPrice": 6577.33684856126,
          "chanId": 204,
          "pair": "BTCUSD"
        })
    )

  }, 1000)


});


export default mockServer
