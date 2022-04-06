import request from './request'
import qs from 'qs'

// 首页精品推荐数据请求
export const JingpinApi = () => request.get('/products/recommend')

// 微信登录（这个接口必须用qs对数据进行格式化）
export const WeixinLoginApi = (params) => request.post(`/wechatUsers/PCLogin`, qs.stringify(params))
