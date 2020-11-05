<!--
 * @Descripttion: 布局分隔
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-06-18 09:44:41
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-03-12 15:39:44
 -->

<template>
  <div v-el-resize="{name:'contentSizeChange'}" :style="{'height':contentHeight+'px'}">
    <el-button @click="toggleShowLeft">通过改变min-percent及default-percent隐藏左侧</el-button>
    <split-pane split="vertical" :min-percent="minPercent" :default-percent="defaultPercent" @resize="resize">
      <template slot="paneL">
        <div class="left-container" />
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container" />
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import elResize from "@/directive/el-doresize";
export default {
  name: 'SplitpaneDemo',
  components: { splitPane },
  directives: { elResize},
  data() {
    return {
      clientHeight: window.document.documentElement.clientHeight,
      minPercent:10,
      defaultPercent:20,
      showLeft:true
    }
  },
  computed: { 
    contentHeight: {
      get: function () {
        return this.clientHeight - 100;
      }
    }
  },
  methods: {
    resize() {
      // eslint-disable-next-line no-console
      console.log('resize')
    },
    /**
     * @name: 监听client size change
     * @param {type} 
     * @return: 
     * @other: 
     */
    contentSizeChange: function (domWidth, domHeight, windowClientWidth, windowClientHeight) {
      this.clientHeight = windowClientHeight;
    },
    /**
     * @name: 通过改变min-percent及default-percent隐藏左侧
     * @param {type} 
     * @return: 
     * @other: 
     */
    toggleShowLeft:function(){
      if(!this.showLeft){
         this.minPercent = 10;
         this.defaultPercent = 20;
      }else{
        this.minPercent = 0;
        this.defaultPercent = 0;
      }
      this.showLeft = !this.showLeft;
    }
  }
}
</script>

<style  scoped>
.components-container {
  position: relative;
  height: 100vh;
}

.left-container {
  background-color: #f38181;
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 200px;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}
</style>
