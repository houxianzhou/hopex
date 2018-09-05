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
  return request(`${UserIp4}/user.append_position_margin_query`, {
    method: 'post',
    body: payload
  })
}

//增加或减少持仓保证金
export async function doUpdatePositionEnsureMoney(payload) {
  return request(`${UserIp4}/position_margin_update`, {
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






