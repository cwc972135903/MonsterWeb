 * @Descripttion: 系统整体
 * @version:  wenchao.chai in hengtai
 * @Author: wenchao.chai
 * @LastEditors: wenchao.chai
 * @Date: 2019-04-02 13:54:16
 * @LastEditTime: 2019-04-04 16:32:25

 
## 技术栈  

vue2 + vuex + vue-router + axios + element ui  + i18n(国际化) 

> doc refrence

1. [Vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)
2. [Vue-element-admin-juejin](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
3. [Vue-element](http://element-cn.eleme.io/#/zh-CN/component/installation)


> address setting:

```js
public\static\config\env.js 
# base api for server  
VUE_APP_BASE_API_BZHI2_ENTIRE:"http://127.0.0.1:8090/xcrms",

使用上：  
mock地址：url: process.env.VUE_APP_BASE_API_ENTIRE + '/routes', //加前缀  
server地址：'/routes',//相对路由  
```

> start project   

注意：cmd最好用管理员启动

1. install node(v10.9.0+) and npm(6.2.0+)
2. install git 
4. npm install(注意要翻墙)
5. npm run dev
6. 打包 npm run build:prod

项目依赖的小版本更新可能导致项目无法正常运行

弃用cnpm, 其无法对依赖的小版本进行锁定。即package-lock.json在cnpm下无效。

直接使用npm(要翻墙，不然安装不完全且慢)，或者直接解压群里的node_module(npm).zip

or

用verdaccio搭建公司内部npm私服

常见错误：

npm 报错 Cannot find module 'core-js/modules/es6.regexp.constructor'

cnpm install core-js@2


![welcome vue element admin](https://camo.githubusercontent.com/8708a8dcb49d365b1786a5093d8f3fd37aeb18a2/68747470733a2f2f7770696d672e77616c6c7374636e2e636f6d2f61353839346331622d663661662d343536652d383264662d3131353164613038333962662e706e67)


## 功能(过期内容 待更新)

```
- 登录 / 注销 (以集成到现有系统中)

- 模块(功能) 
    - 登陆/注销 
    - 通用布局配置框架
        - 布局字段
        - 布局组件
        - 布局页面

- 模块(业务)
    - 用户列表 增删改查demo

- 全局功能 
  - 本地/后端 mock 数据
  - 自适应收缩侧边栏
  - 动态路由(菜单入库)
  - keep-alive tagview切换无刷新
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - Screenfull全屏
  - Clipboard(剪贴复制) (参考图标页面)
  - 跨域请求封装
 
 - 权限验证
  - 菜单过滤
  - 指令权限(按钮级)


- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑
  - 表格宽高自适应
  - 表格TableHeader组件 title + icon + toolbar

- 错误页面
  - 401
  - 404

- 組件
  - 拖拽Dialog
  - 拖拽Select 
  - 列表拖拽(参考layoutFieldsSelect.vue 已选字段排序)
  - SplitPane 
  - 树形下拉菜单 单选多选
  - 图标dialog(参考配置组件)
  - TableHeader(title + icon + toolbar)
  - RightPanelSub 右侧伸缩配置   
  - Sticky (吸顶)

 
- 其他
    - 编辑器
        - 富文本
        - Markdown
        - JSON 等多格式

    - Excel
        - 导出excel
        - 导入excel
        - 前端可视化excel
        - 导出zip
    - Dashboard 
    - ECharts v-chart 图表 
    - 头像上传
    - 回到顶部
    - Dropzone 图片拖动上传
    - CountTo
-封装
    - arrayHelper
    - rules
    -...
    
- 多环境发布
    - dev sit stage prod
```

## 开发

```bash
# 克隆项目
git clone 

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

