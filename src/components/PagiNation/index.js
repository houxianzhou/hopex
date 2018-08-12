import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import { classNames } from '@utils'
import * as styles from './index.less'

export default class View extends Component {
  render() {
    const {
      forcePage,
      initialPage = 0,
      onPageChange,
      pageCount = 20,
      previousLabel = '上一页',
      nextLabel = '下一页',
      containerClassName,
      pageClassName,
      activeClassName,
      previousClassName,
      nextClassName
    } = this.props
    return (
      <ReactPaginate
        initialPage={initialPage}
        forcePage={forcePage}
        onPageChange={onPageChange}
        pageCount={pageCount}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        containerClassName={
          classNames(
            styles.container,
            containerClassName,
          )
        }
        pageClassName={
          classNames(
            styles.pageClassName,
            pageClassName,
          )
        }
        activeClassName={
          classNames(
            styles.activeClassName,
            activeClassName,
          )
        }
        previousClassName={
          classNames(
            styles.previousClassName,
            previousClassName,
          )
        }
        nextClassName={
          classNames(
            styles.nextClassName,
            nextClassName,
          )
        }
      />
    )
  }
}
