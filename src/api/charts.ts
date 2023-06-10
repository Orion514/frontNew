import request from "@/utils/system/request";


// 获得树的结构
export function getTreeChartData(data){
    return request({
        url: "/result/TreeSceneDisplay",
        method: 'get',
        // baseURL: '/mock',
        params: data
    })
}



// 给定sceneid和dataid  获得一颗树的结果
export function getResultTreeChartData(data:any){
    return request({
        url: "/result/tree/all",
        method: 'get',
        // baseURL: '/mock',
        params: data,
    })
}

