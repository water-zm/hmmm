import instance from '@/utils/request.js'

// 列表
export function getUserList(params) {
    return instance({
        url: '/user/list',
        params
    })
}
// 删除
export function removeUser(data) {
    return instance({
        url: '/user/remove',
        method: 'post',
        data
    })
}
// 修改状态
export function setStatus(data) {
    return instance({
        url: '/user/status',
        method: 'post',
        data
    })
}
// 新增
export function addUser(data) {
    return instance({
        url: '/user/add',
        method: 'post',
        data
    })
}
// 编辑
export function editUser(data) {
    return instance({
        url: '/user/edit',
        method: 'post',
        data
    })
}