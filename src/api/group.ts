import request from "@/utils/system/request";

export function getGroupsByUserIdAndSceneId(data){
    return request({
        url: '/group/getGroups',
        method: 'get',
        // baseURL: '/mock',
        params: data
    })
}

export function del(data){
    return request({
        url: '/group/deleteGroup',
        method: 'get',
        // baseURL: '/mock',
        params: data
    })
}

