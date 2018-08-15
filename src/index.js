// import "babel-polyfill"
import 'normalize.css'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'

// import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { ROOT } from '@constants'

import './index.less'



moment.locale('zh-cn')
// 1. Initialize
const app = dva({
  history: createHistory(),

})


// 2. Plugins
app.use(createLoading({
  namespace: 'Loading'
}))
// 4. Router
app.router(require('./router').default)

// 5. Start
app.start(ROOT)





