import Mock from "mockjs";

export default [
    {
        url: `/mock/group/getGroups`,
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
    {
        url: '/mock/group/del',
        method: 'get',
        response: ({body}:{body : any}) => {
            return{
                code: 200,
                msg:'删除成功'
            }
        }
    }
]
