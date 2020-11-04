/*
 * @Descripttion: 前端枚举
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-17 14:15:32
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-10-21 10:23:27
 */
import charts from '@/utils/enum/charts';
import workflow from '@/utils/enum/workflow';
import datamanage from '@/utils/enum/datamanage';



export default { 
    ...charts,
    ...workflow,
    ...datamanage
}

//-----------------------------------------layout------------------------------------

/**
 * @name: 控件类别
 * @other: type: ['native' 原生控件,'hasType' 有type属性,'hasChange' 有change事件, custom 自定义控件]  
 */

export const controlCodeList = [
  {
    value: "elInput",
    label: "文本框",
    type: ["native", "hasType", "hasChange"]
  },
  {
    value: "elSelect",
    label: "单选下拉框",
    type: ["native", "hasDatasource", "hasChange"]
  },
  {
    value: "elMultiSelect",
    label: "多选下拉框",
    type: ["native", "hasDatasource", "hasChange"]
  },
  {
    value: "elInputNumber",
    label: "数字框",
    type: ["native"]
  },
  {
    value: "NumberPercent",
    label: "百分比控件",
    type: ["custom"],
    path: "/NumberPercent"
  },
  {
    value: "elDatePicker",
    label: "日期",
    type: ["native", "hasType"]
  },
  {
    value: "SelectTree",
    label: "单选下拉树",
    type: ["custom", "hasDatasource", "hasChange"],
    path: "/SelectTree"
  },
  {
    value: "MultiSelectTree",
    label: "多选下拉树",
    type: ["custom", "hasDatasource", "hasChange"],
    path: "/SelectTree/multiSelectTree"
  }
];

/**
 * @name: 组件type 如elInput.text/textarea
 * @other:
 */
export const controlTypeList = [
  {
    value: "text",
    label: "text",
    code: "elInput"
  },
  {
    value: "textarea",
    label: "textarea",
    code: "elInput"
  },
  {
    value: "date",
    label: "date",
    code: "elDatePicker"
  }
  // {
  //     value: 'datetime',
  //     label: 'datetime',
  //     code: 'elDatePicker'
  // }
];

/**
 * @name: 布局配置字段 对应的字段本身类型
 * @other:主要 用于 布局配置组件 生成相关的sql
 * backgroundGenerate：true 表明该字段的值由后台处理
 */
export const fieldTypeEnum = [
  {
    //数据库字段
    label: "db",
    value: "db",
    backgroundGenerate:false
  },
  {
    //界面用字段
    label: "ui",
    value: "ui",
    backgroundGenerate:false
  },
  {
    //用于保存时判断是否已存在
    label: "checkExist",
    value: "checkExist",
    backgroundGenerate:false
  },
  {
    label: "创建者",
    value: "cp",
    backgroundGenerate:true,
    type:"insert",
    example:"insert into t(date) values(':cp')"
  },
  {
    label: "更新者",
    value: "up",
    backgroundGenerate:true,
    type:"update",
    example:"update t set id = ':up'"
  },
  {
    label: "更新日期",
    value: "udate",
    backgroundGenerate:true,
    type:"update",
    example:"update t set date = ':udate'"
  },
  {
    label: "更新时间",
    value: "utime",
    backgroundGenerate:true,
    type:"update",
    example:"update t set time = ':utime'"
  },
  {
    label: "当前登陆用户",
    value: "user_id",
    backgroundGenerate:true,
    type:"select,update,insert",
    example:"select * from t where id = ':user_id'"
  },
  {
    label: "主键",
    value: "pk",
    backgroundGenerate:false
  }
];

/**
 * @name: 布局配置组件公共按钮组列表
 * @other:
 */
export const tableCommonBtnEnum = [
  {
    label: "编辑",
    value: "edit",
    metaCode:"",//权限标识符 默认为空
    alias:"",// 别名
    fixed:"left",// 固定列
  },
  {
    label: "新增",
    value: "add",
    metaCode:"",
    alias:"",// 别名
  },
  {
    label: "删除",
    value: "delete",
    metaCode:"",
    alias:"",// 别名
    fixed:"left",// 固定列
  },
  {
    label: "导出",
    value: "export",
    metaCode:"",
    alias:"",// 别名
  }
];

/**
 * @name: table fixed
 * @other:
 */
export const fixedList = [
  {
    label: "左固定",
    value: "left"
  },
  {
    label: "右固定",
    value: "right"
  }
];

/**
 * @name: 布局配置组件公共按钮组列表
 * @other:
 */
export const formCommonBtnEnum = [
  {
    label: "编辑",
    value: "edit",
    metaCode:"",//权限标识符 默认为空
    alias:"",// 别名
  },{
    label: "新增",
    value: "add",
    metaCode:"",
    alias:"",// 别名
  }
];

/**
 * @name: 自定义按钮的type
 * @other:
 */
export const individualButtonType = [
  {
    label: "function",
    value: "function"
  },
  {
    label: "dialog",
    value: "dialog"
  }
];

/**
 * @name: 自定义按钮的position
 * @other:
 */
export const individualPosition = [
  {
    label: "toolbar",
    value: "toolbar"
  },
  {
    label: "inline",
    value: "inline"
  }
];

/**
 * @name: 自定义按钮的fixed
 * @other:
 */
export const individualButtonFixed = [
  {
    label: "不固定",
    value: "0"
  },
  {
    label: "左固定",
    value: "1"
  },
  {
    label: "右固定",
    value: "2"
  },
  {
    label: "与操作栏同列",
    value: "3"
  }
];

/**
 * @name: el-button.type
 * @other:
 */
export const buttonType = [
  {
    label: "default",
    value: "default"
  },
  {
    label: "text",
    value: "text"
  },
  {
    label: "primary",
    value: "primary"
  },
  {
    label: "success",
    value: "success"
  },
  {
    label: "info",
    value: "info"
  },
  {
    label: "warning",
    value: "warning"
  },
  {
    label: "danger",
    value: "danger"
  }
];

/**
 * @name: table align
 * @other:
 */
export const alignList = [
  {
    label: "left",
    value: "left"
  },
  {
    label: "center",
    value: "center"
  },
  {
    label: "right",
    value: "right"
  }
];

/**
 * @name: 配置
 * @param {type} 
 * @return: 
 * @other: 
 */
export const configMenuOptions = [{
    value: "1",
    label: "表模板",
    path:"/layout/layoutGroupTemplate"
  },{
    value: "2",
    label: "图模板",
    path:"/layout/layoutVCharts/vChartTemplate"
  },{
    value: "3",
    label: "流程发起",
    path:"/workflow/base/index"
  },{
    value: "4",
    label: "报表模板",
    path:"/report/setting/preview"
  },{
    value: "5",
    label: "桌面独立菜单",
    path:"/sys/desktop/index"
  },{
    value: "0",
    label: "否",
    path:""
}];

//-----------------------------------------rating------------------------------------

/**
 * @name: 报表分类
 * @other:
 */
export const finTypeList = [
  {
    label: "合并报表",
    value: "1"
  },
  {
    label: "母公司报表",
    value: "0"
  }
];

/**
 * @name: 财报数据类型
 * @other:
 */
export const finDataTypeList = [
  {
    label: "原始数据",
    value: "0"
  },
  {
    label: "追溯调整值",
    value: "1"
  },
  {
    label: "调整数据",
    value: "2"
  }
];

/**
 * @name: 财报日期
 * @other: 
 */
export const finQuarterList = [
  { value: '10-01', label: '年报', showName: '4季度'},
  { value: '07-01', label: '三季报', showName: '3季度'},
  { value: '04-01', label: '半年报' ,showName: '2季度'},
  { value: '01-01', label: '一季报' , showName: '1季度'}
];

//-----------------------------------------sys------------------------------------
/**
 * @name: 菜单类型
 * @param {type} 
 * @return: 
 * @other: 
 */
export const menuTypeList = [
  { value: "0", label: "目录" },
  { value: "1", label: "菜单" },
  { value: "2", label: "按钮" } 
];
/**
 * @name: 用户管理状态
 * @param {type} 
 * @return: 
 * @other: 
 */
export const statusOptions = [
    { value: 0, label: "正常" },
    { value: 1, label: "注销 " },
    { value: 2, label: "冻结 " }
];

/**
 * @name: 角色类型
 * @param {type} 
 * @return: 
 * @other: 
 */
export const roleTypeOptions = [   
  { value: 0, label: "功能角色" },
  { value: 1, label: "流程角色" },
  { value: 2, label: "数据角色" }
];


//-----------------------------------------paramConfig------------------------------------
/**
 * @name: 指标类型
 * @param {type} 
 * @return: 
 * @other: 
 */
export const tableIndexTypeOptions = [   
  { value: "D", label: "数值型" },
  { value: "S", label: "字符型" },
  { value: "E", label: "枚举型" }
];
 
/**
 * @name: 表类型
 * @param {type} 
 * @return: 
 * @other: 
 */
export const sCodeOptions = [   
  { value: "0", label: "自定义数据" },
  { value: "2", label: "大陆财务报表" },
  { value: "4", label: "经营数据" }
];


//-----------------------------------------bondPool------------------------------------
/**
 * @name: 证券池导入方式
 * @param {type} 
 * @return: 
 * @other: 
 */
export const uploadTypeOptions = [   
  { value: "1", label: "增量导入" },
  { value: "2", label: "全量导入" }
];



//-----------------------------------------clause config-------------------------------
/**
 * @name: 条款配置 对比类型
 * @param {type} 
 * @return: 
 * @other: 
 */ 
export const fTypeOptions = [   
  { value: "0", label: "标准值" },
  { value: "1", label: "枚举值" },
  { value: "2", label: "表达式" }
];

/**
 * @name: 条款配置 对比符号
 * @param {type} 
 * @return: 
 * @other: 
 */
export const symbolOptions = [
    {value: "0", label: "=", fType:"standard"},
    {value: "1", label: "<", fType:"standard"},
    {value: "2", label: ">", fType:"standard"},
    {value: "3", label: ">=", fType:"standard"},
    {value: "4", label: "<=", fType:"standard"},
    {value: "5", label: "!=", fType:"standard"},
    {value: "6", label: "like", fType:"standard"},
    {value: "7", label: "not like", fType:"standard"},

    {value: "0", label: "in", fType:"enum"},
    {value: "1", label: "not in", fType:"enum"}

];

//-----------------------------------------job setting-------------------------------
/**
 * @name: 任务调度类型
 * @param {type} 
 * @return: 
 * @other: 
 */
export const jobCallTypeOptions = [
    {value: 0, label: "内部接口" },
    {value: 1, label: "外部接口" }
];
/**
 * @name: 任务执行状态
 * @param {type} 
 * @return: 
 * @other: 
 */
export const jobStatusOptions = [
    {value: 'Y', label: "成功" },
    {value: 'N', label: "失败" },
    {value: "I", label: "执行中" }
];

/**
 * @name: 任务启用状态
 * @param {type} 
 * @return: 
 * @other: 
 */
export const jobStartStatusOptions = [
    {value: 0, label: "停用" },
    {value: 1, label: "启用" }
];

//-----------------------------------------report setting-------------------------------

/**
 * @name: 数据集配置-数据来源
 * @param {type} 
 * @return: 
 * @other: 
 */
export const dataSourceTypeOptions = [
  {value: "SQL", label: "SQL" },
  {value: "PKG", label: "PKG" },
  {value: "QUOTA", label: "指标" }
];
/**
 * 证券池分类
 */
export const poolConfigType = [
  {value:"1",label:"主体库"},
  {value:"2",label:"个人客户清单"},
  {value:"3",label:"证券池"},
];

/**
 * @name: 报表模板类型
 * @param {type} 
 * @return: 
 * @other: 
 */
export const reportTypeOptions = [
  {value: "0", label: "自定义报告" },
  {value: "1", label: "日终报告" }
];

/**
 * @name: 报表模板状态
 * @param {type} 
 * @return: 
 * @other: 
 */
export const reportStatusOptions = [
  {value: "0", label: "新建" },
  {value: "1", label: "启用" },
  {value: "2", label: "停用" }
];
//-----------------------------------------财务分析-------------------------------
/**
 * 对象类型
 */
export const otypeOptions = [
  {value: "0", label: "债券" },
  {value: "1", label: "主体" }
];

/**
 * 是否城投
 */
export const selectCityOptions = [
  {value: "0", label: "否" },
  {value: "1", label: "是" }
];

/**
 * 显示方式
 */
export const showTypeOptions = [
  {value: "1", label: "对象在行" },
  {value: "2", label: "对象在列" }
];

/**
 * 单位
 */
export const amountUnitOptions = [
  {value: "1", label: "元" },
  {value: "10000", label: "万元" },
  {value: "100000000", label: "亿元" }
];

//-----------------------------------------债权计划-------------------------------

/**
 * 付息方式
 */
export const payModeOptions = [
  {value: "1", label: "每年" },
  {value: "2", label: "半年" },
  {value: "3", label: "三个月" },
  {value: "4", label: "月" },
  {value: "5", label: "一次还本付息" },
  {value: "6", label: "不规则" }
];

/**
 * 买方/卖方
 */
export const buyrSellrOptions = [
  {value: "Buyr", label: "买方" },
  {value: "Sellr", label: "卖方" }
];

/**
 * 收益类型 
 */
export const pftTypeOptions = [
  {value: "1", label: "固定" },
  {value: "2", label: "浮动" },
  {value: "3", label: "分层" }
];

/**
 * 担保方式
 */
export const wTypeOptions = [
  {value: "0", label: "保证担保" },
  {value: "1", label: "抵押担保" },
  {value: "2", label: "留置担保" },
  {value: "3", label: "信用担保" },
  {value: "4", label: "质押担保" },
  {value: "5", label: "抵押担保和质押担保" },
  {value: "6", label: "其他或无担保" }
];

/**
 * 担保证担保方式
 */
export const bwTypeOptions = [
  {value: "1", label: "一般保证担保" },
  {value: "2", label: "一般连带责任保证担保" },
  {value: "3", label: "无条件不可撤销连带责任保证担保" },
  {value: "4", label: "不可撤销连带责任保证担保" }
];
