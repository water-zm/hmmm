import instance from '@/utils/request.js'

// 获取用户信息
export function getUserInfo() {
    return instance({
        url: '/info'
    })
}

// 退出
export function logout() {
    return instance({
        url: '/logout'
    })
}