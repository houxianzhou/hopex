import React, { Component } from 'react'
import { classNames } from '@utils'
import { connect } from 'dva'
import { Mixin, Table, PagiNation } from '@components'
import { pulldownpng } from '@assets'
import * as styles from '@routes/Question/index.less'

// const list = [
//   {
//     time: '2018-04-26 20:00:00',
//     content: 'BTCUSD0528',
//     price: '8888.88'
//   },
//   {
//     time: '2018-04-26 20:00:00',
//     content: 'BTCUSD0528',
//     price: '8888.88'
//   },
//   {
//     time: '2018-04-26 20:00:00',
//     content: 'BTCUSD0528',
//     price: '8888.88'
//   },
// ]

@connect(({ Loading, dispatch, question }) => ({
  dispatch,
  model: question,
  modelName: 'question',
  loading: Loading
}))
export default class View extends Component {
  state = {
    list: [
      {
        time: '2018-04-26 20:00:00',
        content: 'BTCUSD0528',
        price: '8888.88'
      },
      {
        time: '2018-04-26 20:00:00',
        content: 'BTCUSD0528',
        price: '8888.88'
      },
      {
        time: '2018-04-26 20:00:00',
        content: 'BTCUSD0528',
        price: '8888.88'
      },
    ],
    currentPage: 0
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {

  };
  changeState = (payload = {}) => {
    this.setState(payload)
  };

  getAssetRecord = () => {
    const { dispatch, modelName } = this.props;
    const { currentPage } = this.state;
    console.log(currentPage + 1)
    // dispatch({
    //   type: `${modelName}/getAssetRecord`,
    //   payload: {
    //     page: currentPage + 1
    //   }
    // })
  }


  render() {
    const { changeState, getAssetRecord } = this;
    const { model: { myName }, calculateTableHeight, dispatch, modelName, loading } = this.props;
    const { list, currentPage } = this.state;
    const pageProp = {
      total: list.length,
      currentPage,
      onPageChange: (e) => {
        changeState({
          currentPage: e
        }, () => {
          getAssetRecord()
        })
      },
      containerClassName: styles.paginationcontainerClassName,
      pageClassName: 'paginationpageClassName',
      activeClassName: 'paginationpageActiveClassName',
      previousClassName: 'paginationpageClassName',
      nextClassName: 'paginationpageClassName',
    }
    const columns = [
      {
        title: '结算时间',
        dataIndex: 'time'
      },
      {
        title: '合约',
        dataIndex: 'content'
      },
      {
        title: '结算价格',
        dataIndex: 'price'
      }
    ];
    const tableProps = {
      columns,
      dataSource: list,
      style: {
        table: {
          height: 200
        },
        td: {
          width: '30%'
        }
      },
      // classNames: styles.loginrecord,
      scroll: {},
    }

    return (
      <Mixin.Child that={this} >
        <div className={classNames(
          styles.container,
          styles.settlement
        )} >
          <div className={styles.questionTitle} >
            定期合约结算历史
          </div >
          <div style={{ height: calculateTableHeight(list, 50, 50) }} className={styles.tablec} >
            <Table style={{ color: 'white' }} {...tableProps} />
          </div >
          <PagiNation
            {...pageProp}
          />
        </div >
      </Mixin.Child >
    )
  }
}


