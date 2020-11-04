/*
 * @Descripttion: 工作流相关enums
 * @version:
 * @Author: wenchao.chai
 * @Date: 2019-09-16 13:38:40
 * @LastEditors: jun.qian
 * @LastEditTime: 2020-08-28 15:03:34
 */
export default{
  /**
   * @name: 流程节点配置 分类
   * @param {type}
   * @return:
   * @other:
   */
  nodeManageTypeOptions: [
        { value: "0", label: "节点分类" },
        { value: "1", label: "流程节点" }
   ],
   /**
    * @name: 发起组件中的评级类型
    * @param {type}
    * @return:
    * @other:
    */
   ratingTypeOptions:[
      { value: "first", label: "初评" },
      { value: "tracking", label: "跟评" }
   ],
   /**
    * @name: 流程类别
    * @param {type}
    * @return:
    * @other:
    */
   wfTypeOptions:[
      { value: "jtzt", label: "集团主体" },
      { value: "jtfb", label: "集团非标" },
      { value: "zczt", label: "资产主体" },
      { value: "zczq", label: "资产债券" },
   ],
   /**
    * @name: 项目紧急程度
    * @param {type}
    * @return:
    * @other:
    */
   emergencyOptions:[
      { value: "common", label: "正常" },
      { value: "urgent", label: "紧急" }
   ],
   /**
    * @name: 流程当前状态
    * @param {type}
    * @return:
    * @other:
    */
   processStatusOptions:[
         { value: "0", label: "运行中" },
         { value: "1", label: "暂停" },
         { value: "2", label: "已完成" },
         { value: "3", label: "终止" }
   ],
   /**
    * @name: 处理组类型
    * @param {type}
    * @return:
    * @other:
    */
   candidateGroupsTypeOptions:[
       { value: "WF_ROLE", label: "流程角色" },
       { value: "WF_INITIATOR", label: "流程发起人" },
       { value: "SAME_AS_NODE", label: "与某环节处理人一致" },
       { value: "OWNER_AS_NODE", label: "与某环节流转人一致" },
   ],
   /**
    * @name: 流程类型枚举
    * @param {type}
    * @return:
    * @other:
    */
   processTypeOptions:{
      CORP: {value: "CORP", label: "产品主体"},
      ABS: { value: "ABS", label: "产品ABS"},
      TTRUST:{ value: "TTRUST", label: "产品信托" },
      BOND:{ value: "BOND", label: "产品债券" },
      TIPLAN:{ value: "TIPLAN", label: "产品债权" },
      BONDINPOOL:{ value: "BONDINPOOL", label: "证券入池" }
   },

   /**
    * @name: 项目类型
    * @param {type}
    * @return:
    * @other:
    */
   projectTypeOptions:[
      { value: "1", label: "定期跟踪" },
      { value: "2", label: "不定期跟踪" }
   ],

}
