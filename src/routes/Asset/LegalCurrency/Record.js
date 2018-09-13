import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, Table, PagiNation } from '@components'
import NoDataTip from '@routes/Components/NoDataTip'
import { getColumns } from '@routes/Components/LegalAssetRecordTable'
import styles from '@routes/Asset/index.less'

@connect(({ modal, Loading, asset }) => ({
  modal,
  loading: Loading,
  model: asset
}))
export default class View extends Component {
  state = {
    currentPage: 0
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    this.getOrderRecord()
  }

  getOrderRecord = () => {
    const { dispatch, modelName } = this.props
    const { currentPage } = this.state
    dispatch({
      type: `${modelName}/getOrder`,
      payload: {
        page: currentPage + 1,
        limit: 20,
        all: true
      }
    })
  }


  render() {
    const { changeState, getOrderRecord } = this
    const { calculateTableHeight, model: { recordLegal = [], recordLegalTotalPage: totalPage = 1 } = {}, loading, modelName } = this.props
    const { currentPage } = this.state
    const columns = getColumns()
    const dataSource = recordLegal
    const tableProp = {
      loading: loading.effects[`${modelName}/getOrderRecord`],
      className: styles.tableContainer,
      columns,
      dataSource: dataSource,
    }

    const pageProp = {
      total: totalPage,
      currentPage,
      onPageChange: (e) => {
        changeState({
          currentPage: e
        }, () => {
          getOrderRecord()
        })
      },
      containerClassName: styles.paginationcontainerClassName,
      pageClassName: 'paginationpageClassName',
      activeClassName: 'paginationpageActiveClassName',
      previousClassName: 'paginationpageClassName',
      nextClassName: 'paginationpageClassName',
    }
    return (
      <Mixin.Child that={this} >
        <div className={styles.assetrecord} >
          <div className={styles.title} >资金记录</div >
          <div style={{ height: calculateTableHeight(dataSource) }} className={styles.tablec} >
            {
              dataSource.length ? (<Table {...tableProp} />) : (

                <NoDataTip text={'暂无资金记录'} />
              )
            }

          </div >
          <div className={styles.pagenations} >
            <PagiNation {...pageProp} />
          </div >

        </div >
      </Mixin.Child >
    )
  }
}


