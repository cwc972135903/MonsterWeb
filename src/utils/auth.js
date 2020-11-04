/*
 * @Descripttion: cookie操作
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:13
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-09-30 09:19:06
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token' 

export function getToken() {   
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() { 
   Cookies.remove(TokenKey) 
}
