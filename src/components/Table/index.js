import React, { Component } from 'react'
import { _, classNames, getPercent, isEqual } from '@utils'
import { Scroller } from '@components'
import * as styles from './index.less'

const createElement = (_className) => {
  return (Props) => {
    const { className, style, children, onClick } = Props
    return (
      <div className={
        classNames(
          { [_className]: true },
          className
        )
      } style={style} onClick={(e) => {
        _.isFunction(onClick) && onClick(e)
      }} >{children}</div >
    )
  }
}

const [Table, Thead, Tbody, Tr, Th, Td] = [
  createElement('table'),
  createElement('thead'),
  createElement('tbody'),
  createElement('tr'),
  createElement('th'),
  createElement('td'),
]

export default class View extends Component {

  state = {
    x: 0,
    loading: false
  }

  componentDidUpdate(prevProps) {
    const { dataSource: prevDataSource } = prevProps
    const { dataSource } = this.props
    if (!isEqual(prevDataSource, dataSource) && dataSource) {
      this.changeState()
    }
  }

  componentWillUnmount() {
    window.onresize = null
  }

  changeState = (payload) => {
    this.setState(payload)
    setTimeout(() => {
      this.scroller && this.scroller.refresh()
    }, 10)
  }

  getScroller = (scroller) => {
    const { loadingMore } = this.props
    if (!this.scroller && scroller) this.scroller = scroller
    let prevX = 0
    window.onresize = () => {
      this.changeState()
    }
    scroller.on('scroll', ({ x, y }) => {
      const { maxScrollY, movingDirectionY } = scroller
      if (prevX !== x) {
        this.changeState({ x })
        prevX = x
      }
      if (loadingMore && _.isFunction(loadingMore)) {
        if (y - maxScrollY < 3 && movingDirectionY === 1 && !this.state.loading && !this.interval) {
          this.interval && clearTimeout(this.interval)
          this.changeState({
            loading: true
          })
          this.interval = setTimeout(() => {
            loadingMore(() => {
              this.changeState({
                loading: false
              })
              setTimeout(() => {
                this.interval = null
              }, 700)
            })
          }, 100)
        }
      }
    })
  }

  render() {
    const {
      className = {},
      style = {},
      children,
      columns = [],
      dataSource = [],
      expandedRowRender,
      onClickRow,
      noDataTip,
      scroll = {}
    } = this.props

    const getTdThProp = (item = {}) => {
      const style = item.width ? { width: item.width, minWidth: item.width } : {
        width: getPercent(1, columns.length),
      }
      return {
        style,
        className: item.className
      }
    }


    const scrollerConfig = {
      getScroller: this.getScroller,
      scroll
    }

    const { loading } = this.state
    return (
      <div className={
        classNames(
          styles.tableContainer,
          className
        )
      } >
        {
          _.isFunction(noDataTip) && noDataTip() ? (
            noDataTip()
          ) : (
            <Table className={style.table} >
              <Thead style={{ left: this.state.x, minWidth: scroll.x }} >
              <Tr >
                {
                  columns.map((item = {}, index) => (
                    <Th key={index} {...getTdThProp(item)}>{item.title}</Th >
                  ))
                }
              </Tr >
              </Thead >
              <div className={styles._scrollerTableContainer} >
                <div className={styles._scrollerTable} >
                  <Scroller {...scrollerConfig}>
                    <Tbody >
                    {
                      dataSource.map((item = {}, index) => {
                        return (
                          <React.Fragment key={index} >
                            <Tr
                              className={
                                classNames(
                                  index % 2 === 0 ? 'even' : 'odd'
                                )
                              }
                              onClick={(e) => {
                                _.isFunction(onClickRow) && onClickRow(item, e)
                              }}
                            >
                              {
                                columns.map((item2 = {}, index2) => {
                                  let result = ''
                                  let className
                                  const key = item2.dataIndex
                                  let value = item[key]
                                  if (_.isNaN(value) || _.isUndefined(value)) {
                                    result = (<span style={{ opacity: .5 }} >--</span >)
                                  } else {
                                    if (_.isFunction(item2.render)) {
                                      value = item2.render(value, item, index, dataSource)
                                    }
                                    if (_.isObject(value) && !_.has(value, '$$typeof')) {
                                      result = value.value
                                      className = value.className
                                    } else {
                                      result = value
                                    }
                                  }
                                  return (
                                    <Td key={index2} {...getTdThProp(item2)} className={
                                      classNames(
                                        item2.className,
                                        className
                                      )
                                    } >{result}</Td >
                                  )
                                })
                              }
                            </Tr >
                            {
                              expandedRowRender && _.isFunction(expandedRowRender) ? expandedRowRender(item) : null
                            }
                          </React.Fragment >
                        )
                      })
                    }
                    </Tbody >
                    {
                      loading ? (<div className={styles.loadingmore} >加载更多......</div >) : null
                    }
                  </Scroller >
                </div >
              </div >
            </Table >
          )
        }

      </div >
    )
  }
}
