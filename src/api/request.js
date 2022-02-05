import axios from 'axios';

// import NProgress  from '../../node_modules/nprogress' 下载的依赖都在node_modules 傻子才这样导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Store from '@/store/detail'

const request = axios.create({
    baseURL: 'http://39.98.123.211/api/',
    timeout: 5000
})

//请求拦截
request.interceptors.request.use(config => {
    // Do something before request is sent
    //请求时给请求头加个字段
    // console.log(Store,'saaaaaaaaaaaaaaa');
    if (Store.state.uid_token){
        config.headers.userTempId = Store.state.uid_token
    }
    NProgress.start()
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

//响应拦截
request.interceptors.response.use(response => {
    // Do something before response is sent 
    NProgress.done()
    return response;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});

export default request