import { loginApi, getInfoApi, loginOutApi } from '@/api/user'
import { ActionContext } from 'vuex'


export interface UserInfo {
  id: number,
  name: string,
  role: string,
  token: string,
}

export interface userState {
  token: string,
  info: object,
  groupid: number,
  sceneid: number,

}



const state = (): userState => ({
  token: '', // 登录token
  info: {},  // 用户信息
  groupid: 0, // 上传数据组id
  sceneid: 1, // 场景id
})

// getters
const getters = {
  token(state: userState) {
    return state.token
  },
  info(state: userState) {
    return state.info
  },
  groupid(state: userState) {
    return state.groupid
  },
  sceneid(state: userState) {
    return state.sceneid
  }
}

// mutations
const mutations = {
  tokenChange(state: userState, token: string) {
    state.token = token
  },
  infoChange(state: userState, info: object) {
    state.info = info
  },
  groupidChange(state: userState, groupid: bigint) {
    state.groupid = groupid
  },
  sceneidChange(state: userState, sceneid: bigint) {
    state.sceneid = sceneid
  },
}

// actions
const actions = {
  // login by login.vue
  login({ commit, dispatch }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      loginApi(params)
      .then(res => {
        commit('tokenChange', res.data.token)
        commit('groupidChange', 1)
        commit('sceneidChange', 1)
        dispatch('getInfo', { token: res.data.token })
        .then(infoRes => {
          resolve(res.data.token)
        })
      }).catch(err => {
        reject(err)
      })
    })
  },
  // get user info after user logined
  getInfo({ commit }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      getInfoApi(params)
      .then(res => {
        commit('infoChange', res.data)
        resolve(res.data)
      })
    })
  },

  // login out the system after user click the loginOut button
  loginOut({ commit }: ActionContext<userState, userState>) {
    loginOutApi()
    .then(res => {

    })
    .catch(error => {

    })
    .finally(() => {
      localStorage.removeItem('tabs')
      localStorage.removeItem('vuex')
      sessionStorage.removeItem('vuex')
      location.reload()
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
