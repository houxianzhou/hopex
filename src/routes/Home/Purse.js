import React, { Component } from 'react'
import { Mixin } from "@components"
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  startInit = () => {
     this.getPurseAssetList()
  }

  getPurseAssetList = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPurseAssetList`
    })
  }

  render() {
    const { model: { assetList = [] } } = this.props
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
                <div >钱包</div >
                <div >
                  <ul >
                    {
                      assetList.map((item,index) => <li key={index}>{item.name}</li>)
                    }
                  </ul >
                </div >
              </div >
            }
          >
            <div className={styles.content} >
              <div className={styles.top} >
                <div className={styles.tip} >浮动盈亏</div >
                <div className={styles.number} >92833.6666</div >
                <div className={styles.percent} >500.00%</div >
              </div >
              <div className={styles.down} >
                <div >
                  <div >
                    <div >钱包余额</div >
                    <div >67813.243</div >
                  </div >
                  <div >
                    <div >委托占用保证金</div >
                    <div >67813.243</div >
                  </div >
                  <div >
                    <div >提现冻结金额</div >
                    <div >67813.243</div >
                  </div >
                </div >
                <div >
                  <div >
                    <div >总权益</div >
                    <div >4.587</div >
                  </div >

                  <div >
                    <div >持仓占用保证金</div >
                    <div >4.587</div >
                  </div >
                  <div >
                    <div >总权益</div >
                    <div >4.587</div >
                  </div >
                </div >
              </div >
            </div >
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

