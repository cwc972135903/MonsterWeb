/*
 * @Descripttion: vuex index
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-18 15:06:42
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-08-12 15:19:23
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import settings from './modules/settings'
import user from './modules/user'
import websocket from './modules/websocket'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    settings,
    user,
    websocket
  },
  getters
})

export default store
