import React, { Component } from 'react'
import { connect } from 'dva'
import { _, classNames } from '@utils';
import * as styles from './index.less';
import banner from '@assets/banner.jpg';
import phone from '@assets/home-iphone.jpg';
import icon01 from '@assets/icon01.png';
import icon02 from '@assets/icon02.png';
import icon03 from '@assets/icon03.png';
import icon04 from '@assets/icon04.png';
import icon05 from '@assets/icon05.png';
import icon06 from '@assets/icon06.png';
import computer from '@assets/computer.png';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import bannerFirst from '@assets/home-1.jpg';
import bannerSecond from '@assets/home-2.jpg';
import bannerThird from '@assets/home-3.png';
import { btIcon, moreIcon, yzIcon, ytIcon } from '@assets'

const itemList = [
  {
    img: icon01,
    title: '创新的交易品种',
    des: 'BTC、ETH永续(永不到期)合约',
    desSecondLine: '紧跟市场随时交易'
  },
  {
    img: icon02,
    title: '高杠杆',
    des: '提供高达100倍杠杆',
    desSecondLine: '1%的市场波动即可实现本金翻倍'
  },
  {
    img: icon03,
    title: '灵活的交易规则',
    des: '支持做多和做空，无论熊市牛市均可获利',
    desSecondLine: '支持随时调节杠杆倍数'
  },
  {
    img: icon04,
    title: '低手续费',
    des: '手续费低于同类平台',
    desSecondLine: '让广大投资者收益更加丰厚'
  },
  {
    img: icon05,
    title: '顶尖的技术',
    des: '业界领先的撮合引擎，高达100万笔/秒的撮合',
    desSecondLine: '风控模块每秒对账户进行10次以上的检测'
  },
  {
    img: icon06,
    title: '卓越的安全性',
    des: '全面采用冷钱包',
    desSecondLine: '100%保证用户数字资产的安全'
  }
]

@connect(({ dashboard: model }) => ({
  model,
}))
export default class View extends Component {
  componentDidMount = () => {
    const _this = this;
    new Swiper(this.refs.swiperContainer, {
      autoplay: {
        delay: 3000
      },//可选选项，自动滑动
      speed: 500,
      pagination: {
        el:'.swiper-pagination',
      }
      // effect : 'fade',
    })
  }

  render() {
    const { model: { myname } = {} } = this.props;
    return (
      <div className={styles.home} >
        <div className={styles.header} ref="swiperContainer" >
          <div className="swiper-wrapper" >
            <div className="swiper-slide" >
              <img src={bannerThird} alt="" />
            </div >
            <div className="swiper-slide" >
              <img src={bannerFirst} alt="" />
            </div >
            <div className="swiper-slide" >
              <img src={bannerSecond} alt="" />
            </div >
          </div >
          <div className="swiper-pagination" ref="swiperPagination"></div>
        </div >
        {/*// <div className={classNames(*/}
        {/*//   styles.header,*/}
        {/*//   'swiper-container'*/}
        {/*// )} ref="swiperContainer">*/}
        {/*//   <div className="swiper-wrapper" >*/}
        {/*//     <div className="swiper-slide" >*/}
        {/*//       <img src={bannerFirst} alt="" />*/}
        {/*//     </div >*/}
        {/*<div className="swiper-slide" >*/}
        {/*<img src={bannerSecond} alt="" />*/}
        {/*</div >*/}
        {/*/!*<div className="swiper-slide" >slider3</div >*!/*/}
        {/*</div >*/}
        {/*</div >*/}
        <div className={styles.notice} >
          <p >关于hopex将于北京时间2018年9月1日上线的通知</p >
        </div >
        <div className={styles.aboutUs} >
          <div className={styles.imgContainer} >
            <img src={phone} alt="" />
          </div >
          <div className={styles.aboutUsContent} >
            <div className={styles.absoluteFont} >ABOUT US</div >
            <div className={styles.headerPart} />
            <div className={styles.aboutUsFont} >关于我们</div >
            <div className={styles.aboutUsMain} >
              Hopex是由一群极客和数字资产爱好者创建的一个专注于数字资产衍生品交易的平台。
              <br /><br />
              通过对技术、安全性、用户体验不断钻研提升，我们致力于打造一个为用户提供创新、便捷、可靠的数字资产衍生品交易服务的世界级平台。
            </div >
          </div >
        </div >
        <div className={styles.adventure} >
          <div className={styles.absoluteFont} >PLATFORM ADVANTAGE</div >
          <div className={styles.headerPart} />
          <div className={styles.aboutUsFont} >Hopex平台优势</div >
          <div className={styles.adventureContainer} >
            {
              itemList.map((item, index) => {
                return (
                  <div key={index} className={styles.adventureItem} >
                    <div className={styles.itemIcon} >
                      <img src={item.img} />
                    </div >
                    <div className={styles.itemTitle} >{item.title}</div >
                    <div className={styles.itemContent} >
                      {item.des}<br />
                      {item.desSecondLine}
                    </div >
                  </div >
                )
              })
            }
          </div >
          <div className={styles.contract} >
            <div className={styles.imgContainer} >
              <img src={computer} alt="" />
            </div >
            <div className={styles.contractItem} >
              <div className={styles.headerPart} />
              <div className={styles.aboutUsFont} >我们提供的合约</div >
              <div className={styles.contractDes} >
                Hopex支持多个币种的合约，同时我们也在不断开发创新的其他币种合约，力图给予广大投资者最丰富的选择。
              </div >
              <div className={styles.contractIconContainer} >
                <div className={styles.firstIconLine} >
                  <div className={styles.iconItem} >
                    <div className={styles.bitIcon} >
                      {btIcon}
                    </div >
                    <p className={styles.iconDes} >比特币</p >
                  </div >
                  <div className={styles.iconItem} >
                    <div className={styles.bitIcon} >
                      {ytIcon}
                    </div >
                    <p className={styles.iconDes} >以太币</p >
                  </div >
                  <div className={styles.iconItem} >
                    <div className={styles.bitIcon} >
                      {btIcon}
                    </div >
                    <p className={styles.iconDes} >瑞波币</p >
                  </div >

                </div >
                <div className={styles.secondIconLine} >
                  <div className={styles.iconItem} >
                    <div className={styles.bitIcon} >
                      {yzIcon}
                    </div >
                    <p className={styles.iconDes} >柚子币</p >
                  </div >
                  <div className={styles.iconItem} >
                    <div className={styles.bitIcon} >
                      {moreIcon}
                    </div >
                    <p className={styles.iconDes} >更多</p >
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
        <div className={styles.homeFooter} >
          <div className={styles.footerTitle} >
            时不我待，开启全新投资之旅
          </div >
          <button className={styles.signButton} >免费注册实盘账户</button >
        </div >
      </div >
    )
  }
}
