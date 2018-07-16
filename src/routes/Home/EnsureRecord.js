import React, { Component } from 'react'
import { classNames, _, dealInterval, getPercent, formatNumber, } from '@utils'
import { Mixin } from "@components"
import ensure from '@assets/ensure.png'
import ScrollPannel from './components/ScrollPanel'
import ColorChange from './components/ColorChange'
import styles from './index.less'

const [TOP, DOWN] = ['top', 'down']

export default class View extends Component {

  startInit = () => {
    // this.getEnsureRecord()
  }

  getEnsureRecord = () => {
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
    <div className={styles[name]} >
      <div className={styles.theader} >
        <ul >
          <li >
            <div >价格</div >
            <div >数量</div >
            <div >累计数量(张)</div >
          </li >
        </ul >
      </div >
      <ul className={styles[`${name}_area`]} >
        {
          data.map((item, index) => {
            const total = data.slice(0, index + 1).reduce((sum, next) => {
              return sum + next.amount
            }, 0)
            item.total = total
            const [max1, max2, max3] = [
              _.maxBy(data, (item) => item.price),
              _.maxBy(data, 'amount'),
              _.maxBy(data, 'total')
            ]

            const colorProps = {
              total: data,
              color: name === TOP ? 'rgba(175,86,91,.2)' : 'rgba(87,152,128,.2)'
            }
            return (
              <li key={index} >
                <div className={styles[`${name}_price`]} >
                  <ColorChange {...{
                    percent: getPercent(item.price, max1.price, max1),
                    data: item.price,
                    ...colorProps
                  }}>
                    {item.price}
                  </ColorChange >
                </div >

                <div >{item.amount}</div >
                <div >{item.total}</div >
              </li >
            )
          })
        }
      </ul >
    </div >
  )

  render() {
    const { renderList } = this
    const { model: { ensure_records = [], latestPrice, indexPrice, equitablePrice } } = this.props
    const [dataTop = [], dataDown = []] = [
      _.get(ensure_records, 'asks')
      , _.get(ensure_records, 'bids')
    ]
    return (
      <Mixin.Child that={this} >
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
                renderList(dataTop.slice(0, 8), TOP)
              }
              <div className={styles.center} >
                <div className={styles.left} >{latestPrice}</div >
                <div className={styles.right} >
                  <img alt='ensure' className={styles.ensure} src={ensure} />
                  {equitablePrice}/{indexPrice}
                </div >
              </div >
              {
                renderList(dataDown.slice(0, 8), DOWN)
              }
            </div >
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

