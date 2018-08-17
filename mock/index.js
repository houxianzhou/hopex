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
  'Post /mock/api/v1/quote/market.detail_list': (req, res) => {
    res.send({
      "data": [{
        "name": "BTC",
        "list": [{
          "price24h": "6079.00",
          "priceLast": "6000.00",
          "direction": -1,
          "marketCode": "BTCUSDT",
          "marketName": "BTCUSDT永续",
          "percent": "-1.29",
          "dollarPrice": "6000.00",
          "position": true
        }]
      }, {
        "name": "ETH",
        "list": [{
          "marketCode": "ETHBTC",
          "marketName": "ETHBTC永续",
          "price24h": "",
          "priceLast": "",
          "percent": "",
          "dollarPrice": "",
          "position": false
        }, {
          "marketCode": "ETHUSDT",
          "marketName": "ETHUSDT永续",
          "price24h": "",
          "priceLast": "",
          "percent": "",
          "dollarPrice": "",
          "position": false
        }]
      }, {
        "name": "XRP",
        "list": [{
          "marketCode": "XRPBTC",
          "marketName": "XRPBTC永续",
          "price24h": "",
          "priceLast": "",
          "percent": "",
          "dollarPrice": "",
          "position": false
        }, {
          "marketCode": "XRPETH",
          "marketName": "XRPETH永续",
          "price24h": "",
          "priceLast": "",
          "percent": "",
          "dollarPrice": "",
          "position": false
        }, {
          "marketCode": "XRPUSDT",
          "marketName": "XRPUSDT永续",
          "price24h": "",
          "priceLast": "",
          "percent": "",
          "dollarPrice": "",
          "position": false
        }]
      }, {
        "name": "EOS",
        "list": [{
          "marketCode": "EOSETH",
          "marketName": "EOSETH永续",
          "price24h": "",
          "priceLast": "",
          "percent": "",
          "dollarPrice": "",
          "position": false
        }, {
          "price24h": "0.0007989",
          "priceLast": "0.0007400",
          "direction": -1,
          "marketCode": "EOSBTC",
          "marketName": "EOSBTC永续",
          "percent": "-7.37",
          "dollarPrice": "4.46",
          "position": true
        }]
      }], "ret": "0", "errCode": "0", "errStr": "success"
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
        "records": [{
          "id": _.random(101, 200),
          "time": "任意值",
          "price": randomStr(1000, 10000),
          "amount": randomStr(10000, 20000),
          "type": ["2", '1'][_.random(0, 1)]
        }].concat(randomArrayMap(99).map((item, index) => (
          {
            "id": index,
            "time": "13:09:23",
            "price": randomStr(1000, 10000),
            "amount": randomStr(10000, 20000),
            "type": ["2", '1'][_.random(0, 1)]
          }
        )))
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
        "asks": randomArrayMap(5).map((item, index) => {
          const res = _.random(10000, 20000)
          return {
            "exist": ['0', '1'][_.random(0, 1)],
            "price": index + 10 + _.random(10, 20),
            "amountShow": res,//randomStr()
            "amount": res,//randomStr()
          }
        }),
        "bids": randomArrayMap(5).map((item, index) => {
          const res = _.random(10000, 20000)
          return {
            "exist": ['0', '1'][_.random(0, 1)],
            "price": index + '.0',
            "amountShow": res,//randomStr()
            "amount": res //randomStr()
          }
        })
      },
      ...other
    })
  },
  //用户的委托列表
  'Post /mock/api/v1/trade/user.active_delegate': (req, res) => {
    const { pageIndex, pageSize } = _.get(req.body, 'param')
    res.send({
      "head": {
        "method": "user.active_delegate",
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
      "data": (new Array(Number(3))).fill({}).map((item, index) => ({
        "orderId": String(index),
        "marketName": 'BTCUSDT永续',
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
      })),
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
        "positionList": (new Array(3)).fill().map((item, index) => {
          const arryas = ['BTC', 'USDT', 'EOC']
          return {
            amount: "-1227304",
            averagePrice: _.random(10, 50) + '',
            averagePriceShow: "234.75",
            floatProfit: "-5035.2689034148",
            floatProfitShow: "-5035.2689BTC",
            keepMoney: "29.8839175526",
            keepMoneyShow: "29.8839BTC",
            lastPrice: "6000.0",
            lastPriceShow: "6000.0",
            leverage: "20.00",
            market: arryas[index],
            marketName: `${arryas[index]}永续`,
            overPrice: "245.8305757134",
            overPriceShow: "245.83",
            positionMoney: "265.3165163631",
            positionMoneyShow: "265.3165BTC",
            profitRate: "-1897.83%",
            reasonablePrice: "6370.8808454090",
            reasonablePriceShow: _.random(10, 50) + '',
          }
        }),
      },
      ...other
    })
  },

  //查询持仓占用保证金
  'Post /mock/api/v1/trade/user.append_position_margin_query': (req, res) => {
    res.send({
      "head": {
        "method": "user.append_position_margin_query",
        "userId": "3",
        "userToken": "user.QC5LTHR6HOUZINUCE4YI.pcweb",
        "lang": "cn",
        "packType": "1",
        "version": "1.0",
        "msgType": "response",
        "timestamps": "1534259459422383",
        "serialNumber": "1369"
      },
      "data": {
        "increase": {
          "maxChange": "-97880319.9709580707",
          "overPrice": "245.9290217635"
        },
        "reduce": {
          "maxChange": "0.0000000000",
          "overPrice": "245.9290217635"
        },
        "dealcurrency": "BTC"
      },
      "errCode": "0",
      "errStr": "success",
      "ret": "0"
    })
  },

  //更新持仓占用保证金
  'Post /mock/api/v1/trade/position_margin_update': (req, res) => {
    res.send({
      "head": {
        "method": "position_margin_update",
        "userId": "3",
        "userToken": "user.QC5LTHR6HOUZINUCE4YI.pcweb",
        "lang": "cn",
        "packType": "1",
        "version": "1.0",
        "msgType": "response",
        "timestamps": "1534262284859300",
        "serialNumber": "6004"
      },
      "errCode": "0",
      "errStr": "success",
      "ret": "0"
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
      "ret": "0",
      "errCode": "0",
      "errStr": "Success",
      "data": {
        "leverage": 10.0,
        "isModify": true,
        "varyRange": "0.5 5 10 50",
        "leverages": [{
          "id": 1,
          "settingId": 1,
          "initialMarginRate": 10.0,
          "leverage": 10.0,
          "createdTime": "2018-07-17 18:39:28",
          "creator": 1
        }, {
          "id": 2,
          "settingId": 1,
          "initialMarginRate": 20.0,
          "leverage": 5.0,
          "createdTime": "2018-07-17 18:39:28",
          "creator": 1
        }, {
          "id": 3,
          "settingId": 1,
          "initialMarginRate": 5.0,
          "leverage": 20.0,
          "createdTime": "2018-07-17 18:39:28",
          "creator": 1
        }, {
          "id": 10,
          "settingId": 1,
          "initialMarginRate": 2.0,
          "leverage": 50.0,
          "createdTime": "2018-08-05 10:53:24",
          "creator": 1
        }],
        "keepBailRate": "0.5%"
      }
    })
  },

  // 查询buy sell依赖详情
  'Post /mock/api/v1/gateway/Trade/OrderParameter': (req, res) => {
    res.send({
      "data": {
        "userAllowTrade": true,
        "marketAllowTrade": true,
        "marketCode": "BTCUSDT",
        "minPriceMovement": 0.5,
        "minPriceMovementDisplay": "0.5BTC",
        "maintenanceMarginRate": 0.005,
        "maintenanceMarginRateDisplay": "0.005%",
        "minTradeNum": 1,
        "minTradeNumDisplay": "1张",
        "availableBalance": _.random(10, 10000),
        "availableBalanceDisplay": "12345.0987BTC",
        "maxBuyPrice": 6296.1,
        "minSellPrice": 5929.3,
        "orderValue": _.random(10, 10000),
        "orderValueDisplay": _.random(10, 10000) + 'BTC',
        "leverages": [{
          "initialMarginRate": 20.0,
          "initialMarginRateDisplay": "20%",
          "leverage": 5.0,
          "leverageDisplay": "5倍"
        }, {
          "initialMarginRate": 10.0,
          "initialMarginRateDisplay": "10%",
          "leverage": 10.0,
          "leverageDisplay": "10倍"
        }, {
          "initialMarginRate": 5.0,
          "initialMarginRateDisplay": "5%",
          "leverage": 20.0,
          "leverageDisplay": "20倍"
        }, { "initialMarginRate": 2.0, "initialMarginRateDisplay": "2%", "leverage": 50.0, "leverageDisplay": "50倍" }],
        "margin": 0.0,
        "marginDisplay": _.random(10, 10000) + 'BTC'
      }, "ret": 0, "errCode": "", "errStr": ""
    })
  },

  //查询费率
  'Get /mock/api/v1/gateway/Trade/FeeRate': (req, res) => {
    res.send({
      "data": {
        "marketName": "BTCUSDT永续",
        "makerFeeRate": -0.00025,
        "makerFeeRateDisplay": "-0.025%",
        "takerFeeRate": 0.00075,
        "takerFeeRateDisplay": "0.075%",
        "liquidationFeeRate": 0.00075,
        "liquidationFeeRateDisplay": "0.075%",
        "deliveryRate": 0.0,
        "deliveryRateDisplay": "0%"
      }, "ret": 0, "errCode": "", "errStr": ""
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
        reasonablePrice: randomStr(10000, 100000),
        "marketPrice": "7388.47741901",
        "percent": "+50.00",
        "dollarPrice": randomStr(100, 1000),
        "price24h": randomStr(100, 1000),
        "priceLast": '+' + randomStr(100, 1000),
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
          "timestamps": "1534149622423244",
          "serialNumber": "536"
        },
        "data": [
          {
            "assetName": "BTC",
            "deposit": "119946.2641417538",
            "fee": "0.0008837178",
            "closedPNL": "0.0000000000",
            "withdrawFreeze": "0.0000000000",
            "floatingPNL": "-5036.3089753631",
            "positionMargin": "265.3114237312",
            "roe": "-1898.2631446974",
            "delegateMargin": "1.0200000000",
            "walletBalance": "119946.2641417538",
            "totalWealth": "118048.0009970564",
            "availableBalance": "118048.0009970564"
          },
          {
            "assetName": "ETH",
            "deposit": "0.0000000000",
            "fee": "0.0000000000",
            "closedPNL": "0.0000000000",
            "withdrawFreeze": "0.0000000000",
            "floatingPNL": "-6934.5721200605",
            "positionMargin": "530.6228474625",
            "roe": "-1306.8740166808",
            "delegateMargin": "2.0400000000",
            "walletBalance": "0.0000000000",
            "totalWealth": "-1306.8740166808",
            "availableBalance": "-1306.8740166808"
          },
          {
            "assetName": "XRP",
            "deposit": "0.0000000000",
            "fee": "0.0000000000",
            "closedPNL": "0.0000000000",
            "withdrawFreeze": "0.0000000000",
            "floatingPNL": "-6343.1829920440",
            "positionMargin": "795.9342711938",
            "roe": "-796.9480925264",
            "delegateMargin": "3.0600000000",
            "walletBalance": "0.0000000000",
            "totalWealth": "-796.9480925264",
            "availableBalance": "-796.9480925264"
          },
          {
            "assetName": "USDT",
            "deposit": "0.0000000000",
            "fee": "0.0000000000",
            "closedPNL": "0.0000000000",
            "withdrawFreeze": "0.0000000000",
            "floatingPNL": "-5833.2570678896",
            "positionMargin": "1061.2456949251",
            "roe": "-549.6613174294",
            "delegateMargin": "4.0800000000",
            "walletBalance": "0.0000000000",
            "totalWealth": "-549.6613174294",
            "availableBalance": "-549.6613174294"
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
          "records": (new Array(2)).fill().map((item, index) => (
            {
              "ctime": "2018-08-09 17:06:27",
              "ftime": "2018-08-09 17:06:46",
              "orderId": "19654" + index,
              "user": "3",
              "marketName": 'BTCUSDT永续',
              "market": "BTCUSDT",
              "source": "浏览器，我是现价测试买单,数量10,价格6118.5,用户id：3,邮箱：xiaoyi.wei@bcsystech.com",
              "type": "1",
              "side": "2",
              "price": "6118.50",
              "amount": "10",
              "dealAmount": "5",
              "dealMoney": "0.0008171937566397",
              "dealFee": "-0.00",
              "orderStatus": "2",
              "leverage": _.random(10, 90) + '',
              "avgDealMoney": "6118.5",
              "delegateMoney": "0.00004209",
              "unwindProfit": "--"
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


