import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs';



export default [
    {
        url: `/mock/data/list`,
        method: 'post',
        response: ({ body }: { body: any }) => {
            const {page, pageSize} = body
            return {
                code: 200,
                data: {
                    // [`list|${pageSize}`]: [{
                    //     'id|+1': 0,
                    //     'name': '@name',
                    //     'weight': Mock.Random.boolean() ? Mock.Random.float(1, 1000, 0, 2) : Mock.Random.natural(1, 1000),
                    //     'value': Mock.Random.boolean() ? Mock.Random.float(1, 1000, 0, 2) : Mock.Random.natural(1, 1000)
                    // }],
                    [`list|${pageSize}`]: [{
                        'id|+1': 0,
                        'name': '@name',
                        'weight': Mock.Random.boolean() ? Mock.Random.float(1, 1000, 0, 2) : Mock.Random.natural(1, 1000),
                        'value': Mock.Random.boolean() ? Mock.Random.float(1, 1000, 0, 2) : Mock.Random.natural(1, 1000)
                    }],
                    pager: {
                        page: page,
                        pageSize: pageSize,
                        total: 198
                    }
                },
                msg: ''
            };

        }
    },
    {
        url: `/mock/data/getTableCols`,
        method: 'get',
        response: ({ body }: { body: any }) => {
            return {
                code: 200,
                data: {
                    [`list|${10}`]: [
                        {
                            'label|+1': ['index1','index2','index3','index4','index5','index6','index7','index8','index9','index10'],
                            'prop|+1': ['index1','index2','index3','index4','index5','index6','index7','index8','index9','index10'],
                        },
                    ],
                    msg: ''
                }
            }
        }
    },
    {
        url: `/mock/data/getGruops`,
        method: 'get',
        response: ({ body }: { body: { pageSize: number } }) => {
            const pageSize = body.pageSize
            console.log(pageSize)
            return {
                code: 200,
                data: {
                    [`list|50`]: [{
                        'id|+1': 0,
                        rows: Mock.Random.natural(1, 1000),
                        cols: Mock.Random.natural(1,1000),
                        time: Mock.Random.time()
                    }],
                    msg: '',
                    pager:{
                        page: 1,
                        pageSize:20,
                        total:198
                    }
                }
            }
        }
    },

]
