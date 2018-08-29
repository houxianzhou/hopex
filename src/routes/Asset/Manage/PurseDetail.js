import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import { classNames, _, } from '@utils'
import { Rights } from '@assets'

import styles from './index.less'

@connect(({ modal, Loading }) => ({
  modal,
  loading: Loading
}))
export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    console.log('钱包明细')
  }

  render() {
    const list1 = [1, 2, 3]
    const list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
      <Mixin.Child that={this} >
        <div className={styles.purseDetail} >
          <ul className={styles.header} >
            {
              list1.map((item, index) => (
                <li key={index} >
                  <div className={styles.left} >
                    {Rights}
                  </div >
                  <div className={styles.right} >
                    <div className={styles.title} >账户总权益估值（BTC）</div >
                    <div className={styles.value} >8.12689356</div >
                    <div >≈XXXX.XXUSD</div >
                  </div >
                </li >
              ))
            }
          </ul >

          <ul className={styles.down} >
            <li >
              <div className={styles.liheader} >
                <div className={styles.left} >
                  <div className={styles.desc} >BTC总权益</div >
                  <div className={styles.value} >
                    <div >8.12689356</div >
                    <div >(≈XXXX.XXUSD)</div >
                  </div >
                </div >
                <div >
                  B
                </div >
              </div >
              <div className={styles.licontent} >
                <ul >
                  {
                    list2.map((item, index) => (
                      <li key={index} >
                        <div className={styles.leftdeco} />
                        {
                          index > 2 ? <div className={styles.topdeco} /> : null
                        }
                        <div className={styles.contentdeco} >
                          <div className={styles.name}>浮动盈亏</div >
                          <div className={styles.value}>8.12689356</div >
                          <div className={styles.prec}>≈XXXX.XXUSD</div >
                        </div >
                      </li >
                    ))
                  }
                </ul >
              </div >
            </li >
          </ul >
        </div >
      </Mixin.Child >
    )
  }
}


