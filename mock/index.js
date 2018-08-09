import { _ } from 'lodash'

import helper from './helper'


const { randomArrayMap, randomStr } = helper

const other = {
  "errCode": "0",
  "errStr": "success",
  "ret": "0"
}

export default {

  // 合约列表
  'Post /mock/api/v1/quote/market.list': (req, res) => {
    res.send({
      "head": {
        "method": "market.list",
        "timestamps": "1532490892550791",
        "version": "1.0",
        "lang": "cn",
        "msgType": "response",
        "packType": "1",
        "serialNumber": "6"
      },
      "data": {
        "BTC": [
          {
            "marketCode": "BTCUSDT",
            "marketName": "BTCUSDT永续",
            "direction": "2",
            "marketType": "2",
            "minVaryPrice": "0.50",
            "minDealAmount": "1",
            "varyRange": "1 2 4 8",
            "keepBailRate": "0.01000000",
            "levelages": "[{\"id\":1,\"settingId\":1,\"initialMarginRate\":10.0000000000,\"leverage\":10.0000000000,\"createdTime\":\"2018-07-17 18:39:28\",\"creator\":1},{\"id\":2,\"settingId\":1,\"initialMarginRate\":20.0000000000,\"leverage\":5.0000000000,\"createdTime\":\"2018-07-17 18:39:28\",\"creator\":1},{\"id\":3,\"settingId\":1,\"initialMarginRate\":5.0000000000,\"leverage\":20.0000000000,\"createdTime\":\"2018-07-17 18:39:28\",\"creator\":1}]",
            "showPrec": "8",
            "dealMoney": "BTC",
            "marketValue": "1.00000000",
            minLimitPrice: '1000',
            maxLimitPrice: '2000'
          }
        ],
        "ETH": [
          {
            "marketCode": "ETHBTC",
            "marketName": "ETHBTC永续",
            "direction": "1",
            "marketType": "2",
            "minVaryPrice": "0.10000000",
            "minDealAmount": "1",
            "varyRange": "1 2 4 8",
            "keepBailRate": "1.00000000",
            "levelages": "[{\"id\":4,\"settingId\":2,\"initialMarginRate\":10.0000000000,\"leverage\":10.0000000000,\"createdTime\":\"2018-07-17 18:53:58\",\"creator\":1},{\"id\":5,\"settingId\":2,\"initialMarginRate\":5.0000000000,\"leverage\":20.0000000000,\"createdTime\":\"2018-07-17 18:53:58\",\"creator\":1}]",
            "showPrec": "8",
            "dealMoney": "BTC",
            "marketValue": "1.00000000",
            minLimitPrice: '1',
            maxLimitPrice: '2'
          }
        ],
        "XRP": [
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
            "marketValue": "1.00000000",
            minLimitPrice: '1',
            maxLimitPrice: '2'
          }
        ],
        "EOS": [
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
            "marketValue": "1.00000000",
            minLimitPrice: '1',
            maxLimitPrice: '2'
          }
        ]
      },
      ...other
    })
  },
  //最新成交
  'Post /mock/api/v1/quote/market.deals': (req, res) => {
    res.send({
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
            "price": randomStr(1000, 10000),
            "amount": randomStr(10000, 20000),
            "type": ["2", '1'][_.random(0, 1)]
          }
        ))
      },
      ...other
    })
  },
  //委托列表
  'Post /mock/api/v1/quote/market.active_delegate': (req, res) => {
    res.send({
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
        "asks": randomArrayMap(5).map((item, index) => ({
          "exist": ['0', '1'][_.random(0, 1)],
          "price": index + 10 + _.random(10,20), //index,
          "amount": _.random(10000, 20000),//randomStr()
        })),
        "bids": randomArrayMap(5).map((item, index) => ({
          "exist": ['0', '1'][_.random(0, 1)],
          "price": index + '.0',
          "amount": _.random(10000, 20000) //randomStr()
        }))
      },
      ...other
    })
  },
  //用户的委托列表
  'Post /mock/api/v1/trade/order.user_active_delegate': (req, res) => {
    const { pageIndex, pageSize } = _.get(req.body, 'param')
    res.send({
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
        "records": (new Array(Number(3))).fill({}).map((item, index) => ({
          "orderId": String(index),
          "market": "BTCUSDT" + '第' + pageIndex + '页',
          "source": "我是现价测试单",
          "type": _.random('1', '2'),
          "side": _.random('1', '2'),
          "userId": "3",
          "ctime": "20:18:12",
          "mtime": "20:18:12",
          "price": "6",
          "amount": _.random('5', '-5'),
          "taker_fee": "0.01",
          "maker_fee": "0.01",
          "left": "2",
          "deal_stock": "0",
          "deal_money": "0",
          "deal_fee": "0",
          "takerFee": "0.01",
          "makerFee": "0.01",
          "dealAmount": "0",
          "dealMoney": "0",
          "dealFee": "0",
          "orderStatus": "1",
          "leverage": "10",
          "avgDealMoney": "0",
          "delegateMoney": "0.006"
        }))
      },
      ...other
    })
  },
  //用户的委托明细
  'Post /mock/api/v1/trade/order.deals': (req, res) => {

    res.send({
      "data": {
        "total": "0",
        "records": (new Array(6)).fill().map(item => (
          {
            "time": "2018-08-02 17:49:27",
            "role": "2",
            "price": "222",
            "amount": "11",
            "fee": "0.0004954954954955"
          }
        )),
        "pageIndex": "0",
        "pageSize": "100"
      },
      "head": {
        "method": "order.deals",
        "userId": "3",
        "userToken": "user.QC5LTHR6HOUZINUCE4YI.pcweb",
        "lang": "cn",
        "packType": "1",
        "version": "1.0",
        "msgType": "response",
        "timestamps": "1533708873466509",
        "serialNumber": "951"
      },
      ...other
    })
  },

  //用户持仓
  'Post /mock/api/v1/trade/user.position': (req, res) => {
    res.send({
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
        "positionList": (new Array(3)).fill().map(item => (
          {
            "market": "BTCUSDT",
            "leverage": "10.00",
            "amount": "-1236019",
            "averagePrice": "232.88",
            "positionMoney": "534.7138",
            "overPrice": "257.35",
            "keepMoney": "30.1388",
            "floatProfit": "0BTC",
            "profitRate": "0.00%",
            "reasonablePrice": "0.0",
            "lastPrice": "6472.0"
          }
        )),
      },
      ...other
    })
  },
  //用户撤单
  'Post /mock/api/v1/trade/order.cancel': (req, res) => {
    res.send({
      "head": {
        "method": "order.cancel",
        "userId": "3",
        "userToken": "user.QC5LTHR6HOUZINUCE4YI.web",
        "lang": "cn",
        "packType": "1",
        "version": "1.0",
        "msgType": "response",
        "timestamps": "1532494484836950",
        "serialNumber": "152"
      },
      "data": {
        "orderId": "19376",
        "market": "BTCUSDT",
        "type": "1",
        "side": "2",
        "userId": "3",
        "ctime": "1532336681.033155",
        "mtime": "1532336681.033155",
        "price": "1",
        "amount": "1",
        "taker_fee": "0.01",
        "maker_fee": "0.01",
        "left": "1",
        "deal_stock": "0e-8",
        "deal_money": "0e-16",
        "deal_fee": "0e-12"
      },
      ...other
    })
  },

  // 查询用户杠杆
  'Post /mock/api/v1/trade/market.leverage_select': (req, res) => {
    res.send({
      "data": { "leverage": 20.0 },
      ...other
    })
  },

  // 设置杠杆
  'Post /mock/api/v1/trade/market.leverage_set': (req, res) => {
    res.send({ "ret": "6", "errCode": "6", "errStr": "user trade amount not zero" })
  },

  //k线图
  'Post /mock/api/v1/quote/market.kline': (req, res) => {
    const { body: { param: { startTime, endTime } = {} } = {} } = req
    const periods = helper.getdays(startTime * 1000, endTime * 1000)
    res.send({
      "head": {
        "method": "market.kline",
        "timestamps": "1533181070062",
        "version": "1.0",
        "lang": "cn",
        "msgType": "request",
        "packType": "1",
        "serialNumber": "56"
      },
      "data": {
        "records": periods.map(item => {
          const h = 160 + _.random(30, 40)
          const o = h - _.random(10, 20)
          const c = o - _.random(10, 30)
          const l = c - _.random(10, 20)
          const v = _.random(100, 3000)
          return [item / 1000, o, c, h, l, v, 6, 'BTCUSD永续']
        }),
      },
      "errCode": "0",
      "errStr": "success",
      "ret": "0"
    })
  },

  //k线图数据详情
  'Post /mock/api/v1/quote/market.detail': (req, res) => {
    const { body: { param: { startTime, endTime } = {} } = {} } = req
    const periods = helper.getdays(startTime * 1000, endTime * 1000)
    res.send({
      "head": {
        "method": "market.kline",
        "timestamps": "1533181070062",
        "version": "1.0",
        "lang": "cn",
        "msgType": "request",
        "packType": "1",
        "serialNumber": "56"
      },
      "data": {
        "maxPrice24h": randomStr(100, 1000),
        "minPrice24h": randomStr(100, 1000),
        "totalPrice24h": randomStr(10000, 100000),
        "marketPrice": "7388.47741901",
        "percent": "+50.00",
        "dollarPrice": randomStr(100, 1000),
        "price24h": randomStr(100, 1000),
        "priceLast": randomStr(100, 1000),
        "marketName": "BTCUSDT永续"
      },
      "errCode": "0",
      "errStr": "success",
      "ret": "0"
    })
  },

  //资产列表
  'Post /mock/api/v1/trade/balance.query': (req, res) => {
    res.send(
      {
        "head": {
          "method": "balance.query",
          "userId": "3",
          "userToken": "user.QC5LTHR6HOUZINUCE4YI.pcweb",
          "lang": "cn",
          "packType": "1",
          "version": "1.0",
          "msgType": "response",
          "timestamps": "1533285185679478",
          "serialNumber": "23"
        },
        "data": [
          {
            "assetName": "BTC",
            "available": "119999.9999099",
            "feeFreeze": "0",
            "walletBalance": "119999.999909909908",
            "floatProfit": "0",
            "floatPercent": "12%",
            "withdrawFreeze": "0",
            "deletegate": "0",
            "position": "0",
            "totalWealth": "0"
          },
          {
            "assetName": "ETH",
            "available": "0",
            "feeFreeze": "0",
            "walletBalance": "0",
            "floatProfit": "0",
            "floatPercent": "12%",
            "withdrawFreeze": "0",
            "deletegate": "0",
            "position": "0",
            "totalWealth": "0"
          },
          {
            "assetName": "XRP",
            "available": "0",
            "feeFreeze": "0",
            "walletBalance": "0",
            "floatProfit": "0",
            "floatPercent": "12%",
            "withdrawFreeze": "0",
            "deletegate": "0",
            "position": "0",
            "totalWealth": "0"
          }
        ],
        "errCode": "0",
        "errStr": "success",
        "ret": "0"
      }
    )
  },

  //最近委托历史
  'Post /mock/api/v1/trade/user.order_history': (req, res) => {
    res.send(
      {
        "data": {
          "total": "114",
          "records": (new Array(2)).fill().map(item => (
            {
              "ctime": "2018-08-02 17:51:00",
              "ftime": "2018-08-02 17:51:00",
              "id": "19582",
              "user": "3",
              "market": "BTCUSDT",
              "source": "我是现价测试单",
              "type": "1",
              "side": "1",
              "price": "60",
              "amount": "111",
              "dealAmount": "111",
              "dealMoney": "1.11",
              "dealFee": "0.0111",
              "orderStatus": "2",
              "leverage": "0",
              "avgDealMoney": "0",
              "delegateMoney": "0",
              "unwindProfit": "0"
            }
          )),
          "pageIndex": "",
          "pageSize": "10"
        },
        "head": {
          "method": "user.order_history",
          "userId": "3",
          "userToken": "user.QC5LTHR6HOUZINUCE4YI.pcweb",
          "lang": "cn",
          "packType": "1",
          "version": "1.0",
          "msgType": "response",
          "timestamps": "1533364538167711",
          "serialNumber": "141"
        },
        "errCode": "0",
        "errStr": "success",
        "ret": "0"
      }
    )
  },

  //下限价单
  'Post /mock/api/v1/trade/order.put_limit': (req, res) => {
    res.send(
      {
        "data": '',
        "errCode": "0",
        "errStr": "success",
        "ret": "0"
      }
    )
  },

  //下市价单
  'Post /mock/api/v1/trade/order.put_market': (req, res) => {
    res.send(
      {
        "data": '',
        "errCode": "0",
        "errStr": "success",
        "ret": "0"
      }
    )
  },

}


