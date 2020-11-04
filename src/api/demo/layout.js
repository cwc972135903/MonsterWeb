/*
 * @Descripttion: layout 布局配置 mock
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-04-15 13:41:30
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-08-19 11:42:11
 */

import request from "@/utils/request";

//  mock api

/**
 * @name: 组件列表
 * @param {type}
 * @return:
 * @other:
 */
export function fetchComponentList() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/components",
    method: "get"
  });
}

/**
 * @name: 组件类型下拉
 * @param {type}
 * @return:
 * @other:
 */
export function fetchComponentType() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/query/componentType",
    method: "get"
  });
}

/**
 * @name: 自定义组件信息
 * @param {type}
 * @return:
 * @other: 获取信息的时候应该把hidden：true字段过滤掉
 */
export function fetchComponentInfo() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/componentInfo",
    method: "get"
  });
}

/**
 * @name: 表  下拉全部  不分页
 * @param {type}
 * @return:
 * @other: Has been replaced
 */

export function fetchAllTable() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/query/allTable",
    method: "get"
  });
}

/**
 * @name: 字段 下拉全部 不分页
 * @param {type}
 * @return:
 * @other:
 */

export function fetchAllField(queryParams) {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/query/allField",
    method: "get",
    params: queryParams
  });
}

/**
 * @name: 表 下拉 分页
 * @param {type}
 * @return:
 * @other:
 */

export function fetchTable() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/query/table",
    method: "get"
  });
}

/**
 * @name: 字段 下拉 分页
 * @param {type}
 * @return:
 * @other:
 */

export function fetchField(queryParams) {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/query/field",
    method: "get",
    params: queryParams
  });
}

/**
 * @name: 获取自定义组件列表
 * @param {type}
 * @return:
 * @other:
 */
export function fetchCustomComponentList(queryParams) {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/query/component/list",
    method: "get",
    params: queryParams
  });
}

/**
 * @name: 自定义配置组件的通用列表查询接口
 * @param {type}
 * @return:
 * @other: 更新要用到的字段，在这里都需要返回，尤其是主键
 */
export function queryCommonList() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/query/table/list",
    method: "get"
  });
}

/**
 * @name: 自定义配置组件的通用保存接口
 * @param {type}
 * @return:
 * @other:
 */
export function saveComponentForm() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + "/layout/save/componentForm",
    method: "post"
  });
}

export function fetchComponentPage() {
  return new Promise((resolve, reject) => {
    let data = [
      {
        pageCode: "page1",
        pageLabel: "1",
        data: [
          {
            id: "81E833FE3400000",
            x: 8.365339578454373,
            y: 100,
            width: 1107.1920374707263,
            height: 410,
            path: "/layout/component/desktop/pieChart",
            componentCode: "pieChart",
            componentName: "测试饼图",
            pageCode: "page1"
          },
          {
            id: "81E83BB5C800000",
            x: 5.8220140515221255,
            y: 520,
            width: 1110.0702576112415,
            height: 572,
            path: "/table/complexTable",
            componentCode: "complexTable",
            componentName: "测试表格",
            pageCode: "page1"
          }
        ]
      },
      {
        pageCode: "page2",
        pageLabel: "2",
        data: [
          {
            id: "81E83CC31800000",
            x: 250,
            y: 80,
            width: 200,
            height: 200,
            path: "/layout/component/desktop/lineChart",
            componentCode: "lineChart",
            componentName: "测试直线图",
            pageCode: "page2"
          }
        ]
      }
    ];

    let resultData = {
      layoutBeforeWidth: 1125,
      data: data
    }; 
    resolve(resultData);
  });
}
