import request from "@/utils/system/request";


// 获得树的结构
export function getTableCols(data){
    return request({
        url: '/data/getTableCols',
        method: 'get',
        params: data,
        // baseURL: '/mock',
    })
}

export function getDatas(data){
    return request({
        url: '/data/getDatas',
        method: 'get',
        params: data,
        // baseURL: '/mock',
    })
}

export function deleteDatas(data){
    return request({
        url: "/data/deletedata",
        method: "delete",
        params: data,
    })
}

export function updateData(data){
    return request({
        url: "/data/updatedata",
        method: "post",
        data,
    })
}

export function addData(data: object) {
    return request({
        url: '/data/add',
        method: 'post',
        // baseURL: '/mock',
        data
    })
}
