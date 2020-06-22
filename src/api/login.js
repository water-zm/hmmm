// 用户注册接口
export function login(data) {
    return instance({
        method: 'post',
        url: '/login',
        data,
        noerror: true
    })
}