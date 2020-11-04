 ### 配置自定义组件相关页面

> 表定义:


`1 v_layout_table`: pk_table_Id(主键id),tableCode,tableName

`2 v_layout_field`: pk_field_Id(主键id),pk_table_Id,fieldCode,fieldName,hidden(是否隐藏 一般用于主键 true:只是为了在保存tab中选择条件字段用)

(field本身相关的一些属性的默认值) 属性含义参考layout.js
`3 v_layout_field_header`:pk_field_Id, label,placeholder,value,controlWidth,labelWidth,controlCode(elInput),                             controlType
                        controlPath
                        isRemoteData,
                        localDataSource,
                        remoteDataSource,(无需入库)
                        remoteDataSourcePath,
                        remoteDataSourceModule, 
                        onchangePath,
                        onchangeModule,
                        disabled

`4 v_layout_field_table`:pk_field_Id, columnWidth,formatter,label

`5 v_layout_field_form`:pk_field_Id,label,placeholder,value,controlWidth,labelWidth,controlCode(elInput),
                        controlType
                        controlPath
                        isRemoteData,
                        localDataSource,
                        remoteDataSource,(无需入库)
                        remoteDataSourcePath,
                        remoteDataSourceModule, 
                        onchangePath,
                        onchangeModule,
                        disabled,
                        ruleRequired
                        ruleMessage
                        ruleValidator

(包含普通手写组件跟自定义配置组件)
`8 v_layout_component`: pk_component_Id(主键id),componentCode(组件的标签，自定义组件是同一个),componentMetaCode(自定义组件meta内的code参数),componentName,pk_componentType_Id(大分类,datamanage对应的id),width,height(作为组件时的默认长宽),path("/layout/desktop/pieChart")

(下面三个module表是自定义配置组件的补充属性)
`9 v_layout_module_header`:：pk_module_Id(主键id), pk_component_Id (一对一),controlWidth,labelWidth（优先级高于field下的字段）

`10 v_layout_module_table`：pk_module_Id(主键id), pk_component_Id (一对一) PAGINATIONLAYOUT(是否分页) 前端分页/服务端分页，冻结行列，多级表头,columnWidth ,querySQL(用于table跟form所需的查询sql，clob字段？),queryApiPath(查询的接口，包含默认跟个性化 /user ),queryApiModule(fetchUserList) title,icon,paginationLayout(分页layout),ISINDIVIDUATIONQUERY,ISSINGLESELECTION

`11 v_layout_module_form`：pk_module_Id(主键id), pk_component_Id (一对一) inline（用于form，行内表单模式 true：单行显示多个）,saveTable(用于form保存更新对应的单表表名),saveField,saveApiPath(保存的接口，包含默认跟个性化),saveApiMoudule(模块导出的名称) title,icon ,controlWidth,labelWidth（优先级高于field下的字段）,enableformdialog

`12 v_layout_module_field_map`:PK_module_field_ID(主键id), pk_field_Id,：pk_module_Id 多对多

`14 v_layout_individual_btn`:自定义按钮(toolbar & inline link)
id:"06",   
path:'/sys/pieChartDialog',
module:"",
icon:"el-icon-edit",
label:"自定义dialog inline",
type:"dialog",//function or dialog
position:"inline",//inline toolbar 
field:"EM_ACCOUNT",//优先级高于label
columnWidth:"",
btnType:"success"


新增属性考虑如下颗粒度

匹配field的属性
匹配module的属性
匹配component的属性

`6 v_layout_component_type`:pk_componentType_Id(主键id),componentType 预定义好的大分类 datamanage (业务分类 非功能分类)

(保存时具体到每个小分类)
`7 v_layout_component_account`: pk_componentAccount_Id(主键id),componentAccount(别处带过来，不能更改且唯一的字段 如用户的账号 有业务意义),pk_componentType_Id(FK),widowSaveWidth(保存时的宽度)

(布局保存,小分类与组件map 按照pk_componentAccount_Id获取多条记录，即多个组件)
`13 v_layout_component_account_save`:pk_component_account_save_id(主键id) pk_componentAccount_Id,pk_component_Id,pageCode,pageLabel,pageSort(page排序字段),x,y,width,height(保存时的位置，长宽)








 
