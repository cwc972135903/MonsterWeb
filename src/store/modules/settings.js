/*
 * @Descripttion: 部分默认设置
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-17 14:26:43
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-06-04 14:47:40
 */
import defaultSettings from '@/settings'
const { showSettings, tagsView, fixedHeader, sidebarLogo, theme, marginHeightTopMainContent, customTheme } = defaultSettings

document.body.className = customTheme == "default" ? "": customTheme;

const state = {
  theme: theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  marginHeightTopMainContent:marginHeightTopMainContent,
  customTheme:customTheme
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

