import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import { classNames } from '@utils'
import * as styles from './index.less'

export default class View extends Component {
  state = {
    page: 0
  }

  render() {
    const { page } = this.state
    const {
      forcePage,
      initialPage = 0,
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
      <ReactPaginate
        initialPage={initialPage}
        forcePage={forcePage}
        onPageChange={(e) => {
          this.setState({
            page: e.selected
          })
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
            page === 0 ? styles.hide : null
          )
        }
        nextClassName={
          classNames(
            styles.nextClassName,
            nextClassName,
            page === total-1 ? styles.hide : null
          )
        }
      />
    )
  }
}
