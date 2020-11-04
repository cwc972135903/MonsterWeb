/*
 * @Descripttion: 存放开发示例下的mock接口
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-06-10 16:19:03
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-07-23 14:05:53
 */


import request from "@/utils/request";

/**
 * @name: 一个完整的保存更新api 包括请求前数据处理 请求后数据清洗
 * @param {type} 
 * @return: 
 * @other: 
 */
export function saveOrUpdateComponent(data) {
  let params = {
      pk_component_id:data.componentId,
      componentcode:data.componentCode,
      componentmetacode:data.componentMetaCode,
      componentname:data.componentName,
      pk_componenttype_id:data.componentTypeId, 
      width:data.width,
      height:data.height,
      path:data.path
  }; 
  return request({
    url:  process.env.VUE_APP_BASE_API_ENTIRE +  '/demo/component/save',
    method: 'post',
    data:params
  }).then(response=>{
    let resultData = {};
    if (response.data) { 
       const c = response.data;
       resultData = cleanDataForComponent(c);
       response.data = resultData;
    }
    return response;
  });
}

/**
 * @name: for api saveOrUpdateComponent
 * @param {type} 
 * @return: 
 * @other: 
 */
function cleanDataForComponent(c){
  return  {   
      componentId:c.pk_component_id,
      componentCode: c.componentcode,
      componentMetaCode:c.componentmetacode,
      componentName:c.componentname,
      componentTypeId:c.pk_componenttype_id,
      width:c.width,
      height:c.height,
      path:c.path,
      createDate:c.create_date
    }
}

/**
 * @name: 获取数据详情demo api
 * @param {type} 
 * @return: 
 * @other: 
 */
export function fetchForm(oCode){
    return new Promise((resolve, reject) => {
    let resultData =  {
      O_CODE:"CP20141223134202631",
      O_NAME:"万科企业股份有限公司"
    }
    let response = {
      data:resultData
    };
    resolve(response);
  });
}

/**
 * @name: 删除demo
 * @param {type} 
 * @return: 
 * @other: 
 */
export function deleteApi(){
  return new Promise((resolve, reject) => { 
    let response = { 
    };
    resolve(response);
  });
}


export function fetchTree(){
    return new Promise((resolve, reject) => {
    let resultData =   [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }]
    let response = {
      data:resultData
    };
    resolve(response);
  });
}


export function fetchTableList(){
    return new Promise((resolve, reject) => {
    let resultData = [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    let response = {
      data:resultData
    };
    resolve(response);
  });
}