//将项目需要发送网络请求封装成一个模块
import request from './request';
import mockRequest from '../mock/mockServer.js'
//三级列表
 export const reqCategoryList=()=> {

     return request({
         url:'/product/getBaseCategoryList',
         method :'get'
     })
 }
export const reqGetBannerList=()=>{
    return mockRequest({
        url:'/banner',
        method:'get'
    })
}
