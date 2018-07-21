import { _, classNames, getPercent } from '@utils'
import { Scroller } from '@components'
import * as styles from './index.less'

const createElement = (_className) => {
  return (Props) => {
    const { className, style, children } = Props
    return (
      <div className={
        classNames(
          styles[_className],
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

export default (Props) => {
  const {
    className = {},
    scrollerConfig = {},
    style = {},
    children,
    head = [],
    data = []
  } = Props

  const getTdThProp = (item = {}) => {
    const length = head.length
    const style = item.width ? { width: item.width, minWidth: item.width } : {
      width: getPercent(1, head.length),
    }
    return {style}
  }
  return (
    <div className={
      classNames(
        styles.tableContainer,
        className
      )
    } >
      <Table >
        <Thead >
        <Tr >
          {
            head.map((item = {}, index) => (
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
                data.map((item = {}, index) => {
                  return (
                    <Tr key={index} >
                      {
                        head.map((item2 = {}, index2) => {
                          const key = item2.dataIndex
                          let value = item[key]
                          if (_.isFunction(item2.render)) {
                            value = item2.render(value, item)
                          }
                          value = !_.isNaN(value) && !_.isUndefined(value) ? value : ''
                          return (
                            <Td key={index2} {...getTdThProp(item2)}>{value}</Td >
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
