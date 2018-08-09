import React, { Component } from 'react'
import { connect } from 'dva'
import { _, } from '@utils'
import * as styles from './index.less'
import banner from '@assets/banner.jpg'

@connect(({ dashboard: model }) => ({
  model,
}))
export default class View extends Component {
  render() {
    const { model: { myname } = {} } = this.props;
    return (
      <div className={styles.home}>
        <div className={styles.header}>
          <img src={banner} alt="" />
        </div>
        <p className={styles.notice}>
          关于hopex将于北京时间2018年9月1日上线的通知
        </p>
        <div className={styles.aboutUs}>
          <div className={styles.aboutUsContent}>
            <div className="header-part"></div>
            <div className="aboutUsFont">关于我们</div>
            <div className="aboutUsMain">
              Hopex是由一群极客和数字资产爱好者创建的一个专注于数字资产衍生品交易的平台。

              通过对技术、安全性、用户体验不断钻研提升，我们致力于打造一个为用户提供创新、便捷、可靠的数字资产衍生品交易服务的世界级平台。
            </div>
          </div>
        </div>
      </div >
    )
  }
}
