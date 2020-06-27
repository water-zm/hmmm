import instance from '@/utils/request.js'
// 面板数据
export function getDataList() {
    return instance({
        url: '/data/title',
        method: 'post',
    })
}
// 企业题目统计
export function getDataStatistics() {
    return instance({
        url: '/data/statistics',
    })
}