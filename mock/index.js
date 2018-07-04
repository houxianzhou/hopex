export default {
  'Post /api/v1/order': (req, res) => {
    res.send(
      {
        "head": {
          "method": "order.finished",
          "msgType": "response",
          "packType": "1",
          "lang": "cn",
          "version": "1.0.0",
          "timestamps": "1530003171",
          "serialNumber": "57",
          "userId": "1",
          "userToken": "56"
        },
        "data": {
          "total": "100",
          "records": [
            {
              "id": "199",
              "ctime": "1529501617.870378",
              "ftime": "1529501617.87038",
              "user": "1",
              "market": "BTCBCH",
              "source": "396:账号1卖",
              "type": "1",
              "side": "1",
              "price": "80",
              "amount": "1",
              "taker_fee": "0.002",
              "maker_fee": "0.001",
              "deal_stock": "1",
              "deal_money": "80",
              "deal_fee": "0.16"
            },
            {
              "id": "198",
              "ctime": "1529501617.870093",
              "ftime": "1529501617.870095",
              "user": "1",
              "market": "BTCBCH",
              "source": "395:账号1卖",
              "type": "1",
              "side": "1",
              "price": "80",
              "amount": "1",
              "taker_fee": "0.002",
              "maker_fee": "0.001",
              "deal_stock": "1",
              "deal_money": "80",
              "deal_fee": "0.16"
            },
            {
              "id": "197",
              "ctime": "1529501617.869697",
              "ftime": "1529501617.869699",
              "user": "1",
              "market": "BTCBCH",
              "source": "394:账号1卖",
              "type": "1",
              "side": "1",
              "price": "80",
              "amount": "1",
              "taker_fee": "0.002",
              "maker_fee": "0.001",
              "deal_stock": "1",
              "deal_money": "80",
              "deal_fee": "0.16"
            }
          ],
          "pageIndex": "1",
          "pageSize": "3"
        },
        "errCode": "0",
        "errStr": "success",
        "ret": "0"
      }
    )
  }
}
