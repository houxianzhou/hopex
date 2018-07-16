import { _ } from '@utils'

export default function (Props) {
  const {
    head = [
      {
        name: '姓名',
        dataIndex: 'name',
      },
      {
        name: '年龄',
        dataIndex: 'age',
      },
      {
        name: '性别',
        dataIndex: 'sex',
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
    ]
  } = Props
  return (
    <table >
      <thead >
      <tr >
        {
          head.map(item => (
            <th key={item.name} >{item.name}</th >
          ))
        }
      </tr >
      </thead >
      <tbody >
      {
        data.map((item = {}, index) => {
          return (
            <tr key={index} >
              {
                head.map((item2 = {}, index2) => {
                  const key = item2.dataIndex
                  return (
                    <td key={index2} style={{ border: '1px solid red' }} >{item[key]}</td >
                  )
                })
              }
            </tr >
          )
        })
      }
      </tbody >

    </table >
  )
}
