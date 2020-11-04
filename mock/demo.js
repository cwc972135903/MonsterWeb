/*
 * @Descripttion: 存放开发示例下的mock数据
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-06-10 16:22:41
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-06-10 16:29:59
 */

export default [  
   {
    url: '/demo/component/save',
    type: 'post',
    response: config => { 
      return {
        code: 200,
        data:  {
            pk_component_id:"demo-pk_component_id",
            componentcode:"demo-componentcode",
            componentmetacode:"demo-componentmetacode",
            componentname:"demo-componentname",
            pk_componenttype_id:"demo-pk_componenttype_id",
            width:"demo-width",
            height:"demo-height",
            path:"demo-path",
            create_date:"2019-05-05"
        }
      }
    }
  }
]