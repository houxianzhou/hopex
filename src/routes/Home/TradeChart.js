import React, { Component } from 'react'
import { classNames, _, localSave, getRes, resOk, formatNumber } from '@utils'
import { Mixin } from "@components"
import wss from '@services/SocketClient'
import { SOCKETURL } from '@constants'
import $ from 'jquery'
import ScrollPannel from './components/ScrollPanel'
import * as styles from './index.less'

export default class View extends Component {
  componentDidMount() {
    localSave.clearAll()
  }

  startInit = () => {
    this.startKline()
    this.getImportParams()
  }

  startKline = () => {
    const { model } = this.props
    const TradingView = window.TradingView
    const Datafeeds = window.Datafeeds
    window.$ = $
    const ws1 = wss.getSocket('ws1')
    ws1.onConnect(() => {
      ws1.sendJson({
        "head": {
          "method": "kline.query",
          "msgType": "request",
          "packType": "1",
          "lang": "cn",
          "version": "1.0.0",
          "timestamps": "1439261904",
          "serialNumber": "57"
        },
        "param": {
          "market": "BTCUSD永续",
          "startTime": "1",
          "endTime": "12345699",
          "interval": "86400"
        }
      })
    })
    new TradingView.widget({
      disabled_features: ["left_toolbar", 'go_to_date'],
      library_path: '/',
      fullscreen: true,
      symbol: '股吧',
      interval: 'D',
      'container_id': 'tradeView',
      overrides: {
        "paneProperties.background": "#232833",
        "paneProperties.vertGridProperties.color": "transparent",
        "paneProperties.horzGridProperties.color": "transparent",
        // "timeScale.rightOffset":"12"
        "paneProperties.topMargin": "15",
        "paneProperties.bottomMargin": "5",
        "scalesProperties.backgroundColor": "red"

      },
      loading_screen: { backgroundColor: "#232833" },
      datafeed: {
        onReady(callback) {
          setTimeout(() => {
            callback({})
          })
        },
        searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
        },
        resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
          ws1.onMessage((e) => {
            const res = getRes(e)
            if (resOk(res)) {
              console.log(res)
              // const result = JSON.parse(res)
              // console.log(result)
            }
          })

          setTimeout(() => {
            onSymbolResolvedCallback({
              "name": "weixiaoyi",
              "timezone": "Asia/Shanghai",
              description: 'haaaaaaa',
              "exchange": "交易所的略称", //交易所的略称
              // "exchange-traded": "NasdaqNM",
              // "exchange-listed": "NasdaqNM",
              "minmov": 1,//最小波动
              "pricescale": 100,//价格精
              "minmov2": 0, //格式化复杂情况下的价格

              "pointvalue": 1,
              "session": "24x7",
              "has_intraday": true, // 是否具有日内（分钟）历史数据
              "has_no_volume": false, //布尔表示商品是否拥有成交量数据
              has_empty_bars: true,
              "type": "stock",
              supported_resolutions: ['D', '1W', '1M'],// 分辨率选择器中启用一个分辨率数组
              // "ticker": "AAPL", // 品体系中此商品的唯一标识符
              // "base_name": ["AAPL"],
              // "legs": ["AAPL"],
              // "full_name": "NasdaqNM:AAPL",
              // "pro_name": "NasdaqNM:AAPL",
              // "data_status": "streaming" //数据状态码。状态显示在图表的右上角。streaming(实时)endofday(已收盘)pulsed(脉冲)
            })
          })
        },
        getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
          // const a = _.debounce(() => {
          //   this.getKline().then((res = []) => {
          //     const data = res.map(item => ({
          //       time: Number(item[0]) * 1000,
          //       open: Number(item[1]),
          //       close: Number(item[2]),
          //       high: Number(item[3]),
          //       low: Number(item[4]),
          //       volume: Number(item[5]),
          //       price: Number(item[6]),
          //       name: item[7]
          //     }))
          //     onHistoryCallback(data)
          //   })
          // }, 2000)
          // a()
        },
        getMarks(symbolInfo, startDate, endDate, onDataCallback, resolution) {
        },
        subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
          const a = _.debounce(() => {
            onRealtimeCallback({
                "time": 1530464461000,
                "close": 149.56,
                "open": _.random(100, 500),
                "high": 150.9,
                "low": 148.57,
                "volume": 1000
              }
            )
          }, 1000)
          a()
        }
      },
      locale: 'zh',
    })
  }

  getKline = () => {
    const { dispatch, modelName } = this.props
    return dispatch({
      type: `${modelName}/getKline`,
      payload: {
        mode: 'http'
      }
    })
  }

  getImportParams = () => {
    const ws2 = wss.getSocket('ws2')
    const { dispatch, modelName } = this.props
    ws2.onConnect(
      () => {
        ws2.sendJson({
          "event": "subscribe",
          "channel": "market",
          "pair": "BTCUSD",
          "type": 1
        })
      }
    )
    ws2.onMessage(
      (e) => {
        const res = getRes(e)
        if (resOk(res)) {
          const result = JSON.parse(res.data)
          const { minPrice, maxPrice, price } = result
          if (minPrice || maxPrice) {
            dispatch({
              type: `${modelName}/changeState`,
              payload: {
                maxPrice: formatNumber(maxPrice, 2),
                minPrice: formatNumber(minPrice, 2),
                indexPrice: formatNumber(price, 2)
              }
            })
          }
        } else {
          console.log('socket返回连接错误')
        }
      }
    )
  }


  render() {
    const { model: { market, maxPrice, minPrice, indexPrice, latestPrice } } = this.props
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.tradeChart
            )
          }
        >
          <ScrollPannel
            scrollConfig={{
              mouseWheel: false
            }}
          >
            <div style={{
              flexDirection: 'column',
              display: 'flex',
              width: '100%',
              height: '100%',
            }} >
              <div className={styles.header} >
                <div className={styles.content} >
                  <div className={styles.left} >
                    {
                      market ? (
                        <>
                          <div className={styles.marketname} >{market}</div >
                          < div className={styles.latestprice} >{latestPrice}</div >
                          <div className={styles.compare} >13.45</div >
                        </>
                      ) : null
                    }
                  </div >
                  <div className={styles.right} >
                    <ul >
                      <li >
                        <div className={styles.title} >现货价格指数</div >
                        <div className={styles.desc} >{indexPrice}</div >
                      </li >
                      <li >
                        <div className={styles.title} >合理价格</div >
                        <div className={styles.desc} >暂无</div >
                      </li >
                      <li >
                        <div className={`${styles.title}`} >24h最高</div >
                        <div className={`${styles.desc} ${styles.maxprice}`} >{maxPrice}</div >
                      </li >
                      <li >
                        <div className={styles.title} >24h最低</div >
                        <div className={`${styles.desc} ${styles.lowprice}`} >{minPrice}</div >
                      </li >
                      <li >
                        <div className={styles.title} >24h交易额</div >
                        <div className={styles.desc} >暂无</div >
                      </li >
                    </ul >
                  </div >
                </div >
              </div >
              <div className={styles.tradeview} >
                <div id='tradeView' style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%'
                }} >
                </div >
              </div >
            </div >
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

