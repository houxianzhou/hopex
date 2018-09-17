import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import safeImg from '@assets/safe.png';
import teamImg from '@assets/team.png';
import technologyImg from '@assets/technology.png'

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
        <div className={styles.aboutUs}>
          <div className={styles.aboutTitle}>关于我们</div>
          <p className={styles.black} >
            Hopex是由一群极客和数字资产爱好者创建的一个专注于数字资产衍生品交易的平台。<br />
            通过对技术、安全性、用户体验不断钻研提升，我们致力于打造一个为用户提供创新、便捷、可靠的数字资产衍生品交易服务的世界级平台。
          </p >
          <p className={styles.black} >
            Hopex在香港建立了完善的运营中心，积极配合相关监管机构，为机构与个人用户提供安全、可信任的数字货币交易服务。
          </p >
          <div className={styles.team}>
            <img src={teamImg} alt="" />
            <p className={styles.imgDes} >团队</p >
            <p className={styles.title} >我们对金融交易满怀敬畏</p >
            <p className={styles.gray} >· 四位技术极客，来自MIT、Yale、Cambridge和HKU <br />
              · 三位交易员，来自Goldman Sachs、JP Morgan和Nomura <br />
              · 三位风控合规员，来自Deloitte, HSBC和BOCI <br />
              · 四位CFA持证者，三位CPA持证者</p >
          </div>
          <div className={styles.safe}>
            <img src={safeImg} alt="" />
            <p className={styles.imgDes} >风控与安全</p >
            <p className={styles.title} >我们视用户的资产安全为生命</p >
            <p className={styles.gray} >
              · 95%的数字货币资产存储于完全离线的冷钱包。 <br />
              · 钱包私钥加密后离线存放于不同的实体保险箱。<br />
              · 多重风控体系，系统隔离和人员隔离，确保交易和资金安全。
            </p >
          </div>
          <div className={styles.technology}>
            <img src={technologyImg} alt="" />
            <p className={styles.imgDes} >技术</p >
            <p className={styles.title} >高速度、高并发和高可用性</p >
            <p className={styles.gray} >· 100万单每秒的交易撮合引擎。<br />
              · 专业的券商柜台和行情系统。<br />
              · 分布式数据系统和网络拓扑，确保高可用与高容灾。</p >
          </div>

        </div >
      </Mixin.Child >
    )
  }
}


