import React, { Component } from 'react'
import { classNames, dealInterval } from '@utils'
import { Table, Mixin, RouterGo } from '@components'
import { SCROLLX, PATH, } from '@constants'
import { getColumns, Tabs, RenderModal } from '@routes/Components/HistoryTable'
import ScrollPannel from './components/ScrollPanel'

import styles from './index.less'

export default class RecentRecord extends Component {
  state = {
    activeLi: '1'
  }
  startInit = () => {
    // 暂时没有东西
    this.getHistory()
  }

  getHistory = () => {
    const { activeLi } = this.state
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getHistory`,
      payload: {
        type: activeLi
      }
    }).then((res) => {
        if (!this._isMounted || this.interval) return
        if (activeLi === '1') {
          this.interval = dealInterval(() => {
            this.interval = null
            this.getHistory()
          })
        }
      }
    )
  }

  render() {
    const { activeLi } = this.state
    const { changeState, getHistory } = this
    const {
      model: { personalEnsureHistory = [], highlevelHistory = [], reduceHistory = [] }, modal: { name, data }, noDataTip, calculateTableHeight, expandedRowRender,
      openModal, loading, modelName
    } = this.props
    const columns = getColumns({
      ...this.props,
      columns: [
        {
          title: '操作',
          width: 150,
          render: (value, record = {}) => {
            return ({
                value: (
                  ['1', '2'].indexOf(record.orderStatus) !== -1 ? (
                    <span onClick={(e) => {
                      e.stopPropagation()
                      openModal({
                        name: 'dealDetail',
                        data: record
                      })
                    }} >
                    成交明细
                  </span >
                  ) : null
                ),
                className: 'blue action'
              }
            )
          }
        }
      ]
    })


    let dataSource
    switch (activeLi) {
      case '1':
        dataSource = personalEnsureHistory
        break
      case '6':
        dataSource = highlevelHistory
        break
      case '7':
        dataSource = reduceHistory
        break
      default:
        dataSource = []
    }


    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: dataSource, //_.merge((new Array(4)).fill(), dataSource),
      scroll: {
        x: SCROLLX.X
      },
      noDataTip: () => noDataTip(dataSource, '当前无历史'),
      expandedRowRender,
    }
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.recentRecord
            )
          }
        >
          <ScrollPannel
            tableHeight={calculateTableHeight(dataSource)}
            header={
              <div className={styles.header} >
                <ul >
                  {
                    Tabs.map((item = {}, index) => {
                      return (
                        <li
                          key={index}
                          className={classNames(
                            activeLi === item.type ? styles.active : null
                          )}
                          onClick={() => {
                            changeState({
                              activeLi: item.type
                            }, () => {
                              getHistory()
                            })
                          }}
                        >{item.name}</li >
                      )
                    })
                  }
                </ul >
                <div ><span className='blue' >
                  <RouterGo.SwitchRoute value={PATH.history} >查看完整历史</RouterGo.SwitchRoute >
                </span ></div >
              </div >
            }
          >
            <Table {...tableProp} />
          </ScrollPannel >
          {
            name === 'dealDetail' ? (<RenderModal
              {...this.props}
              loading={loading.effects[`${modelName}/getOrderDetail`]}
              data={data}
              className={styles.detailModal} />) : null
          }
        </div >
      </Mixin.Child >
    )
  }
}

