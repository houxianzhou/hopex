// import {_} from '../../utils/index.js'
onmessage = function (event) {
  const { prevTotal, data, total,RG } = event.data
  const prevDataValue = (prevTotal.filter(item => item.dataIndex === data.dataIndex)[0] || {}).dataValue
  const dataValue = data.dataValue
  postMessage({
    prevTotal,
    total,
    prevDataValue,
    dataValue,
    RG
  })
};

