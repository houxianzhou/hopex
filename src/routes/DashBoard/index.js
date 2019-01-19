import React, { Component } from 'react'
import { connect } from 'dva'
import { _, classNames } from '@utils';
import { PATH } from '@constants'
import * as styles from './index.less';
import { Toast, RouterGo } from "@components";
import phone from '@assets/iphone11.png';
import icon01 from '@assets/icon01.png';
import icon02 from '@assets/icon02.png';
import icon03 from '@assets/icon03.png';
import icon04 from '@assets/icon04.png';
import icon05 from '@assets/icon05.png';
import icon06 from '@assets/icon06.png';
import provide from '@assets/provide.png';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import { btIcon, moreIcon, rbIcon, yzIcon, ytIcon, aboutUs, advantage } from '@assets'

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
];

@connect(({ user, dashboard: model, dispatch }) => ({
  user,
  model,
  dispatch,
  modelName: 'dashboard'
}))
export default class View extends Component {
  state = {
    bannerList: [],
    notifies: []
  }
  componentDidMount = () => {
    // console.log(this.props);
    const _this = this;
    this.props.dispatch({
      type: `${this.props.modelName}/getIndexInfo`
    }).then((res) => {
      if (!res.data) return;
      const { banners = '', notifies = '' } = res.data;
      this.setState({
        bannerList: banners,
        notifies: notifies,
      })
      const swiperConfig = new Swiper(this.refs.swiperContainer, {
        loop: true,
        autoplay: banners && banners.length === 1 ?
          false
          : {
            delay: 3000,
            disableOnInteraction: false,
          },
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false,
        // },//可选选项，自动滑动
        speed: 500,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
        }
        // effect : 'fade',
      })
      // if (banners && +banners.length === 1) {
      //   swiperConfig.autoplay.stop && swiperConfig.autoplay.stop();
      // }
    })
  }
  routerGoHome = (value) => {
    return <RouterGo.SwitchRoute value={PATH.home} >{value}</RouterGo.SwitchRoute >
  }

  routerGoRegister = (value) => {
    return <RouterGo.SwitchRoute value={PATH.register} >{value}</RouterGo.SwitchRoute >
  }

  isLogin() {
    const { user: { userInfo } = {} } = this.props;
    return !_.isEmpty(userInfo);
  }

  render() {
    // console.log('123');
    const { model: { myname } = {}, user: { userInfo } = {}, dispatch, modelName } = this.props;
    const { bannerList, notifies } = this.state;

    return (
      <div className={styles.home} >
        <div className={styles.header} ref="swiperContainer" >
          <div className={
            classNames(
              'swiper-wrapper',
              styles.wrapper
            )
          } >
            {
              bannerList.map((v, index) => {
                return (
                  <div
                    key={v.imgUrl}
                    style={{
                      backgroundImage: `url(${v.imgUrl})`,
                      backgroundPosition: 'center center'
                    }}
                    className={
                      classNames(
                        'swiper-slide',
                        styles.slide
                      )
                    } >
                  </div >
                )
              })
            }
          </div >
          <div className={classNames(
            "swiper-button-prev",
            styles.swiperPrev
          )} />
          <div className={classNames(
            "swiper-button-next",
            styles.swiperNext,
          )} />

          <div className="swiper-pagination" ref="swiperPagination" />
        </div >
        <div className={styles.notice} >
          {
            notifies.map((v, index) => {
              return (
                <a key={index} target="_blank" href={v.link} >{v.title}</a >
              )
            })
          }
        </div >
        <div className={styles.aboutUs} >
          <div className={styles.imgContainer} >
            <img src={phone} alt="" />
          </div >
          <div className={styles.aboutUsContent} >
            <div className={styles.absoluteFont} >
              {aboutUs}
            </div >
            <div className={styles.headerPart} />
            <div className={classNames(
              styles.aboutUsFont,
              styles.fontTitle
            )} >关于我们
            </div >
            <div className={styles.aboutUsMain} >
              Hopex是由一群极客和数字资产爱好者创建的一个专注于数字资产衍生品交易的平台。
              <br /><br />
              通过对技术、安全性、用户体验不断钻研提升，我们致力于打造一个为用户提供创新、便捷、可靠的数字资产衍生品交易服务的世界级平台。
            </div >
          </div >
        </div >
        <div className={styles.adventure} >
          <div className={styles.absoluteFont} >
            {advantage}
          </div >
          <div className={styles.headerPart} />
          <div className={classNames(
            styles.aboutUsFont,
            styles.fontTitle
          )} >Hopex平台优势
          </div >
          <div className={styles.adventureContainer} >
            {
              itemList.map((item, index) => {
                return (
                  <div key={index} className={styles.adventureItem} >
                    <div className={styles.itemIcon} >
                      <img src={item.img} />
                    </div >
                    <div className={classNames(
                      styles.itemTitle,
                      styles.fontTitle
                    )} >{item.title}</div >
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
            {/*<div className={styles.imgContainer} >*/}
            {/*<img src={computer} alt="" />*/}
            {/*</div >*/}
            <div className={styles.contractItem} >
              <div className={styles.absoluteFont} >
                <img src={provide} alt="" />
              </div >
              <div className={styles.headerPart} />
              <div className={
                classNames(
                  styles.aboutUsFont,
                  styles.fontTitle
                )
              } >
                我们提供的合约
              </div >
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
                      {rbIcon}
                    </div >
                    <p className={styles.iconDes} >瑞波币</p >
                  </div >
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
                <div className={styles.secondIconLine} >

                </div >
              </div >
            </div >
          </div >
        </div >
        <div className={styles.homeFooter} >
          <div className={styles.footerTitle} >
            时不我待，开启全新投资之旅
          </div >
          {
            <button className={styles.signButton} >
              {
                this.isLogin() ? this.routerGoHome('实盘交易') : this.routerGoRegister('免费注册实盘账户')
              }
            </button >
          }

        </div >
      </div >
    )
  }
}
