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