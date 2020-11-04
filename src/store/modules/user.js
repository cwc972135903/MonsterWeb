/*
 * @Descripttion: user vuex
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:16
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-04 17:15:12
 */
import { logout, getInfo,loginXcrms } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router' 

const state = {
  userId:'',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  codes:[]
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_CODES: (state, codes) => {
    state.codes = codes
  },
  SET_USERID:(state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) { 
    const { username, password } = userInfo
    return new Promise((resolve, reject) => { 
      loginXcrms({ userAccount: username.trim(), userPassword: password }).then(response => { 
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => { 
        reject(error)
      })
    })
  },

  /**
   * @name: 自动登陆
   * @param {cookieValue} 其他统一身份认证平台生成的cookie值
   * @return: 
   * @other: 
   */
  autoLogin({ commit }, token){
    return new Promise((resolve, reject) => {  
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) { 
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => { 
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, codes, name, avatar, introduction, userId } = data
        
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_CODES', codes)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_USERID', userId)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_CODES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      }) 
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_CODES', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)
       
      const {codes} = await dispatch('getInfo')

      resetRouter()
      //  debugger
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', codes, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
