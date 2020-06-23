import instance from '@/utils/request.js'

// 短信验证码接口
export function getSubjectList(params) {
    return instance({
        url: '/subject/list',
        noerror: true, // 不执行拦截器的响应错误处理
        params
    })
}

// 新增学科
export function addSubject(data) {
    return instance({
        url: '/subject/add',
        method: 'post',
        data
    })
}

// 删除学科
export function removeSubject(data) {
    return instance({
        url: '/subject/remove',
        method: 'post',
        data
    })
}

// 学科修改状态
export function setSubjectStatus(data) {
    return instance({
        url: '/subject/status',
        method: 'post',
        data
    })
}

// 编辑学科
export function editSubject(data) {
    return instance({
        url: "/subject/edit",
        method: 'post',
        data
    })
}