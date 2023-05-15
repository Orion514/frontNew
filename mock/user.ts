import { MockMethod } from 'vite-plugin-mock'
const users = [
  { name: 'admin', password: 'e10adc3949ba59abbe56e057f20f883e', token: 'admin', info: {
    name: '系统管理员', role: 'admin'
  }},
  { name: 'editor', password: 'e10adc3949ba59abbe56e057f20f883e', token: 'editor', info: {
    name: '编辑人员' , role: 'user'
  }}
]
// @ts-ignore
export default [
  {
    url: `/mock/user/login`,
    method: 'post',
    response: ({ body }: { body: any }) => {
      const user = users.find(user => {
        return body.name === user.name && body.password === user.password
      })
      if (user) {
        return {
          code: 200,
          data: {
            token: user.token,
          },
        };
      } else {
        return {
          code: 401,
          data: {},
          msg: '用户名或密码错误'
        };
      }

    }
  },
  {
    url: `/mock/user/info`,
    method: 'post',
    response: ({ body }: { body: any }) => {
      const { token } = body
      const info = users.find(user => {
        return user.token === token
      }).info
      if (info) {
        return {
          code: 200,
          data: {
            info: info
          },
        };
      } else {
        return {
          code: 403,
          data: {},
          msg: '无访问权限'
        };
      }

    }
  },
  {
    url: `/mock/user/out`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {},
        msg: 'success'
      };
    }
  },
  {
    url: `/mock/user/passwordChange`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {},
        msg: 'success'
      };
    }
  },
] as MockMethod[]
