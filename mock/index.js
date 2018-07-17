import { _ } from 'lodash'
import helper from './helper'

const { randomArrayMap, randomStr } = helper

export default {
  'Post /mock/api/v1/order': (req, res) => {
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
  },
  'Post /mock/api/v1/tc': (req, res) => {
    let result
    const method = _.get(req, 'body.head.method')
    switch (method) {
      // 委托列表
      case 'market.active_delegate': {
        result = {
          "head": {
            "method": "market.active_delegate",
            "msgType": "response",
            "packType": "1",
            "lang": "cn",
            "version": "1.0.0",
            "timestamps": "1530699967.935828",
            "serialNumber": "56",
            "userId": "56",
            "userToken": "56"
          },
          "data": {
            "asks": randomArrayMap(100).map((item, index) => ({
              "price": randomStr(),
              "amount": randomStr()
            })),
            "bids": randomArrayMap(100).map((item, index) => ({
              "price": randomStr(),
              "amount": randomStr()
            }))
          }
        }
      }
        break
      // 最近交易
      case 'market.deals': {
        result = {
          "head": {
            "method": "market.deals",
            "msgType": "response",
            "packType": "1",
            "lang": "cn",
            "version": "1.0.0",
            "timestamps": "1530884374",
            "serialNumber": "57",
            "userId": "1",
            "userToken": "56"
          },
          "data": {
            "records": randomArrayMap(100).map((item, index) => (
              {
                "id": index,
                "time": 1530869889.717263,
                "price": randomStr(1, 1000, 10000),
                "amount": randomStr(1, 100),
                "type": ["buy", 'sell'][_.random(0, 1)]
              }
            ))
          }
        }
      }
        break
      //K线图
      case 'market.kline': {
        result = {
          "head": {
            "method": "market.kline",
            "userId": "56",
            "userToken": "56",
            "lang": "cn",
            "request": "request",
            "packType": "1",
            "version": "1.0.0",
            "timestamps": "1531224422109056",
            "serialNumber": "57",
            "msgType": "response"
          },
          "data": {
            "records": [
              [
                "1530853200",
                "173",
                "168.34",
                "183",
                "166.92",
                "50",
                // "3",
                // "BTCUSD永续"
              ],
              [
                "1531324800",
                "183",
                "178.34",
                "193",
                "176.92",
                "1000",
                // "3",
                // "BTCUSD永续"
              ]
            ]
          }
        }
      }
      case 'asset.list': {
        result = {
          "head": {
            "method": "asset.list",
            "msgType": "response",
            "packType": "1",
            "lang": "cn",
            "version": "1.0.0",
            "timestamps": "1531831009606561",
            "serialNumber": "56",
            "userId": "56",
            "userToken": "56"
          },
          "data": {
            "assetList": [
              {
                "name": "BTC",
                "precShow": "8",
                "precSave": "12"
              },
              {
                "name": "ETH",
                "precShow": "8",
                "precSave": "12"
              },
              {
                "name": "USDT",
                "precShow": "8",
                "precSave": "12"
              }
            ]
          }
        }

      }
        break
      default:
    }
    res.send(
      result
    )
  }
}


