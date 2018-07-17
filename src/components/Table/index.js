import { _, classNames } from '@utils'
import { Scroller } from '@components'
import * as styles from './index.less'

export default function (Props) {
  const {
    head = [
      {
        name: '姓名',
        dataIndex: 'name',
        width: 200,
        render: (value, data) => {
          return value
        }
      },
      {
        name: '年龄',
        dataIndex: 'age',
        width: 200,
      },
      {
        name: '性别',
        dataIndex: 'sex',
        width: 200,
      },
      {
        name: '操作',
        render: (value, item) => {
          return (
            <button onClick={() => {
              alert(JSON.stringify(item))
            }} >点击</button >
          )
        }
      }
    ],
    data = [
      {
        sex: '男',
        age: 20,
        name: 'weixiaoyi',
      },
      {
        sex: '女',
        age: 45,
        name: 'wangyifan',
      }
    ],
    className = {}
  } = Props
  const renderCols = () => (
    <colgroup >
      {
        head.map(item => (
          <col key={item.name} style={
            item.width ? { width: item.width, minWidth: item.width } : {}
          } />
        ))
      }
    </colgroup >
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
                <th key={item.name} >{item.name}</th >
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
                          return (
                            <td key={index2} >{value}</td >
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
