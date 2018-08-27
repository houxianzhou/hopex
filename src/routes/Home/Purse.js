import React, { Component } from 'react'
import { Mixin } from "@components"
import { classNames, dealInterval } from '@utils'
import RedGreenSwitch from '@routes/Components/RedGreenSwitch'
import logogray from '@assets/logo4.png'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'

export default class Pure extends Component {
  state = {
    currentPurse: 0
  }
  startInit = () => {
    this.getPurseAssetList()
  }

  getPurseAssetList = () => {
    const { dispatch, modelName, model: {} } = this.props
    dispatch({
      type: `${modelName}/getPurseAssetList`
    }).then((res) => {
      if (res) {
        if (!this._isMounted) return
        this.interval = dealInterval(() => {
          this.getPurseAssetList()
        })

      }
    })
  }


  render() {
    const { currentPurse } = this.state
    const { model: { assetList = [], }, isLogin, routerGoLogin, routerGoRegister } = this.props
    const filterOne = assetList[currentPurse] || {}
    const {
      roe = '', floatPercent = '', walletBalance = '', positionMargin = '', floatingPNL = '',
      withdrawFreeze = '', totalWealth = '', delegateMargin = '', availableBalance = ''
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
                <ul>
                  {
                    assetList.map((item, index) => <li key={index} onClick={() => {
                      this.changeState({
                        currentPurse: index
                      })
                    }} className={classNames(
                      index === currentPurse ? styles.active : null
                    )} >{item.assetName}</li >)
                  }
                </ul >
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
                        <RedGreenSwitch.MarkText value={floatingPNL}  />
                      </div >
                      <div className={styles.percent} >
                        <RedGreenSwitch.MarkText value={roe}  />
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
                          <div >{positionMargin}</div >
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
                      <div >
                        {routerGoLogin('登录')}
                      </div >
                      <div className={styles.or} >或</div >
                      <div >
                        {routerGoRegister('注册')}
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

