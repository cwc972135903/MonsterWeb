/*
 * @Descripttion: 角色管理 mock
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-04-02 09:34:11
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-08-19 11:41:54
 */

import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + '/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE +  '/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url:process.env.VUE_APP_BASE_API_ENTIRE +  `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + `/role/${id}`,
    method: 'delete'
  })
}
