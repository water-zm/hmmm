import instance from '@/utils/request.js'

export function login(data) {
    return instance({
        method: 'post',
        url: '/login',
        data,
        noerror: true
    })
}