import request from '@/utils/system/request'

/** 登录api */
export function loginApi(data: object) {
  return request({
    url: '/user/login',
    method: 'post',
    // baseURL: '/mock',
    data
  })
}

/** 获取用户信息Api */
export function getInfoApi(data: object) {
  return request({
    url: '/user/info',
    method: 'post',
    // baseURL: '/mock',
    data
  })
}

/** 退出登录Api */
export function loginOutApi() {
  return request({
    url: '/user/out',
    method: 'post',
    baseURL: '/mock'
  })
}

/** 修改密码Api */
export function passwordChange(data: object) {
  return request({
    url: '/user/passwordChange',
    method: 'post',
    // baseURL: '/mock',
    data
  })
}

/** 获取登录后需要展示的菜单 */
export function getMenuApi() {
  return request({
    url: '/menu/list',
    method: 'post',
    baseURL: '/mock'
  })
}

/** 获取用户列表 */
export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'get',
    params: data,
    // baseURL: '/mock',
    // data
  })
}

/** 注册用户 */
export function register(data: { name: string; password: any; email: string }) {
  return request({
    url: '/user/register',
    method: 'post',
    // baseURL: '/mock',
    data
  })
}

/** 删除用户 */
export function delUser(data) {
  return request({
    url: '/user/del',
    method: 'delete',
    // baseURL: '/mock',
    params: data
  })
}

/** 修改用户 */
export function updateUser(data) {
    return request({
        url: '/user/update',
        method: 'put',
        // baseURL: '/mock',
        data
    })
}

export function getAuthCode(data){
    return request({
        url: '/email/' + data,
        method: 'get',
        // baseURL: '/mock',
    })
}

export const changeUserPwd = (data) => {
  return request({
    url: '/user/changeUserPwd',
    method: 'put',
    data
  })
}
