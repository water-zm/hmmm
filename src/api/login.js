import axios from 'axios';
import {
    Message
} from 'element-ui'; // 单独引入 Message：
// 自定义配置新建一个 axios 实例
let _fetch = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
});

// =============================================

// 添加请求拦截器
_fetch.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
_fetch.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code === 200) {
        return response.data;
    } else {
        Message.error(response.data.message)
        return Promise.reject(response.data.message);
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// =============================================

// 短信验证码接口
export function sendsms(data) {
    return _fetch({
        url: '/sendsms',
        method: 'post',
        data
    })
}
// 用户注册接口
export function register(data) {
    return _fetch({
        url: '/register',
        method: 'post',
        data
    })
}