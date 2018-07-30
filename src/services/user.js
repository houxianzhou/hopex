import { request } from '@utils'

const prefix = ''

export async function getCurrentUser() {
  return await request(`${prefix}/api/user`)
}

export async function doLogin(payload, errHandler) {
  return await request(`${prefix}/api/v1/User/Login`, {
    method: 'post',
    body: payload,
    errHandler,
  })
}

export async function doLoginOut(payload) {
  return await request('/api/v1.0/User/Logout')
}

// 开启二次验证后的登录
export async function doVertifyLogin(payload) {
  return await request('/api/v1.0/User/GoogleLogin', {
    query: payload
  })
}

// 注册前获取所有的国家
export async function getAllCountryCode(payload) {
  return await request(`${prefix}/api/v1/Country`)
}

// 注册,填写信息
export async function doRegister(payload, errHandler) {
  return await request(`${prefix}/api/v1/User/Regist`, {
    method: 'post',
    body: payload,
    errHandler
  })
}

// 注册，拿到注册短信码
export async function doSendRegistVerificationCode(payload, errHandler) {
  return await request(`${prefix}/api/v1/User/SendRegistVerificationCode`, {
    query: payload,
    errHandler
  })
}


// 这一步注册完成
export async function doRegisterVerify(payload, errHandler) {
  return await request(`${prefix}/api/v1/User/RegistActive`, {
    query: payload,
    errHandler
  })
}

// 修改密码前检测密码是否已经被注册
export async function doEmailExists(payload, errHandler) {
  return await request(`${prefix}/api/v1/User/EmailExists`, {
    query: payload,
    errHandler
  })
}

// 修改密码前发送邮箱验证码,  激活前发送验证码到邮箱这个系统自动调用
export async function doSendEmailCode(payload, errHandler) {
  return await request('/api/v1/User/SendEmailToResetPassword', {
    query: payload,
    errHandler
  })
}

//验证接受到的验证码单独一个接口
export async function doVertifyCode(payload, errHandler) {
  return await request('/api/v1/User/ResetPwdEmailVerify', {
    query: payload,
    errHandler
  })
}

//这一步修改密码完成
export async function doResetPassword(payload, errHandler) {
  return await request('/api/v1/User/ResetPassword', {
    method: 'post',
    body: payload,
    errHandler
  })
}


//开启google二次验证前获取二维码信息
export async function GetEnableGoogleVertifyCode(payload) {
  return await request('/api/v1.0/User/GetTwoFactoriesSetCode', {
    query: payload
  })
}

//开启google二次验证
export async function doEnableGoogleVertify(payload) {
  return await request('/api/v1.0/User/EnableTwoFactories', {
    query: payload
  })
}

//关闭google二次验证
export async function doDisbaleGoogleVertify(payload) {
  return await request('/api/v1.0/User/DisbaleTwoFactories', {
    query: payload
  })
}
