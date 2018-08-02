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
            "minVaryPrice": "0.50000000",
            "minDealAmount": "1",
            "varyRange": "1 2 4 8",
            "keepBailRate": "0.01000000",
            "levelages": "[{\"id\":1,\"settingId\":1,\"initialMarginRate\":10.0000000000,\"leverage\":10.0000000000,\"createdTime\":\"2018-07-17 18:39:28\",\"creator\":1},{\"id\":2,\"settingId\":1,\"initialMarginRate\":20.0000000000,\"leverage\":5.0000000000,\"createdTime\":\"2018-07-17 18:39:28\",\"creator\":1},{\"id\":3,\"settingId\":1,\"initialMarginRate\":5.0000000000,\"leverage\":20.0000000000,\"createdTime\":\"2018-07-17 18:39:28\",\"creator\":1}]",
            "showPrec": "8",
            "dealMoney": "BTC",
            "marketValue": "1.00000000",
            minLimitPrice:'1',
            maxLimitPrice:'2'
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
            minLimitPrice:'1',
            maxLimitPrice:'2'
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
            minLimitPrice:'1',
            maxLimitPrice:'2'
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
            minLimitPrice:'1',
            maxLimitPrice:'2'
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
            "price": randomStr(1, 1000, 10000),
            "amount": randomStr(1, 100),
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
          "price": index + 10, //index,
          "amount": _.random(1, 2),//randomStr()
        })),
        "bids": randomArrayMap(5).map((item, index) => ({
          "price": index,
          "amount": _.random(1, 2) //randomStr()
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
        "records": (new Array(Number(pageSize))).fill({}).map((item, index) => ({
          "orderId": String(index),
          "market": "BTCUSDT" + '第' + pageIndex + '页',
          "source": "我是现价测试单",
          "type": _.random('1', '2'),
          "side": _.random('1', '2'),
          "userId": "3",
          "ctime": "1532082876.271102",
          "mtime": "1532082876.271102",
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
        "positionList": (new Array(6)).fill({
          "market": "BTCUSDT",
          "leverage": "10",
          "amount": "-847",
          "averagePrice": "3426.05535492145950280673616680032",
          "keepMoney": "0.004719713584537424571629366093504956",
          "positionMoney": "0.0271945401775727796746263474911476",
          "overPrice": "3768.660890413605453087409783480351",
          "floatProfit": "3.553309776002507508209662686697644",
          "profitRate": "0.0009428573913458519080673369813754055",
          "reasonablePrice": "222.8634850166481687014428412874583",
          "lastPrice": "1000",
        }),
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
        "maxPrice24h": "2000",
        "minPrice24h": "1000",
        "totalPrice24h": "527500",
        "marketPrice": "7388.47741901",
        "percent": "+50.00",
        "dollarPrice": "2000.00000000",
        "price24h": "1000",
        "priceLast": "2000.00000000",
        "marketName": "BTCUSDT永续"
      },
      "errCode": "0",
      "errStr": "success",
      "ret": "0"
    })
  },

  //资产列表
  'Post /mock/api/v1/trade/asset.list': (req, res) => {
    res.send({
      "head": {
        "method": "balance.query",
        "msgType": "response",
        "packType": "1",
        "lang": "cn",
        "version": "1.0.0",
        "timestamps": "1533200435875719",
        "serialNumber": "57",
        "userId": "4",
        "userToken": "56"
      },
      "data": [
        {
          "assetName": "BTC", //资产名称
          "available": "112233222223344442",//入金,暂时不可用
          "feeFreeze": "0",//冻结的手续费
          "walletBalance": "112233222223344442",//钱包金额
          "floatProfit": "0",//浮动盈亏
          "floatPercent": "12%",//浮动比例
          "withdrawFreeze": "0",//提现冻结
          "deletegate": "0",//委托保证金
          "position": "0",//持仓保证金
          "totalWealth": "0"//总权益
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
    })
  },

}


