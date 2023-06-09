import request from "@/utils/system/request";

export function optimization(data){
    return request({
        url: '/optimization',
        method: 'get',
        // baseURL: '/mock',
        params: data
    })
}
