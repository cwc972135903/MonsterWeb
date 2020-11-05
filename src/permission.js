/*
 * @Descripttion: 处理权限相关
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-04-02 09:34:12
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-11-05 16:20:34
 */

import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/autoLogin', '/auth-redirect'] // no redirect whitelist

const loginType = window.env.VUE_APP_LOGIN_TYPE;// process.env.VUE_APP_LOGIN_TYPE;
const loginRedirect = window.env.VUE_APP_LOGIN_REDIRECT_FULL;// process.env.VUE_APP_LOGIN_REDIRECT_FULL;

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start() 
  // determine whether the user has logged in
  const hasToken = getToken() 
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {// 第一次进来时，维护roles。 具体有无to.path的权限，vueRouter 自动会判断
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          
          const { codes } = await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', codes)
          
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
              
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) { 
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.fullPath}`)
          NProgress.done()
        }
      }
    }
  } else { 
    /* has no token*/  
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else { 
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
