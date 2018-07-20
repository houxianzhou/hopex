import React, { Component } from 'react'
import { classNames } from '@utils'
import { Table } from '@components'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  startInit = () => {
    const { dispatch, modelName } = this.props
  }

  render() {
    const head = [
      {
        name: '合约',
        dataIndex: 'name',
        // className: styles.red
        //width: '30%',
      },
      {
        name: '当前价格',
        dataIndex: 'age',
        //width: 200,
      },
      {
        name: '当前合理价格',
        dataIndex: 'sex',
        //width: 400,
      },
      {
        name: '杠杆倍数',
        dataIndex: 'work',
        //width: '30%',
      },
      {
        name: '数量(张)',
        dataIndex: 'work',
        //width: '30%',
      },
      {
        name: '开仓均价',
        dataIndex: 'work',
        //width: '30%',
      },
      {
        name: '持续占用保证金',
        dataIndex: 'work',
        //width: '30%',
      },
      {
        name: '维持保证金',
        dataIndex: 'work',
        //width: '30%',
      },
      {
        name: '强平价格',
        dataIndex: 'work',
        //width: '30%',
      },
      {
        name: '浮动盈亏(收益率)',
        dataIndex: 'work',
        //width: '30%',
      },
      {
        name: '操作',
        dataIndex: 'work',
        //width: '30%',
      },

    ]
    let data = [
      {
        name: '1',
        age: '1',
        sex: '1',
        work: '1'
      }
    ]
    data = data.length > 4 ? data : data.concat((new Array(4 - data.length)).fill({
      name: '',
      age: '',
      sex: '',
      work: ''
    }))
    const tableProp = {
      head, data
    }
    return (
      <div
        className={
          classNames(
            {
              view: true
            },
            styles.position
          )
        }
      >
        <ScrollPannel
          scroller={false}
          header={
            <div >当前持仓</div >
          }
        >
          <Table className={styles.table} {...tableProp}>等等</Table >

        </ScrollPannel >
      </div >
    )
  }
}

