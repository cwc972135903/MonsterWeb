<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-09-17 15:21:16
 * @LastEditors  : wenchao.chai
 * @LastEditTime : 2020-02-11 11:12:05
 -->

> 路由组成

菜单分两部分

1. 一部分是无需参与权限控制的constantRoutes，包括登陆页面，错误页面等等

2. 还有一部分是与角色挂钩的asyncRoutes

`src\router\index.js` 中 `constantRoutes`结合 `getMenu->asyncRoutes` from "@/api/menu" (在`src\store\modules\permission.js`中)组成路由
 

> 示例 

日常使用一般通过菜单管理即可，只有新建测试菜单时需新建一个item

所以以下示例了解即可

```js
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          code: 'PagePermission' //菜单code，用于菜单权限匹配
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission',
          metaCode:""
         //if do not set code, means: this page does not require permission
        }
      }
    ]
  } 
]
```

> 参数介绍

`alwaysShow`

false时，当该节点下children通过角色匹配，只有一个时，根节点会隐藏，直接显示子节点。
true时，不管几个children(包括0个子节点)，都会显示根节点。

`name`

唯一标识

$route.name跟对应$component.name需一致(之前是由于keep-alive中需要用到，现在已对keep-alive进行修改，name特殊情况可不一致)

`redirect`

重定向路由(缩短url输入，提升用户体验)

`meta.affix(图钉)`

默认false, true表明该tagview不可关闭 

`meta.title`

国际化key

`meta.code`

用于菜单权限匹配

...

> 几种特殊的菜单路径设计

1. 路径：`menupath/:param1`  适合通过链接跳转的页面

如:

`dataManageLayoutAdd/:account`
`dataManageLayoutIndex/:id`
`flow/:taskId`

这样打开的多个tagview相互独立

若用`menupath?param1=123`

用query参数来区分的话，只会打开一个tagview。适合于无需打开多个tagview的场景

2. 用到配置菜单编码(`metaCode`)

多个菜单路径独立唯一，但组件是同一个。

目前自定义配置组件、自定义配置图、自定义配置页面均可单独发布为菜单，此时就涉及到metaCode。

如

主体初评 `corpFirst/start  metaCode:WfCorpFirstRating`
主体数据管理 `corplist metaCode:list_corp`

3. 多级菜单配置

参考示例
