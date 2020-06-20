import instance from '@/utils/request.js'

// 短信验证码接口
export function sendsms(data) {
    return instance({
        url: '/sendsms',
        method: 'post',
        noerror: true, // 不执行拦截器的响应错误处理
        data
    })
}
// 用户注册接口
export function register(data) {
    return instance({
        url: '/register',
        method: 'post',
        data
    })
}