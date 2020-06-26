import instance from '@/utils/request.js'
// 题目列表
export function getQusetionList(params) {
    return instance({
        url: '/question/list',
        params,
    })
}

// 状态设置
export function setStatus(data) {
    return instance({
        url: '/question/status',
        method: 'post',
        data,
    })
}