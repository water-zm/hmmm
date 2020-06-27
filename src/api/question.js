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
// 删除设置
export function removeQuestion(data) {
    return instance({
        url: '/question/remove',
        method: 'post',
        data,
    })
}
// 发布题目
export function addQuestion(data) {
    return instance({
        url: '/question/add',
        method: 'post',
        data,
    })
}
// 编辑题目
export function editQuestion(data) {
    return instance({
        url: '/question/edit',
        method: 'post',
        data,
    })
}