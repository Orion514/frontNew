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


// 根据dataId和indexId得到直接孩子
export function getData(data) {
    return request({
        url: '/result/getResult',
        method: 'get',
        // baseURL: '/mock',
        params: data
    })
}

// 根据groupId得到DataIds
export function getDataIdsByGroupId(data){
    return request({
        url: '/result/getDataIds',
        method: 'get',
        baseURL: '/mock',
        params: data
    })
}


