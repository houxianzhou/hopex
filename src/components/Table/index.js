import { _, classNames, getPercent } from '@utils'
import { Scroller } from '@components'
import * as styles from './index.less'

export default function (Props) {
  const {
    head = [],
    data = [],
    className = {}
  } = Props
  const renderCols = () => (
    <colgroup >
      {
        head.map(item => (
          <col key={item.name} style={
            item.width ? { width: item.width, minWidth: item.width } : {
              width: getPercent(1, head.length),
              minWidth: getPercent(1, head.length)
            }
          } />
        ))
      }
    </colgroup >
  )

  const getTdhProps = (className) => (
    {
      className
    }
  )
  return (
    <div className={
      classNames(
        className,
        styles.table
      )
    } >
      <div >
        <table >
          {
            renderCols()
          }
          <thead >
          <tr >
            {
              head.map(item => (
                <th key={item.name} {...getTdhProps(item.className)} >{item.name}</th >
              ))
            }
          </tr >
          </thead >
        </table >
      </div >
      <div className={styles.scrollercontainer} >
        <div className={styles.scroller} >
          <Scroller >
            <table >
              {
                renderCols()
              }
              <tbody >
              {
                data.map((item = {}, index) => {
                  return (
                    <tr key={index} >
                      {
                        head.map((item2 = {}, index2) => {
                          const key = item2.dataIndex
                          let value = item[key]
                          if (_.isFunction(item2.render)) {
                            value = item2.render(value, item)
                          }
                          value = !_.isNaN(value) && !_.isUndefined(value) ? value : ''
                          return (
                            <td key={index2} {...getTdhProps(item2.className)}>{value}</td >
                          )
                        })
                      }
                    </tr >
                  )
                })
              }
              </tbody >
            </table >
          </Scroller >
        </div >
      </div >
    </div >
  )
}
