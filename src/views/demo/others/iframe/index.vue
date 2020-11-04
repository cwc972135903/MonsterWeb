<!--
 * @Descripttion: iframe index
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-21 11:05:14
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-06-24 16:36:02
--> 
<template>
  <iframe v-if="$route.query.src" ref="iframe" v-loading.fullscreen.lock="fullscreenLoading" :src="$route.query.src" class="iframe"></iframe>  
  <iframe v-else ref="iframe" v-loading.fullscreen.lock="fullscreenLoading" :src="urlPath" class="iframe"></iframe>  
   <!-- <iframe  :src="urlPath" class="iframe" ref="iframe" ></iframe>   -->
</template>

<script>
export default {
  name: 'Myiframe',
  components: {},
  props: ['routerPath'],
  data() {
    return {
      fullscreenLoading: false,
      urlPath: this.getUrlPath()
    }
  },
  watch: {
    routerPath: function(val) {
      this.urlPath = this.getUrlPath()
    }
  },
  created() {
    this.fullscreenLoading = true
  },
  mounted() {
    this.iframeInit()
    // window.onresize = () => {
    //   this.iframeInit()
    // }
  },
  methods: {
    iframeInit() {
      const iframe = this.$refs.iframe
      const clientHeight = document.documentElement.clientHeight - 90
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.fullscreenLoading = false
        })
      } else {
        iframe.onload = () => {
          this.fullscreenLoading = false
        }
      }
    },
    getUrlPath: function() { 
      // debugger
      let url = window.location.href
      url = url.split("iframe/:")[1]; 
      if (url.indexOf("http") <= -1) {
          url ="http://"+url;
      }
    //   url = "http://localhost:5009/xquant.web/src/pages/base/index.html";
      return url
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