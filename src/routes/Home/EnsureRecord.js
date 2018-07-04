import React, { Component } from 'react'
import { classNames } from '@utils'
import ensure from '@assets/ensure.png'
import ScrollPannel from './components/ScrollPanel'
// import { connect } from 'dva'
import styles from './index.less'


export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit() {
    const { model: { market }, dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getEnsureRecord`,
    }).then(res => {
      console.log(res)
    })
  }

  renderList = (data, name) => (
    <div >
      <div className={styles.theader} >
        <ul >
          <li >
            <span >价格</span >
            <span >数量</span >
            <span >累计数量(张)</span >
          </li >
        </ul >
      </div >
      <ul >
        {
          data.map((item, index) => (
            <li key={index} >
              <span className={styles[`${name}_price`]} >{item.price}</span >
              <span >{item.amount}</span >
              <span >{item.total}</span >
            </li >
          ))
        }
      </ul >
    </div >
  )

  render() {
    const { renderList } = this
    const dataTop = (new Array(8)).fill({
      price: '9000.00',
      amount: 128.763,
      total: '7, 892, 394'
    })
    const dataDown = (new Array(8)).fill({
      price: '9000.00',
      amount: 128.763,
      total: '7, 892, 394'
    })
    return (
      <div
        className={
          classNames(
            {
              view: true
            },
            styles.ensureRecord
          )
        }
      >
        <ScrollPannel
          scrollConfig={{
            mouseWheel: false
          }}
          header={
            <div >
              <span >委托列表</span >
            </div >
          }
        >
          <div className={styles.content} >
            {
              renderList(dataTop, 'top')
            }
            <div className={styles.center} >
              <div className={styles.left} >9334.5</div >
              <div className={styles.right} >
                <img alt='ensure' className={styles.ensure} src={ensure} />
                90000.0/9200.0
              </div >
            </div >
            {
              renderList(dataTop, 'down')
            }
          </div >
        </ScrollPannel >
      </div >
    )
  }
}

