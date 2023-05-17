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
        url: `/mock/data/getTable`,
        method: 'get',
        response: ({ body }: { body: any }) => {
            return {
                code: 200,
                data: {
                    [`list|${4}`]: [
                        {
                            'label|+1': ['id','name','weight','value'],
                            'prop|+1': ['id','name','weight','value']
                        },
                    ],
                    msg: ''
                }
            }
        }
    }


]
