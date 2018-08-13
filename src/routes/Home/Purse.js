import React, { Component } from 'react'
import { Mixin } from "@components"
import { classNames, dealInterval } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import RedGreenSwitch from './components/RedGreenSwitch'
import logogray from '@assets/logo4.png'
import styles from './index.less'

export default class View extends Component {
  state = {
    currentPurse: 0
  }
  startInit = () => {
    this.getPurseAssetList()
  }

  getPurseAssetList = () => {
    const { dispatch, modelName, model: { dealMoney = '' } } = this.props
    dispatch({
      type: `${modelName}/getPurseAssetList`
    }).then((res) => {
      if (res) {
        // 计算结算货币的可用金额供给交易模块slider使用
        const filterOne = res.filter(item => item.assetName === dealMoney)[0] || {}
        dispatch({
          type: `${modelName}/changeState`,
          payload: {
            availableMoney: filterOne.available
          }
        })
        if (!this._isMounted) return
        this.getPurseAssetList()
      }
    })
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  render() {
    const { currentPurse } = this.state
    const { model: { assetList = [], }, isLogin, routerGoLogin, routerGoRegister } = this.props
    const filterOne = assetList[currentPurse] || {}
    const {
      roe, floatPercent, walletBalance,
      withdrawFreeze, totalWealth, delegateMargin, availableBalance
    } = filterOne
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.purse
            )
          }
        >
          <ScrollPannel
            scroller={false}
            header={
              <div className={styles.purseheader} >
                <div >
                  钱包
                </div >
                <div >
                  <ul className={styles.tab} >
                    {
                      assetList.map((item, index) => <li key={index} onClick={() => {
                        this.changeState({
                          currentPurse: index
                        })
                      }} className={classNames(
                        index === currentPurse ? 'active' : null
                      )} >{item.assetName}</li >)
                    }
                  </ul >
                </div >
              </div >
            }
          >
            <div className={classNames(
              styles.content,
              isLogin ? styles.login : styles.notlogin
            )} >
              {
                isLogin ? (
                  <>
                    <div className={styles.top} >
                      <div className={styles.tip} >浮动盈亏</div >
                      <div className={styles.number} >
                        <RedGreenSwitch.GreenText value={`${roe}%`} />
                      </div >
                      <div className={styles.percent} >
                        <RedGreenSwitch.GreenText value={floatPercent} />
                      </div >
                    </div >
                    <div className={styles.down} >
                      <div >
                        <div >
                          <div >钱包余额</div >
                          <div >{walletBalance}</div >
                        </div >
                        <div >
                          <div >委托占用保证金</div >
                          <div >{delegateMargin}</div >
                        </div >
                        <div >
                          <div >提现冻结金额</div >
                          <div >{withdrawFreeze}</div >
                        </div >
                      </div >
                      <div >
                        <div >
                          <div >总权益</div >
                          <div >{totalWealth}</div >
                        </div >

                        <div >
                          <div >持仓占用保证金</div >
                          <div >{delegateMargin}</div >
                        </div >
                        <div >
                          <div >可用金额</div >
                          <div >{availableBalance}</div >
                        </div >
                      </div >
                    </div >
                  </>
                ) : (
                  <div className={styles.container} >
                    <div className={styles.top} ><img src={logogray} /></div >
                    <div className={styles.center} >欢迎来到Hopex</div >
                    <div className={styles.down} >
                      <div onClick={() => {
                        routerGoLogin()
                      }} >登录
                      </div >
                      <div className={styles.or} >或</div >
                      <div onClick={() => {
                        routerGoRegister()
                      }} >注册
                      </div >
                    </div >
                  </div >
                )
              }

            </div >
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

