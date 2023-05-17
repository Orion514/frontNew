import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs';

export default [
    {
        url: `/mock/result/getResult`,
        method: 'get',
        response: ({ body }: { body: any }) => {
            const {page, pageSize} = body
            // return {
            //   code: 200,
            //   data: {
            //     [`list|${pageSize}`]: [{
            //       'id|+1': 0,
            //       'name1': '@name',
            //       'name2': '@name',
            //       'name3': '@name',
            //       'name4': '@name',
            //       'weight4': Mock.Random.boolean() ? Mock.Random.float(1, 1000, 0, 2) : Mock.Random.natural(1, 1000),
            //       'weight3': Mock.Random.boolean() ? Mock.Random.float(1, 1000, 0, 2) : Mock.Random.natural(1, 1000),
            //       'weight2': Mock.Random.boolean() ? Mock.Random.float(1, 1000, 0, 2) : Mock.Random.natural(1, 1000),
            //       'weight1': Mock.Random.boolean() ? Mock.Random.float(1, 1000, 0, 2) : Mock.Random.natural(1, 1000)
            //     }],
            //     pager: {
            //       page: page,
            //       pageSize: pageSize,
            //       total: 198
            //     }
            //   },
            //   msg: ''
            // };

            return {
                code: 200,
                data: {
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
        url: `/mock/result/tree`,
        method: 'get',
        response: ({ body }: { body: any }) => {
            return {
                code: 200,
                data: [{
                    label: '数据1(health_level)',
                    dataid: 100,
                    indexid:1,
                    children: [{
                        label: 'pm_health',
                        dataid: 101,
                        indexid: 23,
                    }, {
                        label: 'liv_abha',
                        dataid: 101,
                        indexid: 24,
                    }]
                }, {
                    label: '数据2(health_level)',
                    dataid: 101,
                    indexid:2,
                    children: [{
                        label: 'pm_health',
                        dataid: 101,
                        indexid: 23,
                    }, {
                        label: 'liv_abha',
                        dataid: 101,
                        indexid: 24,
                    }]
                }
                ],
                msg: ''
            };
        }
    },
    {
        url: `/mock/result/getDataIds`,
        method: 'get',
        response: ({ body }: { body: any }) => {
            return {
                code: 200,
                data: {
                    ['list|50']:[{
                        'id|+1': 0,
                        'name': '@name',
                    }],
                    pager: {
                        page: 1,
                        pageSize: 20,
                        total: 200
                    }
                },
                msg: ''
            };
        }
    }
]
