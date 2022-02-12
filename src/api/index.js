//将项目需要发送网络请求封装成一个模块
import request from './request';
import mockRequest from '../mock/mockServer.js'
//三级列表
export const reqCategoryList = () => {

    return request({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}
//获取bannerList数据
export const reqGetBannerList = () => {
    return mockRequest({
        url: '/banner',
        method: 'get'
    })
}
//获取floorList数据 上面的另一种写法
// export const reqGetFloorList = () => mockRequest.get('/floor')
export const reqGetFloorList = () => {
    return mockRequest({
        url: '/floor',
        method: 'get'
    })
}
export const reqWeixinList = () => {
    return mockRequest({
        url: '/pay',
        method: 'get'
    })
}

//search模块 获取搜索模块数据
export const reqGetSearchInfo=(params)=>{
    return request({
        url:'/list',
        method:'post',
        data:params
    })
}

//商品详情信息接口（放大）
export const reqGoodsInfo=(skuId)=>{
    return request({
        url:`/item/${skuId}`,
        method:'get'
    })
}

//购物车商品数量和信息
export const reqAddOrUpdateShopCart = (skuId, skuNum)=>{
    return request({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

//购物车列表数据
export const reqCartList=()=>{
    return request({
        url:'/cart/cartList',
        method:'get'
    })
}
//购物车数据数量修改
export const reqChangeGoodsNum = (skuId, skuNum)=>{
    return request({
        url:`/addToCart/${skuId}/${skuNum}`,
        // method
    })
}
 
//删除购物车商品
export const reqDeleteCart=(skuId)=>{
    return request({
        url:`cart/deleteCart/${skuId}`,
        method:'delete'
    })
} 
//获取注册验证码
export const reqGetCode = (telPhone)=>{
    return request({
        url:`/user/passport/sendCode/${telPhone}`,
        method:'get'
    })
}

//注册账号
export const reqRegister=(data)=>{
    return request({
        url:'/user/passport/register',
        data:data,
        method:'post'
    })
}
//登录账号
export const reqLogin=(data)=>{
    return request({
        url:'user/passport/login',
        data,
        method:'post'
    })
}
//获取用户信息
export const reqUserInfo=(token)=>{
    return request({
        url:'user/passport/auth/getUserInfo',
        method:'get'
    })
}
//退出登录
export const reqLogout=()=>{
    return request({
        url:'/user/passport/logout',
        method:'get'
    })
}
//获取用户地址
export const reqAddressInfo = () => {
    return request({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}
//商品清单
export const reqOrderInfo = () => {
    return request({
        url: '/order/auth/trade',
        method: 'get'
    })
}
//提交订单的接口
export const reqSubmitOrder=(tradeNo,data)=>{
    return request({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method:'post'
    })
}
//获取支付信息
export const reqPayInfo = (orderId) => {
    return request({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}
//获取支付状态
export const reqPayStatus= (orderId) => {
    return request({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
}
//获取个人中心数据
export const reqOrderList=(page,limit)=>{
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}