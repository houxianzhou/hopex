import React, { Component } from 'react'
import { classNames, _, dealInterval } from '@utils'
import ensure from '@assets/ensure.png'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'

export default class View extends Component {
  componentDidMount() {
    // this.startInit()
  }

  startInit() {
    this.getEnsureRecord()
  }

  getEnsureRecord() {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getEnsureRecord`,
      payload: {
        mode: 'http'
      }
    }).then(res => {
      dealInterval(() => {
        this.getEnsureRecord()
      })
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
          data.map((item, index) => {
            const total = data.slice(0, index + 1).reduce((sum, next) => {
              return sum + Number(next.amount)
            }, 0)
            return (
              <li key={index} >
                <span className={styles[`${name}_price`]} >{item.price}</span >
                <span >{item.amount}</span >
                <span >{total}</span >
              </li >
            )
          })
        }
      </ul >
    </div >
  )

  render() {
    const { renderList } = this
    const { model: { ensure_records = {} } } = this.props
    const [dataTop = [], dataDown = []] = [_.get(ensure_records, 'bids'), _.get(ensure_records, 'asks')]
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
              renderList(dataTop.slice(0, 8), 'top')
            }
            <div className={styles.center} >
              <div className={styles.left} >9334.5</div >
              <div className={styles.right} >
                <img alt='ensure' className={styles.ensure} src={ensure} />
                90000.0/9200.0
              </div >
            </div >
            {
              renderList(dataDown.slice(0, 8), 'down')
            }
          </div >
        </ScrollPannel >
      </div >
    )
  }
}

