import React, { Component } from 'react'
import { classNames, _, localSave, getRes, resOk, formatNumber, formatJson } from '@utils'
import { Mixin } from "@components"
import wss from '@services/SocketClient'
import $ from 'jquery'
import ScrollPannel from './components/ScrollPanel'
import * as styles from './index.less'

export default class View extends Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    // localSave.clearAll()
  }

  startInit = () => {
    this.startKline()
    this.getImportantPrice()
  }


  changeState = (payload) => {
    this.setState(payload)
  }

  startKline = () => {
    const { model: { marketCode }, dispatch, modelName } = this.props
    const TradingView = window.TradingView
    // const Datafeeds = window.Datafeeds
    // window.$ = $
    const ws1 = wss.getSocket('ws1')
    const widget = new TradingView.widget({
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
      width: '100%',
      ...marketCode ? { symbol: marketCode } : {},
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
              "name": "",
              "timezone": "Asia/Shanghai",
              description: '',
              "exchange": "", //交易所的略称
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


    widget.onChartReady(() => {
      this.changeState({ loaded: true })
      this.widget = widget
      // this.widget.chart().executeActionById('showCountdown')

      // widget.subscribe('indicators_dialog',(data)=>{
      //   console.log(data);
      // })
      // this.chart().createStudy('MACD', false, false, [14, 30, "close", 9])
    })
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
        if (e && e.data) e.data = formatJson(e.data)
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
    const { loaded } = this.state
    const { model: { marketName = '', maxPrice, minPrice, indexPrice, latestPrice } } = this.props
    const intervals = [
      { name: '1min' }, { name: '5min' }, { name: '15min' }, { name: '30min' },
      { name: '1hour' }, { name: '4hour' }, { name: '1day' }, { name: '5day' }, { name: '1week' }, { name: '1mon' }
    ]
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
              <div className={styles.utilsbuttons} >
                {
                  loaded ? (
                    <>
                      <ul className={styles.interval} >
                        {
                          intervals.map((item, index) => (
                            <li key={index} >{item.name}</li >
                          ))
                        }
                      </ul >
                      <ul className={styles.utils} >
                        <li className={styles.indicator} onClick={() => {
                          this.widget && this.widget.chart().executeActionById('insertIndicator')
                        }} >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" width="17" height="17" >
                            <path
                              d="M16 0a1 1 0 0 0-1 1 1 1 0 0 0 .127.484L13.017 5A1 1 0 0 0 13 5a1 1 0 0 0-.258.035L10.965 3.26A1 1 0 0 0 11 3a1 1 0 0 0-1-1 1 1 0 0 0-1 1 1 1 0 0 0 .082.393L7.12 6.008a1 1 0 0 0-.12-.01 1 1 0 0 0-.44.104l-1.564-1.04A1 1 0 0 0 5 4.998a1 1 0 0 0-1-1 1 1 0 0 0-1 1 1 1 0 0 0 .002.066l-1.56 1.04A1 1 0 0 0 1 5.998a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-.002-.064l1.56-1.04A1 1 0 0 0 4 6a1 1 0 0 0 .44-.103l1.564 1.04A1 1 0 0 0 6 7a1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-.082-.39l1.965-2.62A1 1 0 0 0 10 4a1 1 0 0 0 .258-.035l1.777 1.777A1 1 0 0 0 12 6a1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-.127-.482L15.983 2A1 1 0 0 0 16 2a1 1 0 0 0 1-1 1 1 0 0 0-1-1zm-1 5v10h2V5h-2zM9 7v8h2V7H9zM3 9v6h2V9H3zm9 1v5h2v-5h-2zM0 11v4h2v-4H0zm6 0v4h2v-4H6z"
                              fill='white' />
                          </svg >
                        </li >
                      </ul >
                    </>
                  ) : null
                }

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

