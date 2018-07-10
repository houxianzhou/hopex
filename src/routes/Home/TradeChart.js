import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { classNames } from '@utils'
import $ from 'jquery'
import ScrollPannel from './components/ScrollPanel'
import * as styles from './index.less'

export default class View extends Component {
  componentDidMount() {
    const TradingView = window.TradingView
    const Datafeeds = window.Datafeeds
    window.$ = $
    console.log(TradingView, '-----------')
    new TradingView.widget({
      width: '100%',
      height: '100%',
      fullscreen: true,
      symbol: 'AAPL',
      interval: 'D',
      'container_id': 'tradeView',
      //	BEWARE: no trailing slash is expected in feed URL
      datafeed: new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com'),
      // library_path: './static',
      locale: 'en',
      //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
      drawings_access: { type: 'black', tools: [{ name: 'Regression Trend' }] },
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: 'http://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id'
    });
  }


  // componentDidMount() {
  //   const TradingView = window.TradingView
  //   console.log(TradingView, '-----------')
  //   window.tvWidget = new TradingView.widget({
  //       width: '100%',
  //      // height: '600',
  //       fullscreen: false,
  //       symbol: 'ETH/BTC',
  //       interval: 'D',
  //       // BEWARE: no trailing slash is expected in feed URL
  //       datafeed: {
  //         onReady: (callback) => {
  //           callback(
  //             r1
  //           )
  //         },
  //         searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
  //           onResultReadyCallback(r2)
  //         },
  //         resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
  //           onSymbolResolvedCallback(r2)
  //
  //         },
  //         getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
  //           onHistoryCallback(
  //             r5
  //           )
  //
  //         },
  //         subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
  //           onRealtimeCallback(r5)
  //         },
  //         unsubscribeBars(subscriberUID) {
  //
  //         },
  //         getMarks(symbolInfo, startDate, endDate, onDataCallback, resolution) {
  //           onDataCallback(r5)
  //
  //         },
  //         getTimescaleMarks(symbolInfo, startDate, endDate, onDataCallback, resolution) {
  //           onDataCallback(r4)
  //         }
  //
  //       },
  //       library_path: '/',
  //       custom_css_url: 'style.css',
  //       locale: 'zh',
  //       // Regression Trend-related functionality is not implemented yet, so it's hidden for a while
  //       drawings_access: {
  //         type: 'black',
  //         tools: [{
  //           name: 'Regression Trend'
  //         }]
  //       },
  //       disabled_features: ['save_chart_properties_to_local_storage', 'chart_crosshair_menu', 'header_symbol_search'],
  //       enabled_features: [],
  //       client_id: 'huanyingsecurities.com',
  //       user_id: 'public_user_id',
  //       widgetbar: {
  //         details: !0
  //       },
  //       toolbar_bg: '#2f3440',
  //       loading_screen: {
  //         backgroundColor: '#000'
  //       },
  //       overrides: {
  //         'paneProperties.background': '#262c38',
  //         'paneProperties.vertGridProperties.color': 'rgba(255,255,255,.08)',
  //         'paneProperties.horzGridProperties.color': 'rgba(255,255,255,.08)',
  //         'symbolWatermarkProperties.transparency': 90,
  //         'scalesProperties.textColor': 'rgba(255,255,255,.8)',
  //         'mainSeriesProperties.candleStyle.drawBorder': !1
  //       },
  //       "container_id": "tradeView"
  //     }
  //   )
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

