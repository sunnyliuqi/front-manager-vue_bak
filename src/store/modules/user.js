import Vue from 'vue'
import { login, getInfo, logout, getMenus } from '@/api/login'
import { ACCESS_TOKEN, TOKEN_TIME_OUT } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    serviceMenus: [],
    operationCodes: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_AUTH: (state, { serviceMenus, operationCodes }) => {
      state.serviceMenus = serviceMenus
      state.operationCodes = operationCodes
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          Vue.ls.set(ACCESS_TOKEN, result, TOKEN_TIME_OUT * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result
          commit('SET_NAME', { name: result.userName, welcome: welcome() })
          commit('SET_AVATAR', result.suserHeader)
          commit('SET_INFO', result)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户菜单信息
    GetMenus ({ commit }) {
      return new Promise((resolve, reject) => {
        getMenus().then(response => {
          const result = response.result
          commit('SET_AUTH', { serviceMenus: result.menus, operationCodes: result.operationCodes })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }

  }
}

export default user
