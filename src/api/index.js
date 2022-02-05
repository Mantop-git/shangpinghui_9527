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