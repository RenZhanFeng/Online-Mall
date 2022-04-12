import request from './request'
import qs from 'qs'

// 发送手机验证码
export const SendVerificationCodeApi = (params) => request.post('/sendSMS', qs.stringify(params))

// 手机号验证码登录
export const PhoneLoginApi = (params) => request.post('/phoneRegin', qs.stringify(params))

// 首页精品推荐数据请求
export const JingpinApi = () => request.get('/products/recommend')

// 微信登录（这个接口必须用qs对数据进行格式化）
export const WeixinLoginApi = (params) => request.post(`/wechatUsers/PCLogin`, qs.stringify(params))
