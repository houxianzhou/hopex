import { request } from '@utils'
const prefix='/mock'
export async function getCurrentUser() {
  return await request(`${prefix}/mock/api/user`)
}

export async function doLogin(payload) {
  return await request(`${prefix}/api/v1.0/User/Login`, {
    method: 'post',
    body: payload
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

// 注册,这一步做完拿到注册码
export async function doRegister(payload) {
  return await request('/api/v1.0/User/Regist', {
    method: 'post',
    body: payload
  })
}

// 这一步注册完成
export async function doRegisterVerify(payload) {
  return await request('/api/v1.0/User/RegistActive', {
    query: payload
  })
}

// 修改密码前检测密码是否已经被注册
export async function doEmailExists(payload) {
  return await request('/api/v1.0/User/EmailExists', {
    query: payload
  })
}

// 修改密码前发送邮箱验证码,  激活前发送验证码到邮箱这个系统自动调用
export async function doSendEmailCode(payload) {
  return await request('/api/v1.0/User/SendEmailToResetPassword', {
    query: payload
  })
}

//这一步修改密码完成
export async function doResetPassword(payload) {
  return await request('/api/v1.0/User/ResetPassword', {
    method:'post',
    body: payload
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
