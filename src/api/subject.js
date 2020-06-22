import instance from '@/utils/request.js'

// 短信验证码接口
export function getSubjectList(params) {
    return instance({
        url: '/subject/list',
        noerror: true, // 不执行拦截器的响应错误处理
        params
    })
}