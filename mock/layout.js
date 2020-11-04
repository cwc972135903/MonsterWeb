const fields = [
              {
                type:"pk",
                id: "1",
                tableId: "1",
                table: "TableUser",
                field:"id",
                label:"主键id",
                hidden:true
              },
                {
                type:"pk",
                id: "1",
                tableId: "2",
                table: "TableRole",
                field:"id",
                label:"主键id",
                hidden:true
              },
               {
                  type:"header",
                  id: "2",
                  tableId: "1",
                  label: "用户姓名",
                  placeholder: "用户姓名",
                  table: "TableUser",
                  field: "emUsername",
                  controlCode: "elInput",
                  controlType:"text",
                  controlPath:"",
                  value: "", 
                  controlWidth:"150",
                  labelWidth:"80",
                  columnWidth:"100",
                   //下拉等需要数据源的控件相关属性
                  isRemoteData:false,
                  localDataSource:[], 
                  remoteDataSourcePath:"",
                  remoteDataSourceModule:"",
                  //下拉等onchange事件
                  onchangePath:"",
                  onchangeModule:"",
                  disabled:false,
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                },
                {
                  type:"header",
                  id: "3",
                  tableId: "1",
                  label: "用户部门",
                  placeholder: "请输入用户部门",
                  table: "TableUser",
                  field: "emDeptId",
                  controlCode: "SelectTree",//组件code
                  controlType:"",
                  controlPath:"/SelectTree",//自定义控件的引入地址(自定义控件需放置在@/components下) 非自定义控件值为空
                  value: "", //用于v-model的字段 一般为空，有值则为默认值
                  controlWidth:"150",//控件宽度 空则表明用默认值 
                  labelWidth:"80",//label宽度 空则表明用默认值  
                  //下拉等需要数据源的控件相关属性
                  isRemoteData:true,//true:数据源是远程加载 false:数据源以json格式保存在属性localDataSource中
                  localDataSource:[],//下拉数据源 
                  remoteDataSourcePath:"/sys/selectTree",//远程数据源的地址 @/views/layout/event/dataSource  业务模块名开头 如sys 
                  remoteDataSourceModule:"getDepartmentDatasource",//模块名称
                  //下拉等onchange事件
                  onchangePath:"/sys/selectTree",//@/views/layout/event/change下 业务模块名开头 如sys
                  onchangeModule:"departmentChange",//具体的模块名称 如departmentChange
                  disabled:false,//是否禁用
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                },

                {
                  type:"table",
                  id: "4",
                  tableId: "1",
                  label: "用户姓名",
                  table: "TableUser",
                  field: "emUsername", 
                  columnWidth:"100",
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                },
                {
                  type:"table",
                  id: "5",
                  tableId: "1",
                  label: "用户账号", 
                  table: "TableUser",
                  field: "emAccount", 
                  columnWidth:"150",
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                },

                {
                  type:"form",
                  id: "6",
                  tableId: "1",
                  label: "用户姓名",
                  placeholder: "用户姓名",
                  table: "TableUser",
                  field: "emUsername",
                  controlCode: "elInput",
                  controlType:"text",
                  controlPath:"",
                  value: "", 
                  controlWidth:"150",
                  labelWidth:"80", 
                  
                  isRemoteData:false,
                  localDataSource:[], 
                  remoteDataSourcePath:"",
                  remoteDataSourceModule:"",
                  
                  onchangePath:"",
                  onchangeModule:"",
                  disabled:false,
                  ruleRequired:true,//表单是否需要校验
                  ruleMessage:"用户姓名不能为空",//校验提示文字
                  ruleValidator:"",//校验对应的模块方法 下拉选择 优先级高于ruleMessage 
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                },
                {
                  type:"form",
                  id: "7",
                  tableId: "1",
                  label: "用户部门",
                  placeholder: "用户部门",
                  table: "TableUser",
                  field: "emDeptId",
                  controlCode: "SelectTree",
                  controlType:"",
                  controlPath:"/SelectTree",
                  value: "", 
                  controlWidth:"150",
                  labelWidth:"80", 
                  
                  isRemoteData:true,
                  localDataSource:[], 
                  remoteDataSourcePath:"/sys/selectTree",
                  remoteDataSourceModule:"getDepartmentDatasource",
                  
                  onchangePath:"",
                  onchangeModule:"",
                  disabled:false,
                  ruleRequired:true,//表单是否需要校验
                  ruleMessage:"用户部门不能为空",//校验提示文字
                  ruleValidator:"",//校验对应的模块方法(ruleCommonValidator.ruleValidator) 下拉选择 优先级高于ruleMessage 
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                }
]; 

export default [ 
   //组件列表
   {
    url: '/layout/components',
    type: 'get',
    response: config => { 
      return {
        code: 20000,
        data: [
            {
                id: "11111111111",
                x: 8.365339578454373,
                y: 55,
                width: 1107.1920374707263,
                height: 217,
                path: "/layout/component/desktop/pieChart",
                componentCode: "pieChart",
                componentName: "测试饼图"
            },
            {
                id: "222222222",
                x: 5.8220140515221255,
                y: 278,
                width: 1110.0702576112415,
                height: 572,
                path: "/table/complexTable",
                componentCode: "complexTable",
                componentName: "测试表格"
            },
            {
              id: "33333333333333",
              x: 250,
              y: 80,
              width: 200,
              height: 200,
              path: "/layout/component/desktop/lineChart",
              componentCode: "lineChart",
              componentName: "测试直线图"
            },
            {
              id: "444444444444444444",
              x: 250,
              y: 80,
              width: 200,
              height: 200,
              path: "/layout/component/desktop/lineChart",
              componentCode: "lineChart2",
              componentName: "测试直线图2"
            }
        ]
      }
    }
  },
  //自定义配置组件demo
  {
    url: '/layout/componentInfo',
    type: 'get',
    response: config => { 
      const {componentCode} = config.query
      return  {
        code: 20000,
        data: {
            header: {
              isActive: true,
              fields: [
                {
                  id: "1",
                  tableId: "1",
                  label: "用户姓名",
                  placeholder: "用户姓名",
                  table: "TableUser",
                  field: "emUsername",
                  controlCode: "elInput",
                  controlType:"text",
                  controlPath:"",
                  value: "", 
                  controlWidth:"",
                  labelWidth:"",
                  columnWidth:"",
                   //下拉等需要数据源的控件相关属性
                  isRemoteData:false,
                  localDataSource:[], 
                  remoteDataSourcePath:"",
                  remoteDataSourceModule:"",
                  //下拉等onchange事件
                  onchangePath:"",
                  onchangeModule:"",
                  disabled:false
                },
                {
                  id: "3",
                  tableId: "1",
                  label: "用户部门",
                  placeholder: "请输入用户部门",
                  table: "TableUser",
                  field: "emDeptId",
                  controlCode: "SelectTree",//组件code
                  controlType:"",
                  controlPath:"/SelectTree",//自定义控件的引入地址(自定义控件需放置在@/components下) 非自定义控件值为空
                  value: "", //用于v-model的字段 一般为空，有值则为默认值
                  controlWidth:"",//控件宽度 空则表明用默认值 
                  labelWidth:"",//label宽度 空则表明用默认值 
                  columnWidth:"150",//列宽度 空则表明用默认值 
                  //下拉等需要数据源的控件相关属性
                  isRemoteData:true,//true:数据源是远程加载 false:数据源以json格式保存在属性localDataSource中
                  localDataSource:[],//下拉数据源 
                  remoteDataSourcePath:"/sys/selectTree",//远程数据源的地址 @/views/layout/event/dataSource  业务模块名开头 如sys 
                  remoteDataSourceModule:"getDepartmentDatasource",//模块名称
                  //下拉等onchange事件
                  onchangePath:"/sys/selectTree",//@/views/layout/event/change下 业务模块名开头 如sys
                  onchangeModule:"departmentChange",//具体的模块名称 如departmentChange
                  disabled:false,//是否禁用
                }
              ]
            },
            table: {
              isActive: true,
              fields: [
               {
                  id: "1",
                  tableId: "1",
                  label: "用户姓名",
                  table: "TableUser",
                  field: "emUsername", 
                  columnWidth:"",
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                },
                {
                  id: "2",
                  tableId: "1",
                  label: "用户账号", 
                  table: "TableUser",
                  field: "emAccount", 
                  columnWidth:"150",
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                }
              ],
              title: "用户列表",
              icon: "table",
              querySQL: "",
              queryApiPath:"/sys/list",//查询的接口 位于@/views/layout/event/query
              queryApiModule:"getUserList",//接口对应的export module name
              isPagination:true,
              paginationLayout:"total,sizes,prev,pager,next,jumper"
            },
            form: {
              isActive: true,
              isDialog: true,//是否弹框 适用编辑新增
              inline:true,//行内表单 一行多列
              fields: [
                {
                  id: "1",
                  tableId: "1",
                  label: "用户姓名",
                  placeholder: "用户姓名",
                  table: "TableUser",
                  field: "emUsername",
                  controlCode: "elInput",
                  controlType:"text",
                  controlPath:"",
                  value: "", 
                  controlWidth:"",
                  labelWidth:"", 
                  
                  isRemoteData:false,
                  localDataSource:[], 
                  remoteDataSourcePath:"",
                  remoteDataSourceModule:"",
                  
                  onchangePath:"",
                  onchangeModule:"",
                  disabled:false,
                  ruleRequired:true,//表单是否需要校验
                  ruleMessage:"用户姓名不能为空",//校验提示文字
                  ruleValidator:"",//校验对应的模块方法 下拉选择 优先级高于ruleMessage 
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                },
                {
                  id: "3",
                  tableId: "1",
                  label: "用户部门",
                  placeholder: "用户部门",
                  table: "TableUser",
                  field: "emDeptId",
                  controlCode: "SelectTree",
                  controlType:"",
                  controlPath:"/SelectTree",
                  value: "", 
                  controlWidth:"",
                  labelWidth:"", 
                  
                  isRemoteData:true,
                  localDataSource:[], 
                  remoteDataSourcePath:"/sys/selectTree",
                  remoteDataSourceModule:"getDepartmentDatasource",
                  
                  onchangePath:"",
                  onchangeModule:"",
                  disabled:false,
                  ruleRequired:true,//表单是否需要校验
                  ruleMessage:"用户部门不能为空",//校验提示文字
                  ruleValidator:"",//校验对应的模块方法 下拉选择 优先级高于ruleMessage 
                  hidden:false//是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用
                }
              ],
              title: "用户详情",
              icon: "",
              saveTable:"tsys_user",//用于新增更新对应的主表
              saveField:["emId"],//用于新增更新限定数据的条件字段
              saveApiPath:"/common",//@/views/layout/event/save下 
              saveApiMoudule:"saveForm"
            }
          }
      }
    } 
  },
  {
    url: '/layout/save/componentForm',
    type: 'post',
    response: config => { 
      return {
        code: 200,
        data: "保存成功"
      }
    }
  },
   {//通用列表数据接口
    url: '/layout/query/table/list',
    type: 'get',
    response: config => { 
      return {
        code: 200,
        data: { 
          list:[],
          totalCount:0
        }
      }
    }
  },
   {
    url: '/layout/query/allTable',
    type: 'get',
    response: config => { 
      return {
        code: 200,
        data: [
          {
              name:"用户表",
              id:"1",
              table:'TableUser'
            },
            {
              name:"角色表",
              id:"2",
              table:'TableRole'
            }
        ] 
      }
    }
  }, 
  { //表下面的所有字段，包括hidden:true的主键字段
    url:'/layout/query/allField',
    type: 'get',
    response: config => { 
      const { tableId } = config.query 
      let fieldList = fields.filter(f=>f.tableId == tableId)
      return {
        code: 200,
        data:fieldList 
      }
    }
  },
   {
    url: '/layout/query/table',
    type: 'get',
    response: config => { 
      return {
        code: 200,
        data: 
        {
          list:  [
            {
              name:"用户表",
              id:"1",
              table:'TableUser'
            },
            {
              name:"角色表",
              id:"2",
              table:'TableRole'
            }
          ],
          totalCount: 2
        } 
      }
    }
  },
  {
    url:'/layout/query/field',
    type: 'get',
    response: config => { 
      const { tableId, type, hidden } = config.query 
      let fieldList = []
      if (hidden == null) {
        fieldList = fields.filter(f=> f.tableId == tableId && f.type == type)//区分pk
      }else{
        fieldList = fields.filter(f=> (f.type == "pk" || f.type == type) && f.tableId == tableId )//不区分pk
      }
       
      return {
        code: 200,
        data:{
          list: fieldList,
          totalCount:fieldList.length
        }  
      }
    }
  },
   {
    url:'/layout/query/componentType',
    type: 'get',
    response: config => {   
      return {
        code: 200,
        data: [
          {
              componentTypeId:"1",
              componentType:'desktop'
          },
          {
              componentTypeId:"2",
              componentType:'dataManage'
          },
          {
            componentTypeId:"3",
            componentType:'sys'
          }
        ]
      }
    }
  },
  {//自定义组件列表
    url: '/layout/query/component/list',
    type: 'get',
    response: config => { 
      return {
        code: 200,
        data: { 
          list:[
            {
              componentId:"1",
              componentMetaCode:"template1",
              componentName:"测试组件1",
              componentTypeId:"3",
              width:500,
              height:500,
              path:"/layout/layoutGroupTemplate",
              componentType:"sys"
            },
             {
              componentId:"2",
              componentMetaCode:"template2",
              componentName:"测试组件2",
              componentTypeId:"3",
              width:500,
              height:500,
              path:"/layout/layoutGroupTemplate",
              componentType:"sys"
            }
          ],
          totalCount:1
        }
      }
    }
  },
]


 
