import request from './request'
import qs from 'qs'

// 获取用户信息
export const UserProfilesApi = () => request.get('/shop/userProfiles')

// 发送手机验证码
export const SendVerificationCodeApi = (params) => request.post('/sendSMS', qs.stringify(params))

// 手机号验证码登录
export const PhoneLoginApi = (params) => request.post('/phoneRegin', qs.stringify(params))

// 微信登录（这个接口必须用qs对数据进行格式化）
export const WeixinLoginApi = (params) => request.post('/wechatUsers/PCLogin', qs.stringify(params))

// 首页精品推荐数据请求
export const JingpinApi = () => request.get('/products/recommend')

// 首页热门兑换数据请求
export const HotDataApi = () => request.get('/products/hot')

//商品详情页数据
export const ProductDataAPI = (params) => request.get(`/products/${params.id}`)

// 加入购物车
export const AddToShoppingCartAPI = (params) => request.post('/shop/carts/add', qs.stringify(params))

// 商品搜索（含首页的“更多”）
export const GoodsSearchApi = (params) => request.get('/products', { params })
