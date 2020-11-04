<!--
 * @Descripttion: iframe index
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-21 11:05:14
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-09-01 17:35:40
--> 
<template>
  <!-- <el-button v-if="fullscreenLoading" type="text">页面加载中...</el-button>  -->
  <!-- v-loading.fullscreen.lock="fullscreenLoading" -->
  <div v-el-resize="{name:'contentSizeChange'}" class="app-container">
    <iframe v-if="$route.meta.src" ref="iframe" :src="decodeURIComponent($route.meta.src)" class="iframe"></iframe>
    <iframe v-else ref="iframe" :src="routerPath" class="iframe"></iframe>
  </div>
</template>

<script>
import elResize from "@/directive/el-doresize";

export default {
  name: 'Myiframe',
  components: {},
  directives: { elResize },
  props: {
    layoutHeight: {
      default: () => {
        return -1;
      }
    },
    /**
    * @name:当前是否处于布局页面配置中 
    * @param {type} 
    * @return: 
    * @other: 
    */
    inLayoutSetting: {
      default: () => {
        return false;
      }
    },
    /**
     * @name: 作为组件时候，url以pros传递进来
     * @param {type} 
     * @return: 
     * @other: 
     */
    routerPath: {
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      clientHeight: window.document.documentElement.clientHeight, 
      fullscreenLoading: false
    }
  },
  computed: {
    /**
     * @name: 通用计算属性 返回当前页面的基础高度
     * @param {type} 
     * @return: 
     * @other: 
     */
    baseHeight: {
      get: function() { 
        let height;
        if(this.layoutHeight==-1) {
          height=this.clientHeight
        } else {
          height=this.layoutHeight+this.$store.getters.marginHeightTopMainContent;
        }
        return height;
      }
    },
    iframeHeight:{
      get: function() { 
        return this.baseHeight-100;
      }
    }
  },
  watch: {
    iframeHeight() {
      this.iframeInit()
    }
  }, 
  created() {
    this.fullscreenLoading=true
  },
  mounted() {
    this.initData()
    // window.onresize = () => {
    //   this.iframeInit()
    // }
  },
  methods: {
    initData:function(){
      this.iframeInit();
    },
    iframeInit() {  
      const iframe=this.$refs.iframe 
      iframe.style.height=`${this.iframeHeight}px`  
      if(iframe.attachEvent) {
        iframe.attachEvent('onload',() => {
          this.fullscreenLoading=false
        })
      } else {
        iframe.onload=() => {
          this.fullscreenLoading=false 
        }
      }
    },
     /**
   * @name: 监听client size change
   * @param {type} 
   * @return: 
   * @other: 
   */
    contentSizeChange: function(domWidth,domHeight,windowClientWidth,windowClientHeight) {
      this.clientHeight=windowClientHeight;
    },
    getUrlPath: function() {
      // let url = window.location.href;
      // url = url.split("iframe/:")[1]; 
      // if (url.indexOf("http") <= -1) {
      //     url ="http://"+url;
      // } 
      // return url
      return "";
    }
  }
}
</script>

<style>
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>