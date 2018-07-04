import React, { Component } from 'react'
import { classNames, _ } from '@utils'
import ensure from '@assets/ensure.png'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit() {
    const { model: {}, dispatch, modelName } = this.props
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
    const { model: { ensure_records = {} } } = this.props
    const [dataTop = [], dataDown = []] = [_.get(ensure_records, 'asks'), _.get(ensure_records, 'bids')]
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

