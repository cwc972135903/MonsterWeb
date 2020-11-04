<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:19
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-09-20 17:43:19
 -->
1. 自由配置组件
2. 自定义手写组件

1 2 ==> 自由配置页面 ==> 菜单项 a. （参考我的桌面）

or

1 ==> 菜单项  b. （参考主体数据管理，债券数据管理）

a b 两种菜单项与普通的菜单项区别就一个，多一个meta.componentCode,对于a来说，componentCode就是account


上面是菜单组件过程

参数传递

参数传递是反过来的

菜单项 ==> 自由配置页面 ==> 组件

1. query(?p=1)
2. params(/:id)
==>动态传递参数，url拼接，hide路由作为中间组件
动态的参数肯定是通过交互进行传递，如果参数是固定的则配置到defaultParams中去。 

+

row(table.row)
==> 传递到layoutPage组件的props.params

+ 

1. 自由配置页面.defaultParams
==> 
合并,传递到底层各个子组件中。


这是最复杂的情况，参考数据管理的详情编辑与新增

一般如type=desktop中，都不需要参数传递。
 

> 用户桌面配置模板实现

当前账户若还未配置桌面信息，就给默认桌面。 以后若要根据部门或者角色等等信息区分默认demo模板，则需新建关联表：
{demoAccount,部门id or 角色id}. 通过account查到部门id或者角色id，再匹配到demoAccount.
各个demoAccount对应的page配置如何定义修改呢？最简单的方式建立demoAccount名称对应的用户，以该用户去登陆配置即可。


> 组件内部高度变化自适应实现原理

布局页面配置保存时，会保存当前每个组件的组件内部高度。然后配置页面渲染后，el-resize处理事件中会判断每个组件的内部高度是否发生了变化，若变化则进行自适应处理（包括自身组件的高度调整，其他组件的y坐标调整）

表单，宽度变化-->导致控件下移-->高度变化-->自适应 √
表格，单独作为页面存在时，随高度变化自适应 √
同个表格，即作为单独页面，又作为组件存在 高度自适应 √ （完整写法参考taskCommentList.vue）





