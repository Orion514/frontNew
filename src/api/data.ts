import request from "@/utils/system/request";


// 获得树的结构
export function getTableCols(){
    return request({
        url: '/data/getTable',
        method: 'get',
        baseURL: '/mock',
    })
}
