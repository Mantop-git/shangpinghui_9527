//mock用来模拟后台传数据
import Mock from 'mockjs'
import axios from 'axios';
import banner from './banner.json'
import floor from './floor.json'
import NProgress from 'nprogress'
const mockRequest = axios.create({
    baseURL: '/mock',
    timeout: 5000
})
//请求拦截
mockRequest.interceptors.request.use(config => {
    // Do something before request is sent
    NProgress.start()
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

//响应拦截
mockRequest.interceptors.response.use(response => {
    // Do something before response is sent 
    NProgress.done()
    return response;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});

Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })

export default mockRequest