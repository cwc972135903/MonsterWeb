/*
 * @Descripttion: 项目起始点 Vue.mixin加入路由切换逻辑 手动维护缓存
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-04-02 09:34:12
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-07-31 10:22:31
 */

import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import Element from "element-ui";
import "./styles/element-variables.scss";

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import i18n from "./lang"; // Internationalization
import "./icons"; // icon
import "./permission"; // permission control
import "./utils/errorLog"; // error log

import * as filters from "./filters"; // global filters

// 移除mock配置 其会导致el-upload进度条失效 原因是mock配置会自己维护一个XMLHttpRequest对象，导致上传的XMLHttpRequest对象失效
// import { mockXHR } from "../mock"; // simulation data

// // mock api in github pages site build
// if (process.env.NODE_ENV === "production") {
//   mockXHR();
// }

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
}); 

/**
 * @name: 手动删除keep-alive对应key的缓存 version 0.2
 * @param {type}
 * @return:
 * @other: 与tagsView.js结合实现对于keep-alive缓存的维护操作。
 tagsView中利用 
 this.$router.replace({
   path: '/redirect' + fullPath
 })
 实现触发deleteCache，deleteCache中利用that.$parent.$children获取所有keep-alive下的缓存实例，
 that.$store.getters.visitedViews获取tagsView维护的数据，两者进行同步操作。同步时的变化点用
 visitedViews内部的属性（如刷新用到的is_current）进行判别。
 */
function deleteCache(that, to, from) { 
  let nodeChildren = that.$parent.$children;
  if (nodeChildren && nodeChildren.length > 0) {
      for (let index = 0; index < nodeChildren.length; index++) {
         //判断每个node实例还在不在visitedViews中，若不在，则销毁。在不在是通过key来匹配判断
        let node = nodeChildren[index];
        if (!node.$vnode || !node.$vnode.key) {
           continue;
        }
        let nodeKey = node.$vnode.key; 
        const fullPathList = that.$store.getters.visitedViews.filter(c=>!c.is_current).map(v => v.fullPath);
        if (fullPathList.indexOf(nodeKey.replace(nodeKey.split("/")[0],"")) == -1) {
          //不在visitedViews中
          deleteNodeCache(node);
        } 
      } 
  } 
}

function deleteNodeCache(node) {
   //删除from的缓存
    if (node.$vnode && node.$vnode.data && node.$vnode.data.keepAlive) {
      if (
        node.$vnode.parent &&
        node.$vnode.parent.componentInstance &&
        node.$vnode.parent.componentInstance.cache
      ) {
        if (node.$vnode.componentOptions) {
          var key =
            node.$vnode.key == null
              ? node.$vnode.componentOptions.Ctor.cid +
                (node.$vnode.componentOptions.tag
                  ? `::${node.$vnode.componentOptions.tag}`
                  : "")
              : node.$vnode.key;
          var cache = node.$vnode.parent.componentInstance.cache;
          var keys = node.$vnode.parent.componentInstance.keys;
          if (cache[key]) {
            if (keys.length) {
              var index = keys.indexOf(key);
              if (index > -1) {
                keys.splice(index, 1);
              }
            }
            delete cache[key]; 
            if (node._watchers && key.indexOf("=") == -1) {//JSON.stringify(from.params) == "{}"
                node.$destroy();//from.params不为空的组件不进行销毁(隐藏的更新 新增页面)
            } 
          }
        }
      }
    }
}

Vue.mixin({
  // created(){
  //   window.console.log('global mixin')
  // }
  beforeRouteUpdate(to, from, next) {
    deleteCache(this, to, from);
    next();
  },
  beforeRouteLeave: function(to, from, next) {
    deleteCache(this, to, from);
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App)
});
