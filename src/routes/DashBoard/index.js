import React, { Component } from 'react'
import { connect } from 'dva'
import { _, } from '@utils'
import * as styles from './index.less'
import banner from '@assets/banner.jpg'
import phone from '@assets/home-iphone.jpg'
import item1 from '@assets/item1.png'
const itemList = [
  {
    img: item1,
    title: '创新的交易品种',
    des: 'BTC、ETH永续(永不到期)合约',
    desSecondLine: '紧跟市场随时交易'
  },
  {
    img: item1,
    title: '高杠杆',
    des: '提供高达50倍杠杆',
    desSecondLine: '2%的市场波动即可实现本金翻倍'
  },
  {
    img: item1,
    title: '灵活的交易规则',
    des: '支持做多和做空，无论熊市牛市均可获利',
    desSecondLine: '支持随时调节杠杆倍数'
  },
  {
    img: item1,
    title: '低手续费',
    des: '手续费低于同类平台',
    desSecondLine: '让广大投资者收益更加丰厚'
  },
  {
    img: item1,
    title: '顶尖的技术',
    des: '业界领先的撮合引擎，高达100万笔/秒的撮合',
    desSecondLine: '风控模块每秒对账户进行10次以上的检测'
  },
  {
    img: item1,
    title: '卓越的安全性',
    des: '全面采用冷钱包',
    desSecondLine: '100%保证用户数字资产的安全'
  }
]

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
          <div className={styles.imgContainer}>
            <img src={phone} alt="" />
          </div>
          <div className={styles.aboutUsContent}>
            <div className={styles.absoluteFont}>ABOUT US</div>
            <div className={styles.headerPart}></div>
            <div className={styles.aboutUsFont}>关于我们</div>
            <div className={styles.aboutUsMain}>
              Hopex是由一群极客和数字资产爱好者创建的一个专注于数字资产衍生品交易的平台。
              <br/><br/>
              通过对技术、安全性、用户体验不断钻研提升，我们致力于打造一个为用户提供创新、便捷、可靠的数字资产衍生品交易服务的世界级平台。
            </div>
          </div>
        </div>
        <div className={styles.adventure}>
          <div className={styles.absoluteFont}>PLATFORM ADVANTAGE</div>
          <div className={styles.headerPart}></div>
          <div className={styles.aboutUsFont}>Hopex平台优势</div>
          <div className={styles.adventureContainer}>
            {
              itemList.map(item => {
                return (
                  <div className={styles.adventureItem}>
                    <div className={styles.adventureItem}>
                      <div className={styles.itemIcon}>
                        <img src={item.img}/>
                      </div>
                      <div className={styles.itemTitle}>{item.title}</div>
                      <div className={styles.itemContent}>
                        {item.des}<br/>
                        {item.desSecondLine}
                      </div>
                    </div>
                  </div >
                )
              })
            }
          </div>
        </div>
      </div >
    )
  }
}
