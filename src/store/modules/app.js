/*
 * @Descripttion: 系统默认偏好 store
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:16
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-10-29 10:23:08
 */
import Cookies from 'js-cookie'

function getDefaultSize() { 
    // if(window.screen.width > 1400){
    //     return "small";
    // }else{
    //   return "mini";
    // }
    const defaultSize = "mini";
    Cookies.set('size', defaultSize)
    return defaultSize;
}

function getDefaultLanguage() { 
   let lang = navigator.language || navigator.userLanguage;
   return lang.substr(0, 2); //截取lang前2位字符
}

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: Cookies.get('language') ||  getDefaultLanguage(),  
  size: Cookies.get('size') || getDefaultSize() //'mini'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
