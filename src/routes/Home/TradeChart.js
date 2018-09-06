import React, { Component } from 'react'
import { classNames, _, getRes, resOk, formatNumber, formatJson, isEqual, localSave } from '@utils'
import { Mixin } from "@components"
import { THEME } from '@constants'
import wss from '@services/SocketClient'
import RedGreenSwitch from '@routes/Components/RedGreenSwitch'
import ScrollPannel from './components/ScrollPanel'
import * as styles from './index.less'

const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default class TradeChart extends Component {
  constructor(props) {
    super(props)
    this.studies = []
    this.state = {
      loaded: false,
      map: 1,
      time: '1D'
    }
  }

  componentWillUnmount() {
    window.onresize = null
  }

  componentDidUpdate(prevProps, prevState) {
    const { model: { ensure_records: prevEnsure_records }, RG: prevRG, theme: prevTheme } = prevProps
    const { model: { ensure_records }, RG, theme } = this.props
    const { map: prevMap } = prevState
    const { map } = this.state
    if (!isEqual(prevEnsure_records, ensure_records) && prevEnsure_records && ensure_records && map === 2) {
      this.startDeepMap()
    }
    if (!isEqual(prevMap, map)) {
      if (map === 1) {
        this.startKline()
      } else {
        this.startDeepMap()
      }
    }
    if (!isEqual(prevRG, RG) || !isEqual(prevTheme, theme) && this.widget) {
      const { overrides, studies_overrides } = this.getChangedStyle()
      this.widget.applyOverrides(
        overrides
      )
      this.widget.applyStudiesOverrides(
        studies_overrides
      )
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


    const dims = {
      time: 0,
      waveHeight: 1,
    };


    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          const data = _.get(params[0], 'data')
          return [
            `价格${data[0]}`,
            `累计${data[1]}`,
          ].join('<br>');
        }
      },
      grid: {
        left: 0,
        right: 30,
        top: 0,
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
        }
      },
      yAxis: [
        {
          type: 'value',
          //name: '浪高（米）',
          nameLocation: 'middle',
          //nameGap: 35,
          max: 'dataMax',
          // axisLine: {
          //   lineStyle: {
          //     color: '#015DD5'
          //   }
          // },
          splitLine: { show: false }
        }, {
          axisLine: { show: true },
          axisTick: { show: true },
          axisLabel: { show: true },
          splitLine: { show: false }
        }],

      series: [
        {
          type: 'line',
          yAxisIndex: 1,
          showSymbol: false,
          hoverAnimation: false,
          symbolSize: 10,
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(86,188,157,0.41)'
                }, {
                  offset: 1, color: 'rgba(86,188,157,0)'
                }]
              }
            }
          },
          lineStyle: {
            normal: {
              color: 'rgba(86,188,157,1)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(88,160,253,1)'
            }
          },
          encode: {
            x: dims.time,
            y: dims.waveHeight
          },
          // data: data,
          z: 2
        },
        {
          type: 'line',
          yAxisIndex: 1,
          showSymbol: false,
          hoverAnimation: false,
          symbolSize: 10,
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,192,135,0.41)'
                }, {
                  offset: 1, color: 'rgba(86,188,157,0)'
                }]
              }
            }
          },
          lineStyle: {
            normal: {
              color: 'rgba(0,192,135,1)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(88,160,253,1)'
            }
          },
          encode: {
            x: dims.time,
            y: dims.waveHeight
          },
          data: dataBids,
          z: 2
        },
        {
          type: 'line',
          yAxisIndex: 1,
          showSymbol: false,
          hoverAnimation: false,
          symbolSize: 10,
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(255,120,88,0.41)'
                }, {
                  offset: 1, color: 'rgba(218,115,115,0)'
                }]
              }
            }
          },
          lineStyle: {
            normal: {
              color: 'rgba(255,120,88,1)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(86,188,157,1)'
            }
          },
          encode: {
            x: dims.time,
            y: dims.waveHeight
          },
          data: dataAsks,
          z: 2
        }
      ],

    };
    myChart.setOption(option)
    window.onresize = () => {
      myChart.resize()
    }
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

  startKline = () => {
    const backColor = '#1D1D1D'
    const { getInterval } = this
    const { model: { marketCode }, dispatch, modelName } = this.props
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
      toolbar_bg: "transparent",
      library_path: '/',
      width: '100%',
      height: '100%',
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
        "scalesProperties.lineColor": "#778094",
        "scalesProperties.textColor": "#778094",

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
          // dispatch({
          //   type: `${modelName}/doUnSubKlineAllListFromWs`
          // })
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
                  }
                })
              }
            })
          })

          // setInterval(() => {
          //   onRealtimeCallback({
          //       "time": 1535385600000,
          //       "close": _.random(100,300),
          //       "open": _.random(100, 500),
          //       "high": 150.9,
          //       "low": 148.57,
          //       "volume": 1000
          //     }
          //   )
          // }, 2000)


        },
        unsubscribeBars(subscriberUID) {
        }
      },
      locale: 'zh',
    })
    widget.onChartReady(() => {
      this.changeState({ loaded: true })
      this.widget = widget
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
    })
  }

  startKlineDetail = () => {
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
        latestPrice = '', latestPriceShown = '', latestPriceTrend = '', totalPrice24h = '', reasonablePrice = '', latestPriceChangePercent = '', latestPriceChangePercentShown = '', dollarPrice = '', marketAllowTrade = ''
      },
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
                                  changeState({
                                    time: item.name
                                  })
                                  this.widget.chart().setChartType(1)
                                  this.studies.forEach((id) => {
                                    this.widget.chart().setEntityVisibility(id, true)
                                  })
                                  this.widget.chart().setResolution(item.value, () => {
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2.4 120.9 600 600" width="17"
                                 height="17" >
                              <path
                                d="M594 473.5V368.8h-76c-5.7-23.8-15.2-46.4-27.5-66.4l53.8-53.8-73.9-73.9-53.8 53.4c-20.6-12.8-42.7-21.8-66.4-27.5v-75.9H245.5v75.9c-23.8 5.7-46.4 15.2-66.4 27.5l-53.8-53.8-73.9 73.9 53.4 53.8C92 322.6 83 344.7 77.3 368.4h-76V473h75.9c5.7 23.8 15.2 46.4 27.5 66.4L51 593.3l73.9 73.9 53.8-53.4c20.6 12.8 42.7 21.8 66.4 27.5v75.9h104.6v-75.9c23.8-5.7 46.4-15.2 66.4-27.5l53.8 53.8 73.9-73.9-53.4-53.8c12.8-20.6 21.8-42.7 27.5-66.4H594zm-296.4 69.7c-67.3 0-122.3-54.6-122.3-122.3 0-67.3 54.6-122.3 122.3-122.3 67.3 0 122.3 54.6 122.3 122.3-.4 67.4-54.9 122.3-122.3 122.3z"
                                fill='#6A7286' />
                            </svg >
                          </li >
                          <li className={styles.indicator} onClick={() => {
                            this.widget && this.widget.chart().executeActionById('insertIndicator')
                          }} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" width="17" height="17" >
                              <path
                                d="M16 0a1 1 0 0 0-1 1 1 1 0 0 0 .127.484L13.017 5A1 1 0 0 0 13 5a1 1 0 0 0-.258.035L10.965 3.26A1 1 0 0 0 11 3a1 1 0 0 0-1-1 1 1 0 0 0-1 1 1 1 0 0 0 .082.393L7.12 6.008a1 1 0 0 0-.12-.01 1 1 0 0 0-.44.104l-1.564-1.04A1 1 0 0 0 5 4.998a1 1 0 0 0-1-1 1 1 0 0 0-1 1 1 1 0 0 0 .002.066l-1.56 1.04A1 1 0 0 0 1 5.998a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-.002-.064l1.56-1.04A1 1 0 0 0 4 6a1 1 0 0 0 .44-.103l1.564 1.04A1 1 0 0 0 6 7a1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-.082-.39l1.965-2.62A1 1 0 0 0 10 4a1 1 0 0 0 .258-.035l1.777 1.777A1 1 0 0 0 12 6a1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-.127-.482L15.983 2A1 1 0 0 0 16 2a1 1 0 0 0 1-1 1 1 0 0 0-1-1zm-1 5v10h2V5h-2zM9 7v8h2V7H9zM3 9v6h2V9H3zm9 1v5h2v-5h-2zM0 11v4h2v-4H0zm6 0v4h2v-4H6z"
                                fill='#6A7286' />
                            </svg >
                          </li >
                        </ul >
                      </>
                    ) : null
                  ) : null
                }
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
              </div >
              <div className={styles.kmap} >
                {
                  map === 1 ? (
                    <>
                      <div id='tradeView' className={styles.tradeView} style={{
                        width: '100%',
                        height: '100%'
                      }} />
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'none', visibility: 'hidden' }} />
                      <div id="deepChart" className={styles.deepChart} style={{ width: '100%', height: '100%' }} />
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

