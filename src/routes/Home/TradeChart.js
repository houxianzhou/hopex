import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { classNames, _ } from '@utils'
import $ from 'jquery'
import ScrollPannel from './components/ScrollPanel'
import * as styles from './index.less'

export default class View extends Component {
  componentDidMount() {
    const TradingView = window.TradingView
    const Datafeeds = window.Datafeeds
    window.$ = $
    // console.log(TradingView, '-----------')
    new TradingView.widget({
      width: '100%',
      height: '100%',
      fullscreen: true,
      symbol: '股吧',
      interval: 'D',
      'container_id': 'tradeView',
      //	BEWARE: no trailing slash is expected in feed URL
      datafeed: {
        onReady(callback) {
          console.log('1')
          callback({
            // 'exchanges': [
            //   { 'value': '', 'name': 'All Exchanges', 'desc': '' },
            //   {
            //     'value': 'NasdaqNM',
            //     'name': 'NasdaqNM',
            //     'desc': 'NasdaqNM'
            //   },
            //   { 'value': 'NYSE', 'name': 'NYSE', 'desc': 'NYSE' },
            //   {
            //     'value': 'NCM',
            //     'name': 'NCM',
            //     'desc': 'NCM'
            //   },
            //   { 'value': 'NGM', 'name': 'NGM', 'desc': 'NGM' }
            // ]
          })
        },
        searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
          console.log('2')
          // onResultReadyCallback([
          // ])
        },
        resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
          onSymbolResolvedCallback({
            // "name": "weixiaoyi",
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
            "supported_resolutions": ["D", "2D", "3D", "W", "3W", "M", "6M"],// 分辨率选择器中启用一个分辨率数组
            // "ticker": "AAPL", // 品体系中此商品的唯一标识符
            // "base_name": ["AAPL"],
            // "legs": ["AAPL"],
            // "full_name": "NasdaqNM:AAPL",
            // "pro_name": "NasdaqNM:AAPL",
            // "data_status": "streaming" //数据状态码。状态显示在图表的右上角。streaming(实时)endofday(已收盘)pulsed(脉冲)
          })
        },
        getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
          const a = _.debounce(() => {
            onHistoryCallback([
                {
                  "time": 1527872461000,
                  "close": 149.56,
                  "open": 148.82,
                  "high": 150.9,
                  "low": 148.57,
                  "volume": 10000
                },
                {
                  "time": 1530464461000,
                  "close": 149.56,
                  "open": 148.82,
                  "high": 150.9,
                  "low": 148.57,
                  "volume": 1000
                }
              ]
            )
          }, 3000)
          a()


        },
        getMarks(symbolInfo, startDate, endDate, onDataCallback, resolution) {
          // console.log(startDate)
          // onDataCallback()
        },
        subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
          console.log('5')
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
      // library_path: './static',
      locale: 'zh',
      //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
      // drawings_access: { type: 'black', tools: [{ name: 'Regression Trend' }] },
      // disabled_features: ['use_localstorage_for_settings'],
      // enabled_features: ['study_templates'],
      // charts_storage_url: 'http://saveload.tradingview.com',
      //  charts_storage_api_version: '1.1',
      //  client_id: 'tradingview.com',
      //  user_id: 'public_user_id'
    });
  }


  // componentDidMount() {
  //   const TradingView = window.TradingView
  //   const Datafeeds = window.Datafeeds
  //   window.$ = $
  //   console.log(TradingView, '-----------')
  //   new TradingView.widget({
  //     width: '100%',
  //     height: '100%',
  //     fullscreen: true,
  //     symbol: 'AAPL',
  //     interval: 'D',
  //     'container_id': 'tradeView',
  //     //	BEWARE: no trailing slash is expected in feed URL
  //     datafeed: new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com'),
  //     // library_path: './static',
  //     locale: 'en',
  //     //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
  //     drawings_access: { type: 'black', tools: [{ name: 'Regression Trend' }] },
  //     disabled_features: ['use_localstorage_for_settings'],
  //     enabled_features: ['study_templates'],
  //     charts_storage_url: 'http://saveload.tradingview.com',
  //     charts_storage_api_version: '1.1',
  //     client_id: 'tradingview.com',
  //     user_id: 'public_user_id'
  //   });
  // }


  render() {
    return (
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
          <div id='tradeView' style={{
            width: '100%',
            height: '100%',
          }} >
          </div >

        </ScrollPannel >
      </div >
    )
  }
}

