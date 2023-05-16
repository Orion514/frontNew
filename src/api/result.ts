import request from '@/utils/system/request'


// 获取树结构api(不含叶子节点)
export function getTree(data) {
    return request({
        url: '/result/tree',
        method: 'get',
        // baseURL: '/mock',
        params: data
    })
}

export function getData(data) {
    return request({
        url: '/result/getResult',
        method: 'get',
        // baseURL: '/mock',
        params: data
    })
}
