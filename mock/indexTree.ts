import Mock from "mockjs";

export default [
    {
        url: '/mock/indextree/del',
        method: 'get',
        response: ({body}:{body : any}) => {
            return{
                code: 200,
                msg:'删除成功'
            }
        }
    }
]
