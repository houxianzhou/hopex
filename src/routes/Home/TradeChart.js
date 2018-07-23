import React, { Component } from 'react'
import { classNames, _, localSave, getRes, resOk, formatNumber, formatJson } from '@utils'
import { Mixin } from "@components"
import wss from '@services/SocketClient'
import $ from 'jquery'
import ScrollPannel from './components/ScrollPanel'
import * as styles from './index.less'

export default class View extends Component {
  componentDidMount() {
    localSave.clearAll()
  }

  startInit = () => {
    this.startKline()
    // this.getImportantPrice()
  }

  startKline = () => {
    const { model, dispatch, modelName } = this.props
    const TradingView = window.TradingView
    // const Datafeeds = window.Datafeeds
    // window.$ = $
    const ws1 = wss.getSocket('ws1')
    if (!this.chart) {
      this.chart = new TradingView.widget({
        disabled_features: [
          "left_toolbar",
          'go_to_date',
          'use_localstorage_for_settings',
          'save_chart_properties_to_local_storage',
          'header_widget',
          'edit_buttons_in_legend',
          'context_menus',
          'main_series_scale_menu',
          'adaptive_logo',
          'show_logo_on_all_charts',
          'display_market_status',
          'remove_library_container_border',
          'chart_property_page_style',
          'control_bar',
          'timeframes_toolbar',
          'chart_property_page_background'
        ],
        library_path: '/',
        fullscreen: true,
        symbol: '股吧',
        // interval: 'D',
        'container_id': 'tradeView',
        overrides: {
          "paneProperties.background": "#232833",
          "paneProperties.vertGridProperties.color": "transparent",
          "paneProperties.horzGridProperties.color": "transparent",
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
            ws1.onConnectPromise().then(() => {
              onSymbolResolvedCallback({
                "name": "weixiaoyi",
                "timezone": "Asia/Shanghai",
                description: 'haaaaaaa',
                "exchange": "交易所的略称", //交易所的略称
                "minmov": 1,//最小波动
                "pricescale": 100,//价格精
                "minmov2": 0, //格式化复杂情况下的价格
                "pointvalue": 1,
                "session": "24x7",
                "has_intraday": true, // 是否具有日内（分钟）历史数据
                "has_no_volume": false, //布尔表示商品是否拥有成交量数据
                has_empty_bars: true,
                "type": "stock",
                // supported_resolutions: ['D', '1W', '1M'],// 分辨率选择器中启用一个分辨率数组
                // "ticker": "AAPL", // 品体系中此商品的唯一标识符
                "data_status": "streaming" //数据状态码。状态显示在图表的右上角。streaming(实时)endofday(已收盘)pulsed(脉冲)
              })
            })
          },
          getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
            console.log(resolution)
            const [startTime, endTime] = [String(Math.min(from, to)), String(Math.max(from, to))]
            dispatch({
              type: `${modelName}/getKlineAllList`,
              payload: {
                startTime,
                endTime
              }
            }).then((result = []) => {
              const data = result.map(item => ({
                time: Number(item[0]) * 1000,
                open: Number(item[1]),
                close: Number(item[2]),
                high: Number(item[3]),
                low: Number(item[4]),
                volume: Number(item[5]),
                price: Number(item[6]),
                name: item[7]
              }))
              onHistoryCallback(data, { noData: true })
            })
          },
          getMarks(symbolInfo, startDate, endDate, onDataCallback, resolution) {
          },
          subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
            // dispatch({
            //   type: `${modelName}/getKlineAddMore`
            // })
            // ws1.onConnectPromise().then(() => {
            //   dispatch({
            //     type: `${modelName}/getImportantPrice`,
            //     payload: {
            //       method: 'sub'
            //     }
            //   }).then(res => {
            //     console.log('getImportantPrice订阅成功')
            //     chanId = res
            //   })
            // })

            // console.log('2')
            // const a = _.debounce(() => {
            //   onRealtimeCallback({
            //       "time": 1530464461000,
            //       "close": 149.56,
            //       "open": _.random(100, 500),
            //       "high": 150.9,
            //       "low": 148.57,
            //       "volume": 1000
            //     }
            //   )
            // }, 1000)
            // a()
          },
          unsubscribeBars(subscriberUID) {

          }
        },
        locale: 'zh',
      })
      // this.chart.onChartReady(function() {
      //   // this.chart().createStudy('MACD', false, false, [14, 30, "close", 9])
      // })
    } else {
      this.chart.setSymbol('股吧2', 100, () => {
        return true
      })
    }
  }

  componentWillUnmount() {
    this.chart && this.chart.remove()
  }

  getImportantPrice = () => {
    let chanId
    const ws2 = wss.getSocket('ws2')
    const { dispatch, modelName } = this.props
    ws2.onConnectPromise().then(() => {
      dispatch({
        type: `${modelName}/getImportantPrice`,
        payload: {
          method: 'sub'
        }
      }).then(res => {
        console.log('getImportantPrice订阅成功')
        chanId = res
      })
    })
    ws2.listen({
      name: 'getImportantPrice',
      subscribe: (e) => {
        const res = getRes(e)
        if (resOk(res)) {
          const result = formatJson(res.data)
          const { minPrice, maxPrice, price } = result
          if (minPrice || maxPrice || price) {
            dispatch({
              type: `${modelName}/changeState`,
              payload: {
                ...maxPrice ? { maxPrice: formatNumber(maxPrice, 4) } : {},
                ...minPrice ? { minPrice: formatNumber(minPrice, 4) } : {},
                ...price ? { indexPrice: formatNumber(price, 4) } : {}
              }
            })
          }
        }
      },
      unsubscribe: () => {
        if (chanId) {
          return dispatch({
            type: `${modelName}/getImportantPrice`,
            payload: {
              method: 'unsub',
              chanId
            }
          }).then(res => console.log('getImportantPrice 取消订阅成功'))
        }
      },
      restart: () => {
        this.getImportantPrice()
      }
    })
  }


  render() {
    const { model: { marketName = '', maxPrice, minPrice, indexPrice, latestPrice } } = this.props
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
            scroller={false}
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
                      marketName ? (
                        <>
                          <div className={styles.marketname} >{marketName}</div >
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
              <div className={styles.intervalbuttons} >
                <ul >
                  <li >1</li >
                  <li >1</li >
                </ul >
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

