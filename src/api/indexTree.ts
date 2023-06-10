import request from "@/utils/system/request";

export function getIndexTree(data){
    return request({
        url: '/indextree/getIndexTrees',
        method: 'get',
        // baseURL: '/mock',
        params: data
    })
}


// 删除指标体系树
export function deleteScene(data){
    return request({
        url: '/indextree/delete',
        method: 'get',
        // baseURL: '/mock',
        params: data
    })
}

