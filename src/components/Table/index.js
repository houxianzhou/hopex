import React, { Component } from 'react'
import { _, classNames, getPercent } from '@utils'
import { Scroller } from '@components'
import * as styles from './index.less'

const createElement = (_className) => {
  return (Props) => {
    const { className, style, children } = Props
    return (
      <div className={
        classNames(
          { [_className]: true },
          className
        )
      } style={style} >{children}</div >
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
    x: 0
  }

  getScroller = (scroller) => {
    scroller.on('scroll', (pos) => {
      this.setState({
        x: pos.x
      })
    })
  }

  render() {
    const {
      className = {},
      style = {},
      children,
      columns = [],
      dataSource = [],
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


    return (
      <div className={
        classNames(
          styles.tableContainer,
          className
        )
      } >
        <Table >
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
                      <Tr key={index} >
                        {
                          columns.map((item2 = {}, index2) => {
                            let result = ''
                            let className
                            const key = item2.dataIndex
                            let value = item[key]
                            if (_.isNaN(value) || _.isUndefined(value)) {
                              result = ''
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
                    )
                  })
                }
                </Tbody >
              </Scroller >
            </div >
          </div >
        </Table >
      </div >
    )
  }
}
