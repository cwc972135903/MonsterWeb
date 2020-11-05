/*
 * @Descripttion: 菜单权限数据处理
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-04-02 09:34:12
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-11-05 17:16:48
 */

import { constantRoutes } from '@/router' 

import { getMenu } from "@/api/menu";   
import store from '@/store'

/**
 * 通过meta.code判断是否与当前用户菜单权限匹配
 * @param roles
 * @param route
 */
function hasPermissionByCode(codes, route) {
  if (route.meta && route.meta.code) { 
    return codes.includes(route.meta.code) 
  } else {
    return true
  }
}

/**
 * @name: 菜单配置外链url 特殊参数
 * @param {type} 
 * @return {type} 
 * @other: 
 */
const customParams = [
  {
    key:"[token]",
    handle:function () {
      return store.getters.token
    }
  }
];

/**
 * 递归过滤异步路由表，返回符合用户角色菜单权限的路由表
 * @param routes 
 * @param codes
 */
function filterAsyncRoutesXcrms(routes, codes) {
  const res = []
  
  routes.forEach(route => { 
    if(route.path.indexOf("http") == 0){
      //以http开头的，均是形式为新tab页打开的外链
      customParams.forEach(p => {
        if(route.path.indexOf(p.key) > -1){   
            route.path = route.path.replace(p.key,p.handle());
        }
      }); 
    }else{
      // 处理query xxx?q=123 加到meta中 (过滤掉可选参数:id? 即?在最后一位表示为此种情况)
      if(route.path.indexOf("?") > -1 && route.path.indexOf("?") != route.path.length - 1){  
          let path = route.path.split("?");
          route.path = path[0];
          if (!route.meta) {
            route.meta = [];
          }
          let queryStr = path[1];
          if (queryStr.length > 0) {
              let queryArr = queryStr.split("&");
              queryArr.forEach(item => {
                  let kv = item.split("=");
                  if (kv.length > 1) {
                    route.meta[kv[0]] = kv[1];
                  }
              });
          } 
      }
    } 
    
    const tmp = { ...route } 
     
    if (hasPermissionByCode(codes, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesXcrms(tmp.children, codes)
      }
      res.push(tmp)
    }
  })

  return res
}
/**
 * @name: 递归清洗数据 加载component
 * @param {type} 
 * @return: 
 * @other: 
 */
function cleanRouters(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route } 
    if (tmp.componentPath) { 
      if (tmp.isLayout) {
          tmp.component = () => import('@/layout');
      }else{
          tmp.component = () => import(`@/views${tmp.componentPath}`);
      } 
    } 
    if (tmp.children) {
      tmp.children = cleanRouters(tmp.children)
    }
      res.push(tmp) 
  })
    return res
} 

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, codes) {
    return new Promise(resolve => { 
      getMenu().then(response => {   
        let asyncRoutesData = response.data 
        let asyncRoutes = cleanRouters(asyncRoutesData) 
        let accessedRoutes = filterAsyncRoutesXcrms(asyncRoutes, codes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })  
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
