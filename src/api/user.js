/*
 * @Descripttion: 用户及登陆
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-04-02 09:34:11
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-04 17:45:38
 */

import request from "@/utils/request"; 
import avatarPng from "@/assets/avatar/avatar.png";
import { utf8ToBase64 } from "@/utils/index";

/**
 * @name: 登陆
 * @param {type} 
 * @return: 
 * @other: 
 */
export function loginXcrms(data) {
  return request({ 
    url: "/sys/login",
    method: "post",
    data
  });
}  

/**
 * @name: 登陆 加混淆
 * @param {type} 
 * @return: 
 * @other: 
 */
export function loginXcrmsCrypto(data) { 
  data.userPassword = utf8ToBase64(data.userPassword) 
  return request({ 
    url: "/sys/login/crypto",
    method: "post",
    data
  });
} 

/**
 * @name: 退出 
 * @param {type} 
 * @return: 
 * @other: 
 */
export function logout() {
  return request({
    url:  "/sys/logout",
    method: "post"
  });
}

/**
 * @name: 获取用户信息
 * @param {type} 
 * @return: 
 * @other: 
 */
export function getInfo(token) {
  return request({
    url:  "/v/user/info",
    method: "get"
  }).then(response=>{
      let data = {
          roles:["admin"],//["admin", "inline-edit"],//dev demo 用到的按钮权限 生产环境可去除
          codes:[],//[ "PagePermission",  "DirectivePermission","RolePermission","Icons"],//dev demo 用到的菜单权限 生产环境可去除
          introduction:"",
          avatar: avatarPng,// "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
          name:"",
          userId:""
      };
      data.roles =  data.roles.concat(response.data.roles);
      data.codes =  data.codes.concat(response.data.codes);
      data.introduction = response.data.introduction;
      data.name = response.data.name;
      data.userId = response.data.userId;
      
      response.data = data;
      return response;
  });
} 

/**
 * @name: 获取用户列表
 * @param {type}
 * @return:
 * @other:
 */
export function fetchUserList(data) {
  return request({
    url: "/sys/tsysuser/list",
    method: "post",
    data
  });
}

/**
 * @name: 获取用户详情
 * @param {type}
 * @return:
 * @other:
 */
export function fetchUserDetail(id) {
  return request({
    url: "/sys/tsysuser/info/" + id,
    method: "get"
  });
}


/**
 * @name: 获取功能角色列表
 * @param {type}
 * @return:
 * @other:
 */
export function fetchRoleListFunction() {
  return request({
    url: "/sys/tsysrole/allList/0",
    method: "get"
  });
}

/**
 * @name: 获取流程角色列表
 * @param {type}
 * @return:
 * @other:
 */
export function fetchRoleListWF() {
  return request({
    url: "/sys/tsysrole/allList/1",
    method: "get"
  });
}

/**
 * @name: 获取数据角色列表
 * @param {type}
 * @return:
 * @other:
 */
export function fetchRoleListData() {
  return request({
    url: "/sys/tsysrole/allList/2",
    method: "get"
  });
}

/**
 * @name: 用户信息更新or新增
 * @param {type}
 * @return:
 * @other:
 */
export function saveOrUpdateUser(data) {
  let url = "/sys/tsysuser/update";
  if (!data.emId) {
    url = "/sys/tsysuser/save";
  }
  return request({
    url: url,
    method: "post",
    data
  });
}

/**
 * @name: 用户删除
 * @param {type}
 * @return:
 * @other:
 */
export function deleteUser(id) {
  return request({
    url: "/sys/tsysuser/deleteUser/" + id,
    method: "get"
  });
}

/**
 * @name: 用户重置密码
 * @param {type}
 * @return:
 * @other:
 */
export function resetUserPwd(id) {
  return request({
    url: "/sys/tsysuser/reset/" + id,
    method: "get"
  });
}


/**
 * @name: 密码修改
 * @param {type} 
 * @return: 
 * @other: 
 */ 
export function changePwd(data) {
  return request({
    url: "/sys/tsysuser/password",
    method: "post",
    data
  });
}

/**
 * @name: 自定义组件测试用到的接口
 * @param {type}
 * @return:
 * @other:
 */
export function fetchAccountList() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/user/account",
    method: "get"
  });
}


//mock 地址 
// export function login(data) {
//   return request({
//     url: process.env.VUE_APP_BASE_API_ENTIRE + "/user/login",
//     method: "post",
//     data
//   });
// }

// mock 地址
// export function getInfo(token) {
//   return request({
//     url: process.env.VUE_APP_BASE_API_ENTIRE + "/user/info",
//     method: "get",
//     params: { token }
//   });
// } 