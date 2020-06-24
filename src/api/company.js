import instance from '@/utils/request'

// 列表
export function getCompanyList(params) {
    return instance({
        url: '/enterprise/list',
        params
    })
}

// 状态
export function statusSet(data) {
    return instance({
        url: '/enterprise/status',
        method: 'post',
        data
    })
}

// 删除
export function companyRemove(data) {
    return instance({
        url: '/enterprise/remove',
        method: 'post',
        data
    })
}
// 添加
export function companyAdd(data) {
    return instance({
        url: '/enterprise/add',
        method: 'post',
        data
    })
}
// 编辑
export function companyEdit(data) {
    return instance({
        url: '/enterprise/edit',
        method: 'post',
        data
    })
}