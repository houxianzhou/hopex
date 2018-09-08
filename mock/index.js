import { delay } from 'roadhog-api-doc'
import { _ } from 'lodash'

import helper from './helper'

const { randomArrayMap, randomStr } = helper

const other = {
  "errCode": "0",
  "errStr": "success",
  "ret": "0"
}

export default delay({
  // 合约列表
  'Get /mock/api/v1/gateway/Home/Contracts': (req, res) => {
    res.send({
      "data": [{
        "name": "BTC",
        "list": [{
          "priceLast": "+6700.0",
          "direction": 0,
          "contractCode": "BTCUSDT",
          "contractName": "BTCUSDT永续",
          "percent": "0.00%",
          "dollarPrice": "$6700.00",
          "totalPrice24h": "0BTC",
          "position": true,
          "pause": false
        }]
      }, {
        "name": "ETH",
        "list": [{
          "priceLast": "0.0",
          "direction": 0,
          "contractCode": "ETHBTC",
          "contractName": "ETHBTC永续",
          "percent": "",
          "dollarPrice": "$0.00",
          "totalPrice24h": "",
          "position": false,
          "pause": true
        }, {
          "priceLast": "+270.0",
          "direction": 0,
          "contractCode": "ETHUSDT",
          "contractName": "ETHUSDT永续",
          "percent": "0.00%",
          "dollarPrice": "$270.00",
          "totalPrice24h": "0ETH",
          "position": false,
          "pause": false
        }]
      }, {
        "name": "XRP",
        "list": [{
          "priceLast": "0",
          "direction": 0,
          "contractCode": "XRPUSDT",
          "contractName": "XRPUSDT永续",
          "percent": "",
          "dollarPrice": "$0.00",
          "totalPrice24h": "",
          "position": false,
          "pause": true
        }, {
          "priceLast": "0",
          "direction": 0,
          "contractCode": "XRPETH",
          "contractName": "XRPETH永续",
          "percent": "",
          "dollarPrice": "$0.00",
          "totalPrice24h": "",
          "position": false,
          "pause": true
        }, {
          "priceLast": "+0.0000678",
          "direction": 0,
          "contractCode": "XRPBTC",
          "contractName": "XRPBTC永续",
          "percent": "0.00%",
          "dollarPrice": "$0.44",
          "totalPrice24h": "0BTC",
          "position": false,
          "pause": false
        }]
      }, {
        "name": "EOS",
        "list": [{
          "priceLast": "+0.0007501",
          "direction": 0,
          "contractCode": "EOSBTC",
          "contractName": "EOSBTC永续",
          "percent": "0.00%",
          "dollarPrice": "$5.42",
          "totalPrice24h": "0BTC",
          "position": false,
          "pause": true
        }, {
          "priceLast": "+0.01750",
          "direction": 0,
          "contractCode": "EOSETH",
          "contractName": "EOSETH永续",
          "percent": "0.00%",
          "dollarPrice": "$7.89",
          "totalPrice24h": "0ETH",
          "position": false,
          "pause": false
        }]
      }, {
        "name": "LTC",
        "list": [{
          "priceLast": "+0.00858",
          "direction": 0,
          "contractCode": "LTCBTC",
          "contractName": "LTCBTC永续",
          "percent": "0.00%",
          "dollarPrice": "$54.77",
          "totalPrice24h": "0BTC",
          "position": false,
          "pause": false
        }]
      }, {
        "name": "BCH",
        "list": [{
          "priceLast": "0",
          "direction": 0,
          "contractCode": "BCHUSDT",
          "contractName": "BCHUSDT永续",
          "percent": "",
          "dollarPrice": "$0.00",
          "totalPrice24h": "",
          "position": false,
          "pause": true
        }, {
          "priceLast": "0.00000",
          "direction": 0,
          "contractCode": "BCHBTC",
          "contractName": "BCHBTC永续",
          "percent": "",
          "dollarPrice": "$0.00",
          "totalPrice24h": "",
          "position": false,
          "pause": false
        }, {
          "priceLast": "0.0000",
          "direction": 0,
          "contractCode": "BCHETH",
          "contractName": "BCHETH永续",
          "percent": "",
          "dollarPrice": "$0.00",
          "totalPrice24h": "",
          "position": false,
          "pause": false
        }]
      }], "ret": 0, "errCode": "", "errStr": ""
    })
  },
  //最新成交
  'Get /mock/api/v1/gateway/Home/GetDeals': (req, res) => {
    // res.send(401)
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
      "data": [{
        "id": _.random(101, 200),
        "time": "任意值",
        "fillPrice": randomStr(1000, 10000),
        "fillQuantity": randomStr(10000, 20000),
        "side": ["2", '1'][_.random(0, 1)]
      }].concat(randomArrayMap(4).map((item, index) => (
        {
          "id": _.random(101, 200),
          "time": "任意值",
          "fillPrice": randomStr(1000, 10000),
          "fillQuantity": randomStr(10000, 20000),
          "side": ["2", '1'][_.random(0, 1)]
        }
      ))),
      ...other
    })
  },
  //委托列表
  'Post /mock/api/v1/gateway/OrderBook/Index': (req, res) => {
    res.send({
      "head": {
        "method": "contract.order_book",
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
            "orderPrice": index * 100 + 10000 + _.random(1, 20),
            "orderQuantityShow": res,//randomStr()
            "orderQuantity": res,//randomStr()
          }
        }),
        asksFilter: "20116.0",
        bidsFilter: "10",
        "bids": randomArrayMap(5).map((item, index) => {
          const res = _.random(10000, 20000)
          return {
            "exist": ['0', '1'][_.random(0, 1)],
            "orderPrice": index * 80 + 8000 + _.random(1, 20),
            "orderQuantityShow": res,//randomStr()
            "orderQuantity": res,//randomStr()
          }
        })
      },
      ...other
    })
  },

  //委托区间
  'Get /mock/api/v1/gateway/OrderBook/Intervals': (req, res) => {
    res.send({
      "data": {
        "contractCode": "BTCUSDT",
        "contractName": "BTCUSDT永续",
        "intervals": ["0.5", "5", "10", "50"]
      }, "ret": 0, "errCode": "", "errStr": ""
    })
  },
  //用户的委托列表
  'Get /mock/api/v1/gateway/User/OpenOrders': (req, res) => {
    res.send({
      "data": (new Array(0)).fill().map(item => (
        {
          "orderId": 870,
          "contractCode": "BTCUSDT",
          "contractName": "BTCUSDT永续",
          "type": "1",
          "side": "2",
          "sideDisplay": "买入",
          "ctime": "2018-09-03 10:18:02",
          "mtime": "2018-09-03 10:18:02",
          "orderQuantity": "1",
          "leftQuantity": "1",
          "fillQuantity": "0",
          "orderStatus": ['1', '2', '3'][_.random(0, 3)],
          "orderStatusDisplay": "等待成交",
          "orderPrice": "0.5",
          "leverage": "20.00",
          "fee": "0.0000BTC",
          "avgFillMoney": "0.00",
          "orderMargin": "0.0000BTC"
        }
      )),
      "ret": 0, "errCode": "", "errStr": ""
    })
  },
  //用户的委托明细
  'Get /mock/api/v1/gateway/User/OrderDeals': (req, res) => {
    res.send({
      "data": (new Array(20)).fill().map(item => (
        {
          "time": "2018-08-02 17:49:27",
          "role": "2",
          "fillPrice": "222",
          "fillQuantity": "11",
          "fee": "0.0004954954954955"
        }
      )),
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
  'Get /mock/api/v1/gateway/User/Positions': (req, res) => {
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
      "data": (new Array(5)).fill().map((item, index) => {
        const arryas = ['BTC', 'USDT', 'EOC', 'w', 'b']
        return {
          "allowFullClose": false,
          "contractCode": arryas[index],
          "contractName": "BTCUSDT永续",
          "leverage": "20.00",
          "contractValue": "1",
          "maintMarginRate": "0.005",
          "takerFee": "0.00075",
          "positionQuantity": "-37",
          "entryPrice": "6602.70",
          "positionMargin": "0.0000BTC",
          "liquidationPrice": "6564.77",
          "maintMargin": "-1403.6722BTC",
          "unrealisedPnl": "+4088.9804BTC",
          "unrealisedPnlPcnt": "-291.31%",
          "fairPrice": "6713.2",
          "lastPrice": "6713.2"
        }
      }),
      ...other
    })
  },

  //查询持仓占用保证金
  'Get /mock/api/v1/gateway/User/AppendPositionMarginQuery': (req, res) => {
    res.send({
      "data": {
        "increase": { "maxChange": "7.9987BTC", "liquidationPrice": "1000000.00" },
        "reduce": { "maxChange": "2.0000BTC", "liquidationPrice": "1000000.00" },
        "dealcurrency": "BTC"
      }, "ret": 0, "errCode": "", "errStr": ""
    })
  },

  //更新持仓占用保证金
  'Post /mock/api/v1/gateway/User/UpdatePositionMargin': (req, res) => {
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
  'Get /mock/api/v1/gateway/User/CancelOrder': (req, res) => {
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
  'Get /mock/api/v1/gateway/Trade/GetLeverageSetting': (req, res) => {
    res.send({
      "data": {
        "leverage": 10.0000,
        "editable": true,
        "varyRange": "0.5 5 10 50",
        "maintenanceMarginRate": 0.005,
        "leverages": [{
          "initialMarginRate": "20",
          "initialMarginRateDisplay": "20%",
          "leverage": "5.00",
          "leverageDisplay": "5.00倍"
        }, {
          "initialMarginRate": "10",
          "initialMarginRateDisplay": "10%",
          "leverage": "10.00",
          "leverageDisplay": "10.00倍"
        }, {
          "initialMarginRate": "5",
          "initialMarginRateDisplay": "5%",
          "leverage": "20.00",
          "leverageDisplay": "20.00倍"
        }, {
          "initialMarginRate": "2",
          "initialMarginRateDisplay": "2%",
          "leverage": "50.00",
          "leverageDisplay": "50.00倍"
        }]
      }, "ret": 0, "errCode": "", "errStr": ""
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
        "minPricePrecision": 9,
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
  'Get /mock/api/v1/gateway/Trade/SetLeverage': (req, res) => {
    res.send({
      "errCode": "0",
      "errStr": "success",
      "ret": "0"
    })
  },

  //k线图
  'Get /mock/api/v1/gateway/Home/KLines': (req, res) => {
    const { query: { startTime, endTime } = {} } = req
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
      "data": periods.map(item => {
        const h = _.random(30, 40)
        const o = _.random(10, 20)
        const c = _.random(10, 30)
        const l = _.random(10, 20)
        const v = _.random(100, 3000)
        // const h = 160 + _.random(30, 40)
        // const o = h - _.random(10, 20)
        // const c = o - _.random(10, 30)
        // const l = c - _.random(10, 20)
        // const v = _.random(100, 3000)
        return [item / 1000, o, c, h, l, v, 6, 'BTCUSD永续']
      }),
      "errCode": "0",
      "errStr": "success",
      "ret": "0"
    })
  },

  //k线图依赖数据详情
  'Get /mock/api/v1/gateway/Home/ContractSummary': (req, res) => {

    res.send({
      "data": {
        "contractCode": "BTCUSDT",
        "contractName": "BTCUSDT永续",
        "allowTrade": true,
        "pause": false,
        "lastPrice": "+6700.0",
        "lastPriceToUSD": "$6700.00",
        "direction": 0,
        "changePercent24": "0.00%",
        "marketPrice": "7276.60",
        "fairPrice": "6713.22",
        "price24Max": "6700.0",
        "price24Min": "6700.0",
        "amount24h": "0BTC"
      }, "ret": 0, "errCode": "", "errStr": ""
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
            "floatingPNL": "+0.0000",
            "positionMargin": "265.3114237312",
            "roe": "-0.0000",
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
  'Post /mock/api/v1/gateway/User/HistoryOrders': (req, res) => {
    const { typeList = [] } = req.body.param
    const { page: pageIndex = 1, limit: pageSize = 10, } = req.query
    const type = typeList[0]
    const total = 200
    const records = (new Array(pageIndex ? total : 3)).fill().map((item, index) => (
      {
        "orderId": 886,
        "contractCode": "BTCUSDT",
        "contractName": "BTCUSDT永续",
        "type": "1",
        "side": "1",
        "sideDisplay": "卖出",
        "ctime": "2018-09-04 17:56:36",
        "ftime": "2018-09-04 17:56:36",
        "orderQuantity": "1",
        "fillQuantity": "0",
        "orderStatus": ['1', '2', '3'][_.random(0, 3)],
        "orderStatusDisplay": "已撤销",
        "orderPrice": "7890.0",
        "leverage": _.random(10, 90) + '',
        "fee": "--",
        "avgFillMoney": "--",
        "closePosPNL": "--"
      }
    ))
    res.send(
      {
        "data": {
          "totalCount": records.length + '',
          "result": records.slice(Number(pageIndex) * pageSize, (Number(pageIndex) + 1) * pageSize),
          "page": pageIndex,
          "pageSize": pageSize
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

  //下限价、市价单
  'Post /mock/api/v1/gateway/User/Order ': (req, res) => {
    res.send(
      {
        "data": '',
        "errCode": "0",
        "errStr": "success",
        "ret": "0"
      }
    )
  },

  //全平
  'Post /mock/api/v1/gateway/User/FullClose': (req, res) => {
    res.send(
      {
        "data": '',
        "errCode": "0",
        "errStr": "success",
        "ret": "0"
      }
    )
  },

  //概况
  'Get /mock/api/v1/gateway/Trade/Summary': (req, res) => {
    res.send(
      {
        "data": {
          "summary": {
            "profitRate": "-31.98% ",
            "totalWealth": "9.67954696",
            "totalWealthUSD": "65030.61USD",
            "floatProfit": "+0.00009094",
            "floatProfitUSD": "-0.61USD",
            "availableBalance": "9.99896705",
            "availableBalanceUSD": "67176.59USD"
          },
          "detail": [{
            "assetName": "BTC",
            "assetLogoUrl": "http://hopex.com/api/v1/gateway/files/logos/btc.png",
            "floatProfit": "-0.00009094",
            "floatProfitUSD": "-0.61USD",
            "profitRate": "-0.32% ",
            "totalWealth": "9.67954696",
            "totalWealthUSD": "65030.61USD",
            "availableBalance": "9.99896705",
            "availableBalanceUSD": "67176.59USD",
            "positionMargin": "0.00028439",
            "positionMarginUSD": "1.91USD",
            "delegateMargin": "0.00005753",
            "delegateMarginUSD": "0.39USD",
            "withdrawFreeze": "0.00000000",
            "withdrawFreezeUSD": "0.00USD",
            "walletBalance": "9.99930897",
            "walletBalanceUSD": "67178.88USD"
          }, {
            "assetName": "ETH",
            "assetLogoUrl": "http://hopex.com/api/v1/gateway/files/logos/eth.png",
            "floatProfit": "0.00000000",
            "floatProfitUSD": "0.00USD",
            "profitRate": "0.00% ",
            "totalWealth": "0.00000000",
            "totalWealthUSD": "0.00USD",
            "availableBalance": "0.00000000",
            "availableBalanceUSD": "0.00USD",
            "positionMargin": "0.00000000",
            "positionMarginUSD": "0.00USD",
            "delegateMargin": "0.00000000",
            "delegateMarginUSD": "0.00USD",
            "withdrawFreeze": "0.00000000",
            "withdrawFreezeUSD": "0.00USD",
            "walletBalance": "0.00000000",
            "walletBalanceUSD": "0.00USD"
          }]
        }, "ret": 0, "errCode": "", "errStr": ""
      }
    )
  },

  //存款
  'Get /mock/api/v1/User/GetUserAssetWalletAddr': (req, res) => {
    const asset = req.query.asset
    let sendasset
    if (asset === 'BTC') {
      sendasset = {
        "qrCodeImgUrl": "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png",
        "address": "18WY7rBJYnNL16UzG4omYjqUy9jJHnoPo9",
        "prompts": ["* 请不要向上述地址充值任何非BTC资产，否则将不可找回。", "* 最低存款额为 0.001BTC (100000 聪)。", "* 你的比特币会在6个网络确认后到帐。", "* 所有Hopex的存款地址都是多重签名冷钱包地址，所有钱包均不曾被联网的机器读取。"]
      }
    } else {
      sendasset = {
        "qrCodeImgUrl": "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png",
        "address": "0xf0e1abd140d9e7df1bcf06f9879b0d3b76deee06",
        "prompts": ["* 请不要向上述地址充值任何非ETH资产，否则将不可找回。", "* 最低存款额为 0.01ETH。", "* 你的ETH会在30个网络确认后到帐。", "* 所有Hopex的存款地址都是多重签名冷钱包地址，所有钱包均不曾被联网的机器读取。"]
      }
    }
    res.send(
      {
        "data": sendasset, "ret": 0, "errCode": "", "errStr": ""
      }
    )
  },


  //提现获取依赖详情
  'Get /mock/api/v1/User/GetWithdrawParameter': (req, res) => {
    const asset = req.query.asset
    let sendasset
    if (asset === 'BTC') {
      sendasset = {
        "enableTwoFactories": false,
        "commission": "0.00100000",
        "minAmount": "0.01000000",
        "maxAmount": "9.99896705",
        "allowWithdraw": true,
        "prompts": ["最小提现数量为:0.01000000BTC", "请勿直接提现至众筹或ICO地址.我们不会处理未来代币的发放。", "* 基于安全理由，Hopex每日只会人工审核并处理提现一次，有关我们的政策请参阅安全规范。", "* 在 13:00 UTC (大约 10 小时) 前提交的提款请求，会进入当天的批处理队列。"],
        "isValid": true
      }
    } else {
      sendasset = {
        "enableTwoFactories": false,
        "commission": "0.00500000",
        "minAmount": "0.05000000",
        "maxAmount": "0.00000000",
        "allowWithdraw": true,
        "prompts": ["最小提现数量为:0.05000000ETH", "请勿直接提现至众筹或ICO地址.我们不会处理未来代币的发放。", "* 基于安全理由，Hopex每日只会人工审核并处理提现一次，有关我们的政策请参阅安全规范。", "* 在 13:00 UTC (大约 10 小时) 前提交的提款请求，会进入当天的批处理队列。"],
        "isValid": true
      }
    }
    res.send(
      {
        "data": sendasset, "ret": 0, "errCode": "", "errStr": ""
      }
    )
  },

  //发送提现确认邮件
  'Post /mock/api/v1/User/SendEmailToWithdraw': (req, res) => {
    res.send(
      // {
      //   "ret": -1, "errCode": "", "errStr": "请先开启谷歌验证"
      // }
      { "data": "", "ret": 0, "errCode": "", "errStr": "" }
    )

  },

  //提现申请
  'Post /mock/api/v1/User/WithdrawApply': (req, res) => {
    res.send(
      { "data": "", "ret": 0, "errCode": "", "errStr": "" }
    )

  },

  //获取资金记录
  'Get /mock/api/v1/User/GetTrans': (req, res) => {
    const { page: pageIndex, limit: pageSize = 10, } = req.query
    const total = 99
    const records = (new Array(total)).fill().map((item, index) => (
      {
        "asset": "BTC",
        "type": ["提现", '存款'][_.random(0, 1)],
        "status": ["进行中", '已完成', '已拒绝'][_.random(0, 2)],
        "statusVal": 0,
        "amount": "-1.00000000BTC",
        "createdTime": "2018-09-01 16:19:55" + index,
        "txid": "222222222223333333333",
        "addr": "wwwwwwwwwwwwwwwwwwwww444444444444444444444222",
        "addrUrl": "https://btc.com/",
        "txidUrl": "https://btc.com/"
      }
    ))
    res.send(
      {
        "data": {
          "totalCount": records.length,
          "page": 1,
          "pageSize": pageSize,
          "result": records.slice(Number(pageIndex - 1) * pageSize, (Number(pageIndex)) * pageSize),
        }, "ret": 0, "errCode": "", "errStr": ""
      }
    )

  },

  //网络状态
  'Head /mock/api/v1/gateway/home/ping': (req, res) => {
    res.sendStatus(200)
  },

}, 100)


