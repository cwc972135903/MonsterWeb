<!--
 * @Descripttion: 目录结构介绍
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:19
 * @LastEditors  : wenchao.chai
 * @LastEditTime : 2020-02-04 14:45:30
 -->

## 目录结构介绍 /src

> 1. views 和 api 

两个模块一一对应，从而方便维护
 
![viewapi](https://user-gold-cdn.xitu.io/2017/5/3/c185f7d37a268a1ff4044ff60f5341c0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 2. assets

静态资源存放，图片，头像等
 
> 3. components
  
放置的都是全局公用的一些组件，如上传组件,富文本, TableHeader,下拉树等等。一些页面级的组件放在各自views文件下

> 4.directive  

对于组件的补充，比如原生组件dialog的auto height resize、按钮组件的点击水波纹效果。  
简单的功能需求可通过directive实现，复杂或独立的需求可考虑单独封装一个新组件

> 5. filters

全局filter存放，如`creatdateFilter`

在main.js中进行注册(register global utility filters.)

> 6. icons

自定义的svg icon集合。可自定义扩展

使用示例:

```js
<svg-icon icon-class="table" />
```

`<TableHeader>`的icon使用的就是svg icon

(注意与element自带的[Icon](https://element.eleme.cn/#/zh-CN/component/icon)进行区分)

如何扩展？示例 (iconSelect)

阿里的iconfont. [https://www.iconfont.cn/] 

> 7. lang 

国际化字典库存放,支持中、英、西班牙。

详细查看[国际化](/doc\proj\5-README-国际化.md)

> 8. layout

整体系统布局，包括左侧菜单栏，上方导航栏, Tagview(页签), 中间的内容框

> 9. router

路由相关，详细参考[路由设计](/doc\proj\4-README-路由设计.md)

> 10. store

全局状态管理(vuex)

不要为了用 vuex 而用 vuex.业务之间的耦合度低的地方，如文章模块和评论模块几乎是俩个独立的东西，所以根本没有必要使用 vuex 来存储data，每个页面里存放自己的 data 就行。  
当然有些数据还是需要用 vuex 来统一管理的，如登录token,用户信息，或者是一些全局个人偏好设置等，还是用vuex管理更加的方便，具体当然还是要结合自己的业务场景的。

简单介绍下vuex使用，具体深入vuex可自行查询资料(日常工作一般不涉及)

> 11. styles

全局样式管理

> 12. utils

包括前端枚举、各种helper(一起翻看一遍，太多了，这里就不列举了)

> 13. vendor

excel、zip前端导出封装

针对excel导出，可以完全使用前端导出。

`import('@/vendor/Export2Excel')`

> 14. views

业务模块

> 15 Mock 

Mock数据修改或新增接口后需重启项目
 
 