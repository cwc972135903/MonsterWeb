/*
 * @Descripttion: 系统管理
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-06-25 15:44:33
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-04-24 14:45:38
 */

import request from "@/utils/request";
import { buildTree } from "@/utils/arrayHelper";
import { fileDownload } from "@/api/file";

//-------------------------------------------menu---------------------------------------
/**
 * @name: 获取菜单 tree data 用于菜单列表
 * @param {type}
 * @return:
 * @other:
 */
export function fetchMenuForList() {
  return request({
    url: "/menu/list",
    method: "get"
  }).then(response => {
    if (response.data != null && response.data.length > 0) {
      response.data = buildTree(
        response.data,
        "pk_menu_id",
        "pk_menu_pid",
        "meta_title"
      );
    }
    return response;
  });
}

/**
 * @name: 菜单项的新增修改
 * @param {type}
 * @return:
 * @other:
 */
export function saveOrUpdateMenu(data) {
  return request({
    url: "/menu/saveOrUpdate",
    method: "post",
    data: data
  });
}

/**
 * @name: 菜单删除 本身及其子节点 包括目录 菜单 按钮
 * @param {type}
 * @return:
 * @other:
 */
export function deleteMenu(menuId) {
  return request({
    url: "/menu/delete/" + menuId,
    method: "delete"
  });
}

//-------------------------------------------role---------------------------------------
/**
 * @name: 获取角色列表
 * @param {type}
 * @return:
 * @other:
 */
export function fetchRoleList(data) {
  return request({
    url: "/sys/tsysrole/list",
    method: "post",
    data: data
  });
}

/**
 * @name: 获取角色信息详情
 * @param {type}
 * @return:
 * @other:
 */
export function fetchRoleDetail(roleId) {
  return request({
    url: "/sys/tsysrole/info/" + roleId,
    method: "get"
  });
}

/**
 * @name: 更新或新增角色
 * @param {type}
 * @return:
 * @other:
 */
export function saveOrUpdateRole(params) {
  let url = "/sys/tsysrole/update";
  let data = params;
  if (!data.rId) {
    url = "/sys/tsysrole/save";
    data = {
      deptIdList: [],
      menuIdList: [],
      rFlag: params.rFlag + "",
      rName: params.rName,
      rRemark: params.rRemark,
      rStatus: params.rStatus + "",
      roleType: params.roleType + "",
      rCode: params.rCode + ""
    };
  }
  return request({
    url: url,
    method: "post",
    data: data
  });
}

/**
 * @name: 角色删除
 * @param {type}
 * @return:
 * @other:
 */
export function deleteRole(id) {
  return request({
    url: "/menurole/delete",
    method: "post",
    data: [id]
  });
}

/**
 * @name: 获取菜单权限 根据角色id
 * @param {type}
 * @return:
 * @other:
 */
export function fetchRoleMenuMap(roleId) {
  return request({
    url: "/menu/role/map/" + roleId,
    method: "get"
  });
}

/**
 * @name: 保存角色菜单权限关联信息
 * @param {type}
 * @return:
 * @other:
 */
export function saveOrUpdateMenuRoleMap(data) {
  return request({
    url: "/menurole/saveOrUpdate",
    method: "post",
    data: data
  });
}

/**
 * @name: 保存角色部门关联信息
 * @param {type}
 * @return:
 * @other:
 */
export function saveRoleDepartmentMap(deptIds, roleId) {
  return request({
    url: "/sys/tsysrole/configRoleMenuOrDept",
    method: "post",
    data: {
      roleType: 2,
      deptIdList: deptIds,
      rId: roleId
    }
  });
}

//-------------------------------------------department---------------------------------------

/**
 * @name: 获取部门列表
 * @param {type}
 * @return:
 * @other:
 */
export function fetchDepartmentList() {
  return request({
    url: "/sys/tsysdept/list",
    method: "get"
  }).then(response => {
    if (response.data != null && response.data.length > 0) {
      response.data = buildTree(
        response.data.sort(sortDepartment),
        "sdId",
        "sdParentId",
        "sdName"
      );
    }
    return response;
  });
}
/**
 * @name: 部门数据前端排序
 */
function sortDepartment(p1, p2) {
  return p1.sdIndex - p2.sdIndex;
}

/**
 * @name: 更新或新增部门
 * @param {type}
 * @return:
 * @other:
 */
export function saveOrUpdateDepartment(params) {
  let url = "/sys/tsysdept/update";
  let data = params;
  if (!data.sdId) {
    url = "/sys/tsysdept/save";
    data = {
      sdIndex: params.sdIndex,
      sdName: params.sdName,
      sdNameEn: params.sdNameEn,
      sdParentId: params.sdParentId,
      sdCode: params.sdCode
    };
  }
  return request({
    url: url,
    method: "post",
    data: data
  });
}

/**
 * @name: 部门删除
 * @param {type}
 * @return:
 * @other:
 */

export function deleteDepartment(id) {
  return request({
    url: "/sys/tsysdept/delete/" + id,
    method: "get"
  });
}

//-------------------------------------------系统总览---------------------------------------
/**
 * @name: 组件(配置组件)sql导出
 * @param {type}
 * @return:
 * @other:
 */
export function exportComponentSql(param, fileName) {
  return fileDownload("/layout/component/export/component", param, fileName);
}

/**
 * @name: 配置页面sql导出
 * @param {type}
 * @return:
 * @other:
 */
export function exportPageSql(param, fileName) {
  return fileDownload("/layout/component/export/page", param, fileName);
}

/**
 * @name: 流程定义最新version list
 * @param {type} 
 * @return: 
 * @other: 
 */
export function fetchLatestProcessVersionList() {
  return request({
    url: "/wf/bi/definition/latestVersion/list",
    method: "get"
  });
}

/**
 * @name: 流程配置sql导出
 * @param {type}
 * @return:
 * @other:
 */
export function exportProcessSql(param, fileName) {
  return fileDownload("/process/export/sql", param, fileName);
}
 


//-------------------------------------------未知(相关开发自行修改)---------------------------------------

/**
 * 获取部门与人员，选中有当前角色的人员
 */
export function fetchDepartmentAndUserTree(roleId) {
  return request({
    url: "sys/tsysrole/queryUserAndDept/" + roleId,
    method: "get"
  }).then(response => {
    return response;
  });
}

/**
 * 保存用户和角色得对应关系
 */
export function saveRoleUser(param) {
  return request({
    url: "sys/tsysrole/saveRoleUser",
    method: "post",
    data: param
  }).then(response => {
    return response;
  });
}
