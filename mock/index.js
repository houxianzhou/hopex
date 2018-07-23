import { _ } from 'lodash'
import helper from './helper'

const { randomArrayMap, randomStr } = helper

export default {
  // 'Post /mock/v1/trade': (req, res) => {
  //   res.send(
  //     {
  //       "head": {
  //         "method": "order.finished",
  //         "msgType": "response",
  //         "packType": "1",
  //         "lang": "cn",
  //         "version": "1.0.0",
  //         "timestamps": "1530003171",
  //         "serialNumber": "57",
  //         "userId": "1",
  //         "userToken": "56"
  //       },
  //       "data": {
  //         "total": "100",
  //         "records": [
  //           {
  //             "id": "199",
  //             "ctime": "1529501617.870378",
  //             "ftime": "1529501617.87038",
  //             "user": "1",
  //             "market": "BTCBCH",
  //             "source": "396:账号1卖",
  //             "type": "1",
  //             "side": "1",
  //             "price": "80",
  //             "amount": "1",
  //             "taker_fee": "0.002",
  //             "maker_fee": "0.001",
  //             "deal_stock": "1",
  //             "deal_money": "80",
  //             "deal_fee": "0.16"
  //           },
  //           {
  //             "id": "198",
  //             "ctime": "1529501617.870093",
  //             "ftime": "1529501617.870095",
  //             "user": "1",
  //             "market": "BTCBCH",
  //             "source": "395:账号1卖",
  //             "type": "1",
  //             "side": "1",
  //             "price": "80",
  //             "amount": "1",
  //             "taker_fee": "0.002",
  //             "maker_fee": "0.001",
  //             "deal_stock": "1",
  //             "deal_money": "80",
  //             "deal_fee": "0.16"
  //           },
  //           {
  //             "id": "197",
  //             "ctime": "1529501617.869697",
  //             "ftime": "1529501617.869699",
  //             "user": "1",
  //             "market": "BTCBCH",
  //             "source": "394:账号1卖",
  //             "type": "1",
  //             "side": "1",
  //             "price": "80",
  //             "amount": "1",
  //             "taker_fee": "0.002",
  //             "maker_fee": "0.001",
  //             "deal_stock": "1",
  //             "deal_money": "80",
  //             "deal_fee": "0.16"
  //           }
  //         ],
  //         "pageIndex": "1",
  //         "pageSize": "3"
  //       },
  //       "errCode": "0",
  //       "errStr": "success",
  //       "ret": "0"
  //     }
  //   )
  // },
  'Post /mock/v1/trade': (req, res) => {
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
            "asks": randomArrayMap(9).map((item, index) => ({
              "price": index, //index,
              "amount": _.random(1, 2),//randomStr()
            })),
            "bids": randomArrayMap(9).map((item, index) => ({
              "price": index,
              "amount": _.random(1, 2) //randomStr()
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
        break
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
      // 合约列表
      case 'market.list': {
        result = {
          "head": {
            "method": "market.list",
            "msgType": "response",
            "packType": "1",
            "lang": "cn",
            "version": "1.0.0",
            "timestamps": "1532052617857700",
            "serialNumber": "56",
            "userId": "56",
            "userToken": "56"
          },
          "data": {
            "records": [
              {
                "marketCode": "BTCUSDT",
                "marketName": "BTCUSDT永续",
                "direction": "2",
                "marketType": "2",
                "minVaryPrice": "0.50000000",
                "minDealAmount": "1",
                "varyRange": "1 2 4 8",
                "keepBailRate": "0.01000000",
                "levelages": "[{\"id\":1,\"settingId\":1,\"initialMarginRate\":10.0000000000,\"leverage\":10.0000000000,\"createdTime\":\"2018-07-17 18:39:28\",\"creator\":1},{\"id\":2,\"settingId\":1,\"initialMarginRate\":20.0000000000,\"leverage\":5.0000000000,\"createdTime\":\"2018-07-17 18:39:28\",\"creator\":1},{\"id\":3,\"settingId\":1,\"initialMarginRate\":5.0000000000,\"leverage\":20.0000000000,\"createdTime\":\"2018-07-17 18:39:28\",\"creator\":1}]",
                "showPrec": "8",
                "dealMoney": "BTC",
                "marketValue": "1.00000000"
              },
              {
                "marketCode": "ETHBTC",//合约代码
                "marketName": "ETHBTC永续",//合约显示名称
                "direction": "1",//方向
                "marketType": "2",//合约类型
                "minVaryPrice": "0.10000000",//最小变动价位
                "minDealAmount": "1",//最小交易量
                "varyRange": "1 2 4 8",//价格变动范围
                "keepBailRate": "1.00000000",//维持保证金率
                "levelages": "[{\"id\":4,\"settingId\":2,\"initialMarginRate\":10.0000000000,\"leverage\":10.0000000000,\"createdTime\":\"2018-07-17 18:53:58\",\"creator\":1},{\"id\":5,\"settingId\":2,\"initialMarginRate\":5.0000000000,\"leverage\":20.0000000000,\"createdTime\":\"2018-07-17 18:53:58\",\"creator\":1}]",//合约杠杆
                "showPrec": "8",//合理价格等显示位数
                "dealMoney": "BTC",//结算货币
                "marketValue": "1.00000000"//合约价值
              },
              {
                "marketCode": "XRPETH",
                "marketName": "XRPETH永续",
                "direction": "2",
                "marketType": "2",
                "minVaryPrice": "1.00000000",
                "minDealAmount": "1",
                "varyRange": "1 2 4 6 8",
                "keepBailRate": "1.00000000",
                "levelages": "[{\"id\":8,\"settingId\":4,\"initialMarginRate\":10.0000000000,\"leverage\":10.0000000000,\"createdTime\":\"2018-07-19 09:53:51\",\"creator\":1},{\"id\":9,\"settingId\":4,\"initialMarginRate\":20.0000000000,\"leverage\":5.0000000000,\"createdTime\":\"2018-07-19 09:53:51\",\"creator\":1}]",
                "showPrec": "4",
                "dealMoney": "XRP",
                "marketValue": "1.00000000"
              },
              {
                "marketCode": "EOSBTC",
                "marketName": "EOSBTC永续",
                "direction": "1",
                "marketType": "2",
                "minVaryPrice": "1.00000000",
                "minDealAmount": "1",
                "varyRange": "1 3 44",
                "keepBailRate": "1.00000000",
                "levelages": "[{\"id\":3,\"settingId\":3,\"initialMarginRate\":111.0000000000,\"leverage\":0.9000000000,\"createdTime\":\"2018-07-19 20:46:44\",\"creator\":1}]",
                "showPrec": "8",
                "dealMoney": "BTC",
                "marketValue": "1.00000000"
              }
            ]
          },
          "errCode": "0",
          "errStr": "success",
          "ret": "0"
        }

      }
        break
      case 'user.position': {
        result = {
          "head": {
            "method": "user.position",
            "msgType": "response",
            "packType": "1",
            "lang": "cn",
            "version": "1.0.0",
            "timestamps": "1439261904",
            "serialNumber": "56",
            "userId": "56",
            "userToken": "56"
          },
          "data": {
            "positionList": (new Array(6)).fill({
              "market": "BTCUSD",//合约名称
              "leverage": "10.00",//杠杆倍数
              "amount": "1000",//持仓数量(张)
              "averagePrice": "1111",//均价
              "positionMoney": "1111",//持仓占用保证金
              "keepMoney": "1111",//维持保证金
              "overPrice": "1111",//强平价格
              "floatProfit": "11111"//浮动盈亏
            }),
            "errCode": "0",
            "errStr": "success",
            "ret": "0"
          }
        }
      }
        break
      case 'order.user_active_delegate': {
        const { pageIndex = 1, pageSize = 10 } = _.get(req.body, 'param')
        result = {
          "head": {
            "method": "order.user_active_delegate",
            "userId": "3",
            "userToken": "user.QC5LTHR6HOUZINUCE4YI.web",
            "lang": "cn",
            "request": "request",
            "packType": "1",
            "version": "1.0",
            "timestamps": "1532175227023967",
            "serialNumber": "49",
            "msgType": "response"
          },
          "data": {
            "pageIndex": String(pageIndex),
            "pageSize": "100",
            "total": "3",
            "records": (new Array(Number(pageSize))).fill({}).map((item, index) => ({
              "orderId": String(index),
              "market": "BTCUSDT" + '第' + pageIndex + '页',
              "source": "我是现价测试单",
              "type": "1",
              "side": "2",
              "userId": "3",
              "ctime": "1532082876.271102",
              "mtime": "1532082876.271102",
              "price": "0.5",
              "amount": "2",
              "taker_fee": "0.01",
              "maker_fee": "0.01",
              "left": "2",
              "deal_stock": "0",
              "deal_money": "0",
              "deal_fee": "0"
            }))
          },
          "errCode": "0",
          "errStr": "success",
          "ret": "0"
        }
      }
      default:
    }
    res.send(
      result
    )
  }
}


