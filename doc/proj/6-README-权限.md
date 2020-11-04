<!--
 * @Descripttion: 权限相关
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-04 13:12:05
 * @LastEditors  : wenchao.chai
 * @LastEditTime : 2020-02-04 14:25:39
 -->

### 权限控制

逻辑跟之前一致，相关菜单、按钮配置权限code, 业务角色勾选菜单权限

```js
userInfo = {
      roles: ['inline-edit',...],//按钮权限
      codes: ["PagePermission",...],//菜单权限code
      ...
}

//获取用户信息后用户信息缓存到vuex中
commit('SET_ROLES', roles)
commit('SET_CODES', codes)

```

> 菜单权限 

代码关键实现，`src\store\modules\permission.js`

> 按钮权限

> 两种方式

```js
<el-button  v-permission="['inline-edit']"></el-button>

<el-button  v-if="checkPermission(['inline-edit'])"></el-button>
```




> 具体介绍

按钮级别（细颗粒度）的权限控制，只要在对应dom上加上 `v-permission="['inline-edit']`,即表明该dom只有在当前角色有inline-edit的权限时，才显示。

```js
//依赖:
import permission from '@/directive/permission/index.js' // 权限判断指令
directives: { permission },
```
注意：在某些情况下，不适合使用 v-permission。例如：Element-UI 的 Tab 组件或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。

```js
<el-table-column  v-if="checkPermission(['inline-edit'])"></el-table-column>
```
 
```js
//依赖:
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
directives: { permission },
methods: {
   checkPermission, 
}
``` 

注意，参数是个集合。