import { request } from '@utils'
import { API } from "@constants"

let { MOCKIP, UserIp0, USERIP, USERIP2, UserIp3, UserIp4 } = API
export const MODE = 'mock1'

// mock数据
if (MODE === 'mock') {
  UserIp0 = `/mock${UserIp0}`
  UserIp3 = `/mock${UserIp3}`
  UserIp4 = `/mock${UserIp4}`
  require('./socketServer')
}

// OTC卖出数字货币
export async function sellOTC(payload) {
  return request(`${UserIp0}/User/otc/Sell`, {
    method: 'post',
    body: payload
  })
}


// 提现发送邮箱验证码
export async function BeforesellOTCSendMail(payload) {
  return request(`${UserIp0}/User/otc/SendEmailToOTCWithdraw`, {
    method: 'post',
    body: payload
  })
}


// 获取订单
export async function getOrder(payload) {
  return request(`${UserIp0}/User/otc/GetOrders`, {
    query: payload
  })
}


// 人民币购买数字货币
export async function buyOTC(payload) {
  return request(`${UserIp0}/User/otc/Buy`, {
    method: 'post',
    body: payload
  })
}


// 获取法币买入数字货币参数
export async function getBuyParameter(payload) {
  return request(`${UserIp0}/User/otc/GetBuyParameter`, {
    query: payload
  })
}

// 获取法币提现参数
export async function getSellParameter(payload) {
  return request(`${UserIp0}/User/otc/GetSellParameter`, {
    query: payload
  })
}

// 获取对人民币汇率
export async function getExchangeRate(payload) {
  return request(`${UserIp0}/User/otc/GetToCNYExchangeRate`, {
    query: payload
  })
}


// 解除绑定
export async function doRemoveBindBank(payload) {
  return request(`${UserIp0}/gateway/Certification/BankUnBind`, {
    query: payload
  })
}

// 银行卡认证
export async function doVertifyBank(payload) {
  return request(`${UserIp0}/gateway/Certification/BankVerify`, {
    method: 'post',
    body: payload
  })
}

//实名认证
export async function doVertifyIdCard(payload) {
  return request(`${UserIp0}/gateway/Certification/IdCardVerify`, {
    method: 'post',
    body: payload
  })
}

//获取用户的认证信息
export async function getCertificationAll(payload) {
  return request(`${UserIp0}/gateway/Certification/All`, {
    query: payload
  })
}

//获取盘口区间
export async function getIntervals(payload) {
  return request(`${UserIp0}/gateway/OrderBook/Intervals`, {
    query: payload
  })
}

//获取资金记录
export async function getAssetRecord(payload) {
  return request(`${UserIp0}/User/GetTrans`, {
    query: payload
  })
}

//提现申请
export async function doWithdrawApply(payload) {
  return request(`${UserIp0}/User/WithdrawApply`, {
    method: 'post',
    body: payload
  })
}


//发送提现确认邮件
export async function SendEmailToWithdraw(payload, errHandler) {
  return request(`${UserIp0}/User/SendEmailToWithdraw`, {
    method: 'post',
    body: payload,
    errHandler
  })
}

//取提现参数
export async function getWithdrawParameter(payload) {
  return request(`${UserIp0}/User/GetWithdrawParameter`, {
    query: payload
  })
}


//获取存款钱包地址
export async function getAssetAddress(payload) {
  return request(`${UserIp0}/User/GetUserAssetWalletAddr`, {
    query: payload
  })
}

//交易概况
export async function getAssetSummary(payload) {
  return request(`${UserIp0}/gateway/Trade/Summary`, {
    query: payload,
    needLoop: true
  })
}

// 最新成交列表
export async function getLatestRecord(payload) {
  return request(`${UserIp0}/gateway/Home/GetDeals`, {
    // method: 'post',
    query: payload,
    needLoop: true,
    needWatch: false
  })
}

// 委托列表
export async function getEnsureRecord(payload) {
  return request(`${UserIp0}/gateway/OrderBook/Index`, {
    method: 'post',
    body: payload,
    needLoop: true,
    needWatch: false
  })
}

// 查询用户钱包里面所有的结算货币(相关属性)
export async function getPurseAssetList(payload) {
  return request(`${UserIp4}/balance.query`, {
    method: 'post',
    body: payload
  })
}

// 获取所有的合约列表
export async function getAllMarkets(payload) {
  return request(`${UserIp3}/market.list`, {
    method: 'post',
    body: payload
  })
}

export async function getAllMarketDetails(payload) {
  return request(`${UserIp0}/gateway/Home/Contracts`, {
    // method: 'post',
    query: payload
  })
}

//交易buy,sell依赖
export async function getBuySellDetail(payload) {
  return request(`${UserIp0}/gateway/Trade/OrderParameter`, {
    method: 'post',
    body: payload
  })
}

//获取用户当前合约的费率
export async function getMarketFee(payload) {
  return request(`${UserIp0}/gateway/Trade/FeeRate`, {
    query: payload
  })
}

//查询最多添加或减少的保证金及强平价格
export async function calculatePositionEnsureMoney(payload) {
  return request(`${UserIp0}/gateway/User/AppendPositionMarginQuery`, {
    // method: 'post',
    query: payload
  })
}

//增加或减少持仓保证金
export async function doUpdatePositionEnsureMoney(payload) {
  return request(`${UserIp0}/gateway/User/UpdatePositionMargin`, {
    method: 'post',
    body: payload
  })
}


// 获取所有的个人持仓列表
export async function getPosition(payload) {
  return request(`${UserIp0}/gateway/User/Positions`, {
    query: payload
  })
}

// 获取所有的个人合约列表
export async function getPersonalEnsure(payload) {
  return request(`${UserIp0}/gateway/User/OpenOrders`, {
    query: payload
  })
}

//个人合约详情
export async function getPersonEnsureDetail(payload) {
  return request(`${UserIp0}/gateway/User/OrderDeals`, {
    // method: 'post',
    query: payload
  })
}

// 撤单
export async function doCancelPersonEnsure(payload) {
  return request(`${UserIp0}/gateway/User/CancelOrder`, {
    query: payload
  })
}


// 查询杠杆倍数
export async function getLeverage(payload) {
  return await request(`${UserIp0}/gateway/Trade/GetLeverageSetting`, {
    query: payload
  })
}

// 更新杠杆倍数
export async function doUpdateLeverage(payload) {
  return await request(`${UserIp0}/gateway/Trade/SetLeverage`, {
    query: payload
  })
}

// tradeviewK线图及其上面的价格指数，24小时最高最低
export async function getKlineAllList(payload) {
  return await request(`${UserIp0}/gateway/Home/KLines`, {
    // method: 'post',
    query: payload
  })
}

// tradeviewK上面的价格指数，24小时最高最低
export async function getKlineDetail(payload) {
  return await request(`${UserIp0}/gateway/Home/ContractSummary`, {
    // method: 'post',
    query: payload
  })
}

// 用户历史委托
export async function getPersonalEnsureHistory(payload, payload2) {
  return await request(`${UserIp0}/gateway/User/HistoryOrders`, {
    method: 'post',
    body: payload,
    query: payload2
  })
}

// 下限价单
export async function postLimitOrder(payload) {
  return await request(`${UserIp0}/gateway/User/Order`, {
    method: 'post',
    body: payload
  })
}

// 下市价单
export async function postMarketOrder(payload) {
  return await request(`${UserIp0}/gateway/User/Order`, {
    method: 'post',
    body: payload
  })
}

//全平
export async function doFullClose(payload) {
  return request(`${UserIp0}/gateway/User/FullClose`, {
    method: 'post',
    body: payload
  })
}


//检查网络状态
export async function getNetWork(payload) {
  return request(`${UserIp0}/gateway/home/ping`, {
    method: 'head'
  })
}






