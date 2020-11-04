

 * @Descripttion: 规范, 为了增强可读性、可维护性，让你阅读他人代码时能平心静气
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-03 11:12:06
 * @LastEditors  : wenchao.chai
 * @LastEditTime : 2020-02-03 14:27:31

 
## 命名规范

> 1. 文件命名

先建文件夹(体现业务模块含义)，再建.vue文件(体现功能含义),小写,驼峰

简单页面，`index.vue`, `list.vue`, `edit.vue`, `listLeft.vue`, `listRight.vue`, `editLeft.vue`, `editRight.vue`

复杂页面：`xxxList.vue`, `xxxEdit.vue` 让人打开文件夹能知道模块入口在哪儿。

如`department`
    `list.vue` (模块入口)
    `edit.vue`
    `upload.vue`

如`department`
    `index.vue` (模块入口)
    `listLeft.vue`
    `listRight.vue`
    `editRight.vue`

> 2. 变量命名: 业务含义(简单场景可省略)+功能含义

无需记忆，日常工作粘贴复制模仿即可

部分固定变量，若有疑问，可在此获得解答

```js
props: {
    /**
     * @name:当前是否处于布局页面中
     * 若非-1，表明在布局页面中，其值为所在布局中的组件高度
     * 与自适应相关
     */
    layoutHeight: {
      default: () => {
        return -1;
      }
    },
    /**
     * @name:当前是否处于布局页面配置中  
     */
    inLayoutSetting: {
      default: () => {
        return false;
      }
    },
},
data() {
    return {
        clientHeight:window.document.documentElement.clientHeight,//用于自适应
        list: [],//列表
        leftList: [],//列表 left
        leftListDataSource:[],//数据源 left for 前端分页
        xxxOptions:[],//下拉数据源
        xxxTreeOptions:[],//下拉树数据源
        listLoading: false,//获取列表时的转圈圈状态
        saveLoading: false,//更新保存时的转圈圈状态 loadingSave or saveLoading 都行，无需纠结
        currentRow: null,//当前选中行
        currentRowLeft: null,//当前选中行 左侧列表
        isXXX:false,//标识布尔型变量，能让人看出是布尔型即可(由于js(暂未使用ts)为弱类型，所以建议加上is、has等表明功能含义的前缀)
        hasXXX:false,//(这里不要纠结阿里规范说java不让使用is前缀，那是由于java中部分框架解析会引起序列化错误)
        editObj: {//新增编辑组件关联对象 editObj or  xxxEditObj
            visible: false, //新增编辑组件 visible
            params: {//固定的编辑页面表单数据 
            }
        },
        //固定变量
        rules: {//表单校验rules
            xxx: [
                { required: true,message: "xxx不能为空",trigger: "change" }
            ]
        },
        listQuery: {//查询条件
            pagesize: 20,
            pagenum: 1,
            xxx: "", 
        },
        dataBind: {
            //放置与参数传递无关的默认参数
        },
    },
    computed: {
       /**
        * @name: 通用计算属性 返回当前页面的基础高度
        * @param {type} 
        * @return: 
        * @other: 其他的需自适应的高度均在此基础上进行
        */
        baseHeight:{
            get:function(){
                let height; 
                if (this.layoutHeight == -1){
                    height = this.clientHeight
                }else{
                    height = this.layoutHeight + this.$store.getters.marginHeightTopMainContent;
                }
                return height;
            }
        },
  },
}
```
> 3. api命名：参考已有api 

`需全局唯一`，新建api name前先全局搜索下是否已有相同api

常用:`fetchXXX`, `fetchXXXTree`,`fetchXXXList`, `saveXXX`, `updateXXX`, `saveOrUpdateXXX`, `deleteXXX`


> 4. vue.name命名:统一大写开头 且保持全局唯一（某些特殊情况可重复）

```js
export default {
  name: "BondPoolConfigList"
}
```

> 5. 常量命名

常用的国际化字典中都有定义(`{{ $t('table.search') }}`)

若特殊用词，可直接中文。(暂无必要支持所有国际化用词)

> 6. style 样式命名

```css
 <style>
 全局样式名需全局唯一 避免污染其他组件样式
 </style> 
 
 <style scope>
 局部组件样式名 随意
 </style>

注意一个全局样式
 
 <style>
/**
 * 全局样式名，确保全局唯一，不污染其他组件样式
 * 若不改动其默认值800px，不改样式名也可以
 */
.editDialog {
  width: 800px;
}

or

.editDialog-demo {
  width: 1000px;
}
 </style>
```

> 7. 系统中的业务code命名

注意一点，均不要包含:，分隔符建议使用_

如角色code，权限标识符等












