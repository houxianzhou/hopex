import React, { Component } from 'react'
import { classNames, _, isEqual, SetFullScreen } from '@utils'
import { Mixin } from "@components"
import { THEME } from '@constants'
import wss from '@services/SocketClient'
import { chartProperties, insertIndicator, fullScreen } from '@assets'
import RedGreenSwitch from '@routes/Components/RedGreenSwitch'
import ScrollPannel from './components/ScrollPanel'
import * as styles from './index.less'

const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
const XYcolor = '#778094'

export default class TradeChart extends Component {
  constructor(props) {
    super(props)
    this.studies = []
    this.state = {
      loaded: false,
      map: 1,
      time: '1D'
    }
    this.ApplayPromiseList = []
  }

  componentWillUnmount() {
    window.onresize = null
  }

  componentDidUpdate(prevProps, prevState) {
    const { model: { ensure_records: prevEnsure_records, }, RG: prevRG, theme: prevTheme } = prevProps
    const { model: { ensure_records, }, RG, theme } = this.props
    const { map: prevMap } = prevState
    const { map } = this.state
    if (!isEqual(prevEnsure_records, ensure_records) && prevEnsure_records && ensure_records && map === 2) {
      this.startDeepMap()
    }
    if (!isEqual(prevMap, map)) {
      if (map === 1) {
        // this.startKline()
      } else {
        this.startDeepMap()
      }
    }
    if (!isEqual(prevRG, RG) || !isEqual(prevTheme, theme)) {
      const { overrides, studies_overrides } = this.getChangedStyle()
      this.widgetApplayPromise(() => {
        this.widget.applyOverrides(
          overrides
        )
      })
      this.widgetApplayPromise(() => {
        this.widget.applyStudiesOverrides(
          studies_overrides
        )
      })
    }
  }

  widgetApplayPromise = (func) => {
    if (_.isFunction(func)) {
      if (this.widget) {
        func()
      } else {
        this.ApplayPromiseList.push(func)
      }
    }
  }


  componentDidMount() {
    // localSave.clearAll()
  }

  startInit = () => {
    this.startKline()
    this.startKlineDetail()
    this.startKlineDetailWs()
  }

  getChangedStyle = () => {
    const { RG, theme } = this.props
    const backColor = theme === THEME.LIGHT ? 'white' : '#1D1D1D'
    const green = RG ? "#00C087" : "#FF7858"
    const red = RG ? "#FF7858" : "#00C087"
    const greenOpacity = RG ? "rgba(255,120,88,.4)" : "rgba(0,192,135,.4)"
    const redOpacity = RG ? "rgba(0,192,135,.4)" : "rgba(255,120,88,.4)"
    return {
      overrides: {
        "mainSeriesProperties.candleStyle.upColor": green,
        "mainSeriesProperties.candleStyle.borderUpColor": green,
        "mainSeriesProperties.candleStyle.wickUpColor": green,

        "mainSeriesProperties.candleStyle.downColor": red,// "#d75442",
        "mainSeriesProperties.candleStyle.borderDownColor": red,
        "mainSeriesProperties.candleStyle.wickDownColor": red,

        "paneProperties.background": backColor,
      },
      studies_overrides: {
        //--------------------volume的颜色设置
        "volume.volume.color.0": greenOpacity,
        "volume.volume.color.1": redOpacity,
      }
    }
  }

  startDeepMap = () => {
    const { model: { ensure_records: { asks = [], bids = [] } = {}, asksFilter = '', bidsFilter = '' } } = this.props
    const deepChart = document.getElementById('deepChart')
    if (!deepChart) return
    const myChart = echarts.init(deepChart)

    const dataAsks = asks.filter((item = {}) => Number(item.price) < Number(asksFilter)).reduce((sum, item) => {
      return [[item.price, item.sum]].concat(sum)
    }, [])

    const dataBids = bids.filter((item = {}) => Number(item.price) > Number(bidsFilter)).reduce((sum, item) => {
      return [[item.price, item.sum]].concat(sum)
    }, [])

    const getSeries = (config = {}) => {
      const { name, step = '', colorStops = [], lineStyleColors = '', itemStyleColors = '', data = [] } = config
      return {
        name,
        type: 'line',
        yAxisIndex: 1,
        step: step,
        showSymbol: false,
        hoverAnimation: false,
        symbolSize: 10,
        tooltip: {
          formatter: () => {
            return 'ssssssss'
          }
        },
        label: {
          formatter: () => {
            return 'jjjjjjjjjjjj'
          }
        },
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: colorStops[0]
              }, {
                offset: 1, color: colorStops[1]
              }]
            }
          }
        },
        lineStyle: {
          normal: {
            color: lineStyleColors
          }
        },
        itemStyle: {
          normal: {
            color: itemStyleColors,
            borderWidth: 4
          }
        },
        data
      }
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: 'dashed',
            globalCoord: true,
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0, color: 'transparent' // 0% 处的颜色
                },
                {
                  offset: .5, color: 'transparent' // 0% 处的颜色
                },
                {
                  offset: 1, color: 'white' // 100% 处的颜色
                }
              ],
            }
          },
        },
        padding: 0,
        backgroundColor: 'transparent',
        position: function (pos, params, dom, rect, size) {
          const { seriesName } = params[0]
          const obj = { top: pos[1] - 60 }
          if (seriesName === 'green') {
            obj.left = pos[0] + 20
          } else {
            obj.right = size.viewSize[0] - pos[0] + 20
          }
          return obj
        },
        formatter: function (params) {
          const { data, seriesName } = params[0]
          const border = seriesName === 'green' ? 'border-left:3px solid #00C087' : 'border-right:3px solid #FF7858'
          const style = `${border};`
          return `<div style="${style}" class="${styles.floatdiv}"><div>价格<span>${data[0]}</span></div><div>累计<span>${data[1]}</span></div></div >`
        }
      },
      grid: {
        left: 20,
        right: 60,
        top: 10,
        bottom: 35
      },
      xAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
        splitLine: {
          lineStyle: {
            color: 'transparent'
          }
        },
        axisLabel: {
          textStyle: {
            color: XYcolor
          }
        },
      },
      yAxis: [
        {
          type: 'value',
          nameLocation: 'middle',
          max: 'dataMax',
          axisLine: {
            lineStyle: {
              color: 'transparent'
            },
          },
        }, {
          axisLabel: {
            show: true,
            textStyle: {
              color: XYcolor
            }
          },
          axisLine: { show: true },
          axisTick: { show: true },
          splitLine: { show: false }
        }],

      series: [
        getSeries({
          name: 'green',
          step: 'start',
          colorStops: ['rgba(0,192,135,0.41)', 'rgba(86,188,157,0)'],
          lineStyleColors: 'rgba(0,192,135,1)',
          itemStyleColors: 'rgba(0,192,135,1)',
          data: dataBids
        }),
        getSeries({
          name: 'red',
          step: 'end',
          colorStops: ['rgba(255,120,88,0.41)', 'rgba(218,115,115,0)'],
          lineStyleColors: 'rgba(255,120,88,1)',
          itemStyleColors: 'rgba(255,120,88,1)',
          data: dataAsks,
        })
      ],
    }
    myChart.setOption(option)
    window.onresize = () => {
      myChart.resize()
    }
  }

  startKline = () => {
    const { model: { marketCode }, theme, dispatch, modelName } = this.props
    const backColor = (theme === THEME.DEEPDARK ? '#1D1D1D' : 'white')
    const { getInterval } = this
    const TradingView = window.TradingView
    const tradeView = document.getElementById('tradeView')

    if (!tradeView) return
    const widget = new TradingView.widget({
      disabled_features: [
        "volume_force_overlay",
        'hide_left_toolbar_by_default',
        //
        'go_to_date',
        'use_localstorage_for_settings',
        'save_chart_properties_to_local_storage',
        'header_widget',
        //
        'main_series_scale_menu',
        'adaptive_logo',
        'show_logo_on_all_charts',
        'display_market_status',

        'timeframes_toolbar',
        'chart_property_page_background',
        // "left_toolbar",
        // 'edit_buttons_in_legend',
        // 'context_menus',
        //'remove_library_container_border',
        // 'chart_property_page_style',
      ],
      toolbar_bg: 'transparent',
      library_path: '/',
      custom_css_url: '/override.css',
      width: '100%',
      height: '100%',
      timezone: 'Asia/Hong_Kong',
      ...marketCode ? { symbol: marketCode } : {},
      // interval: 'D',
      'container_id': 'tradeView',
      overrides: {
        "paneProperties.legendProperties.showLegend": false,
        "paneProperties.background": backColor,
        "paneProperties.vertGridProperties.color": "transparent",
        "paneProperties.horzGridProperties.color": "transparent",
        "paneProperties.topMargin": "15",
        "paneProperties.bottomMargin": "5",
        // "scalesProperties.backgroundColor": "red",

        //--------------------------------------蜡烛图
        ...this.getChangedStyle().overrides,

        //-----------volume的大小large,medium,small,tiny
        volumePaneSize: "medium",
        //----------------- x,y坐标轴的颜色，字体颜色
        "scalesProperties.lineColor": XYcolor,
        "scalesProperties.textColor": XYcolor,

        //-----------面积图，分时图的颜色
        "mainSeriesProperties.areaStyle.color1": "rgba(62,108,174,.5)",// "#3278DD",
        "mainSeriesProperties.areaStyle.color2": "rgba(62,108,174,.1)",// "#3278DD",
        // "mainSeriesProperties.areaStyle.color3": "rgba(62,108,174,0)",
        "mainSeriesProperties.areaStyle.linecolor": "#4077C6",
        //-------------
        "mainSeriesProperties.lineStyle.color": "white",
        "mainSeriesProperties.lineStyle.linestyle": 0,
      },
      studies_overrides: {
        ...this.getChangedStyle().studies_overrides,
      },

      loading_screen: { backgroundColor: backColor },
      datafeed: {
        onReady(callback) {
          setTimeout(() => {
            callback({})
          })
        },
        searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
        },
        resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
          setTimeout(() => {
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
              supported_resolutions: ['1', '5', '15', '30', '60', '240', "D", "5D", "W", "M"],// 分辨率选择器中启用一个分辨率数组
              // "ticker": "AAPL", // 品体系中此商品的唯一标识符
              "data_status": "streaming" //数据状态码。状态显示在图表的右上角。streaming(实时)endofday(已收盘)pulsed(脉冲)
            })
          })
        },
        getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest = true) => {
          const [startTime, endTime] = [String(Math.min(from, to)), String(Math.max(from, to))]
          const interval = getInterval(resolution)
          dispatch({
            type: `${modelName}/getKlineAllList`,
            payload: {
              startTime,
              endTime,
              interval: String(interval)
            }
          }).then((result = []) => {
            const data = result.map(item => ({
              time: Number(item[0]) * 1000,
              open: Number(item[1]),
              close: Number(item[2]),
              high: Number(item[3]),
              low: Number(item[4]),
              volume: Number(item[5]),
              // price: Number(item[6]),
              // name: item[7]
            }))
            onHistoryCallback(data, { noData: true })
          })
        },
        getMarks(symbolInfo, startDate, endDate, onDataCallback, resolution) {
        },
        subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
          const doSubscribe = () => {
            const ws = wss.getSocket('ws')
            ws.onConnectPromise().then(() => {
              dispatch({
                type: `${modelName}/getKlineFromWs`,
                payload: {
                  interval: getInterval(resolution)
                }
              }).then(res => {
                if (res) {
                  ws.listen({
                    name: 'kline.update',
                    subscribe: (e, res) => {
                      if (_.get(res, 'method') === 'kline.update') {
                        const result = _.get(res, 'data')
                        result.map((item = {}) => {
                          onRealtimeCallback(
                            {
                              time: Number(item[0]) * 1000,
                              open: Number(item[1]),
                              close: Number(item[2]),
                              high: Number(item[3]),
                              low: Number(item[4]),
                              volume: Number(item[5]),
                            }
                          )
                        })
                      }
                    },
                    unsubscribe: () => {
                    },
                    restart: () => {
                      doSubscribe()
                    }
                  })
                }
              })
            })
          }
          doSubscribe()
        },
        unsubscribeBars(subscriberUID) {
        }
      },
      locale: 'zh',
    })
    widget.onChartReady(() => {
      if (widget) {
        this.widget = widget
        this.ApplayPromiseList.forEach(item => item())
        this.changeState({ loaded: true })
        this.widget.chart().executeActionById('drawingToolbarAction')
        this.studies.push(this.widget.chart().createStudy('Moving Average', true, false, [5, "close", 0], null, {
          "Plot.color": "#684A95",
        }))
        this.studies.push(this.widget.chart().createStudy('Moving Average', true, false, [10, "close", 0], null, {
          "Plot.color": "#5677A4",
        }))
        this.studies.push(this.widget.chart().createStudy('Moving Average', true, false, [30, "close", 0], null, {
          "Plot.color": "#417D57",
        }))
        this.studies.push(this.widget.chart().createStudy('Moving Average', true, false, [60, "close", 0], null, {
          "Plot.color": "#782C6C",
        }))
      }
    })
  }

  getInterval = (resolution) => {
    let interval
    switch (resolution) {
      case '1':
      case '5':
      case '15':
      case '30':
      case '60':
      case '240': {
        interval = 60 * (Number(resolution))
      }
        break
      case 'D': {
        interval = 1 * 24 * 60 * 60
      }
        break
      case '5D': {
        interval = 5 * 24 * 60 * 60
      }
        break
      case 'W': {
        interval = 6 * 24 * 60 * 60
      }
        break
      case 'M': {
        interval = 30 * 24 * 60 * 60
      }
        break
    }
    return interval
  }

  startKlineDetail = () => { // 合约基础信息
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getKlineDetail`,
    })
  }

  startKlineDetailWs = () => {
    const { dispatch, modelName } = this.props
    const ws = wss.getSocket('ws')
    ws.onConnectPromise().then(() => {
      dispatch({
        type: `${modelName}/getKlineDetailFromWs`,
      }).then(res => {
        if (res) {
          ws.listen({
            name: 'price.update',
            subscribe: (e, res) => {
              if (_.get(res, 'method') === 'price.update') {
                const result = _.get(res, 'data')
                dispatch({
                  type: `${modelName}/updateKlineDetail`,
                  payload: {
                    result,
                    request: 'ws'
                  }
                })
              }
            },
            unsubscribe: () => {
            },
            restart: () => {
            }
          })
        }
      })
    })
  }


  render() {
    const { loaded, map, time } = this.state
    const { changeState } = this
    const {
      model: {
        marketName = '', maxPrice24h = '', minPrice24h = '', indexPrice = '',
        latestPrice = '', latestPriceShown = '', latestPriceTrend = '', totalPrice24h = '', reasonablePrice = '', latestPriceChangePercent = '', dollarPrice = '', marketAllowTrade = '', userAllowTrade = ''
      }, dispatch, modelName
    } = this.props
    const intervals = [
      { name: '1m', value: '1' },
      { name: '5m', value: '5' },
      { name: '15m', value: '15' },
      { name: '30m', value: '30' },
      { name: '1h', value: '60' },
      { name: '4h', value: '240' },
      { name: '1D', value: 'D' },
      { name: '5D', value: '5D' },
      { name: '1W', value: 'W' },
      { name: '1M', value: 'M' }
    ]

    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.tradeChart,
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
                          <div className={styles.marketname} >
                            {
                              !marketAllowTrade ? (<div className={styles.notallowtrade} >暂停交易</div >) : null
                            }
                            {marketName}
                          </div >
                          < div className={styles.latestprice} >
                            <RedGreenSwitch.MarkText value={`${latestPriceShown}`} mark={latestPrice} />
                            <RedGreenSwitch.RedGreenArrow style={{ marginLeft: 10 }} alt={
                              latestPriceTrend !== '' ? (latestPriceTrend ? 'top' : 'down') : null
                            } />
                          </div >
                          <div className={styles.compare} >
                            <div className={styles.percent} >
                              <RedGreenSwitch.MarkText value={latestPriceChangePercent} />
                            </div >
                            <div className={styles.dollar} >
                              <RedGreenSwitch.MarkText value={dollarPrice} mark={latestPriceChangePercent} />
                            </div >
                          </div >
                        </>
                      ) : null
                    }
                  </div >
                  <div className={styles.right} >
                    <ul >
                      <li >
                        <div className={styles.title} >现货指数价格</div >
                        <div className={styles.desc} >{indexPrice}</div >
                      </li >
                      <li >
                        <div className={styles.title} >合理价格</div >
                        <div className={styles.desc} >{reasonablePrice}</div >
                      </li >
                      <li >
                        <div className={`${styles.title}`} >24h最高</div >
                        <div className={`${styles.desc} ${styles.maxprice1}`} >
                          {maxPrice24h}
                        </div >
                      </li >
                      <li >
                        <div className={styles.title} >24h最低</div >
                        <div className={`${styles.desc} ${styles.lowprice1}`} >
                          {minPrice24h}
                        </div >
                      </li >
                      <li >
                        <div className={styles.title} >24h交易额</div >
                        <div className={styles.desc} >{totalPrice24h}</div >
                      </li >

                      <li >
                        <div className={styles.title} >
                          <span className='blue' >更多</span >
                        </div >
                        <div className={styles.desc} />
                      </li >
                    </ul >
                  </div >
                </div >
              </div >
              <div className={styles.utilsbuttons} >
                {
                  map === 1 ? (
                    loaded ? (
                      <>
                        <ul className={styles.interval} >
                          {
                            intervals.map((item, index) => (
                              <li
                                key={index + 1}
                                onClick={() => {
                                  if (!this.widget) return
                                  changeState({
                                    time: item.name
                                  })
                                  this.widget.chart().setChartType(1)
                                  this.studies.forEach((id) => {
                                    this.widget.chart().setEntityVisibility(id, true)
                                  })
                                  dispatch({
                                    type: `${modelName}/doUnSubKlineAllListFromWs`
                                  }).then(() => {
                                    this.widget.chart().setResolution(item.value, () => {
                                    })
                                  })
                                }}
                                className={classNames(
                                  time === item.name ? styles.active : null
                                )}
                              >
                                {item.name}
                              </li >
                            ))
                          }
                          <li
                            key={intervals.length}
                            onClick={() => {
                              changeState({
                                time: 'realtime'
                              })
                              this.widget.chart().setChartType(3)
                              this.studies.forEach((id) => {
                                this.widget.chart().setEntityVisibility(id, false)
                              })
                            }}
                            className={classNames(
                              time === 'realtime' ? styles.active : null
                            )}
                          >
                            分时图
                          </li >
                        </ul >
                        <ul className={styles.utils} >
                          <li className={styles.indicator} onClick={() => {
                            this.widget.chart().executeActionById('chartProperties')
                          }} >
                            {chartProperties}
                          </li >
                          <li className={styles.indicator} onClick={() => {
                            this.widget && this.widget.chart().executeActionById('insertIndicator')
                          }} >
                            {insertIndicator}
                          </li >
                          <li onClick={() => {
                            const ifra = document.getElementsByTagName('iframe')[0]
                            ifra && SetFullScreen(ifra)
                          }} >
                            {fullScreen}
                          </li >
                        </ul >
                      </>
                    ) : null
                  ) : null
                }
                {
                  !marketAllowTrade || !userAllowTrade ? (<div className={styles.notallowtradeTip} >不允许交易</div >) : null
                }

                {
                  loaded ? (
                    <div className={styles.switchmap} >
                      <div onClick={() => {
                        changeState({
                          map: 1
                        })
                      }} className={classNames(
                        map === 1 ? styles.active : null
                      )} >
                        k线图
                      </div >
                      <div onClick={() => {
                        changeState({
                          map: 2
                        })
                      }} className={classNames(
                        map === 2 ? styles.active : null
                      )} >
                        深度图
                      </div >
                    </div >
                  ) : null
                }
              </div >

              <div className={styles.kmap} >
                {
                  map === 1 ? (
                    <>
                      <div id='tradeView' className={styles.tradeView} style={{
                        display: map === 1 ? 'block' : 'none',
                        width: '100%',
                        height: '100%'
                      }} />
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'none', visibility: 'hidden' }} />
                      <div id="deepChart" className={styles.deepChart} style={{
                        display: map === 2 ? 'block' : 'none',
                        width: '100%',
                        height: '100%',
                      }} />
                    </>
                  )
                }
              </div >
            </div >
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

