import axios from 'axios';
import {
    Message
} from 'element-ui'; // 单独引入 Message：
import {
    localGet,
    localRemove
} from './local'
import router from '@/router/index.js'
// 自定义配置新建一个 axios 实例
let instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
});

// =============================================

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (localGet()) {
        config.headers.token = localGet()
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    window.console.log(response)
    // 对响应数据做点什么
    //                                noerror: true, // 不执行响应拦截器的错误处理
    if (response.data.code === 200 || response.config.noerror == true) {
        return response.data;
    } else if (response.data.code === 206) {
        // 状态码206 token有误
        localRemove();
        router.push('/')
        Message.error('老老实实登录去')
        return Promise.reject(response.data.message);
    } else {
        Message.error(response.data.message)
        return Promise.reject(response.data.message);
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance