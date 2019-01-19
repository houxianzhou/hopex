import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'

import * as styles from '@routes/About/index.less'

@connect(({ Loading, dispatch, }) => ({
  dispatch,
  loading: Loading
}))
export default class View extends Component {
  state = {}

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {

  }


  render() {
    const {} = this.props

    return (
      <Mixin.Child that={this} >
        <div className={styles.service} >
          <div className={styles.aboutTitle} >安全性</div >
          <p className={styles.black} >Hoepx致力于平台及其用户的安全性。 我们信奉严谨、保守、安全的措施, 不会因方便而危及安全。</p >
          <p className={styles.title} >钱包安全性</p >
          <p className={styles.content} >Hopex史无前例地使用多签名地址来存款和提款。 所有 Hopex 地址都是多重签名，所有存储都保持离线状态。<br />
            即使系统被黑客完全入侵，包括网页服务器，交易引擎和数据库，黑客亦没有足够的密钥来窃取资金。<br />
            再者，在发送之前，Hopex的每次提款都由至少两名Hopex员工手工审计。 任何云服务器上都没有私钥，所有资金都使用深度冷存储。<br />
            由Hoepx系统发送的所有存款地址，都被第三方服务器验证，以确保他们包含由创始人控制的钥匙。 如果公钥不匹配，系统将立即停机，停止所有交易。</p >
          <p className={styles.title} >系统安全性</p >
          <p className={styles.content} >Hopex系统利用亚马逊网络服务的 一等安全服务。<br />
            所有Hopex系统都需要多个身份验证才能访问，包括硬件验证。 除了已核准和受监督的渠道，个别系统是无法相互通通信的。</p >
          <p className={styles.title} >交易引擎的安全性</p >
          <p className={styles.content} >Hopex的交易引擎是独特的， 以 kdb+
            语言编程，它是各大银行在高频交易应用程序中经常使用的工具集，Hopex的交易系统有前所未有的速度和可靠性。而这个速度优势不只是让我们每秒能有更多成交和操作，Hopex在每个挂单、交割、资金提存亦会对整个系统的账目进行审核。
            在任何时候，系统中的所有帐户的盈亏总和必须为0， 否则交易将会被暂停。</p >
        </div >
      </Mixin.Child >
    )
  }
}


