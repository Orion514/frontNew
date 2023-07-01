import request from '@/utils/system/request'

// 上传文件
export function upload(data: object, url: string) {
    return request({
        url: '/upload'+url,
        method: 'post',
        // baseURL: '/mock',
        data
    })
}

// 上传指标体系数据
export function uplaodIndexTree(data: object, url: string){
    return request({
        url: '/upload' + url,
        method: 'post',
        data
    })
}
