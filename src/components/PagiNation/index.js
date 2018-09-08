import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import { classNames } from '@utils'
import * as styles from './index.less'

export default class View extends Component {
  render() {
    const {
      currentPage = 0,
      // initialPage = 0,
      onPageChange,
      total = 20,
      previousLabel = '<',
      nextLabel = '>',
      containerClassName,
      pageClassName,
      activeClassName,
      previousClassName,
      nextClassName
    } = this.props
    return (
      total ? (
        <ReactPaginate
          // initialPage={initialPage}
          forcePage={currentPage}
          onPageChange={(e) => {
            onPageChange(e.selected)
          }}
          pageCount={total}
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
              currentPage === 0 || Number(total) <= 0 ? styles.hide : null
            )
          }
          nextClassName={
            classNames(
              styles.nextClassName,
              nextClassName,
              currentPage === total - 1 || Number(total) <= 0 ? styles.hide : null
            )
          }
        />
      ) : null
    )
  }
}
