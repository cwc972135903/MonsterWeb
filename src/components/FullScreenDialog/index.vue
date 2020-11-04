<!--
 * @Descripttion: 可全屏dialog组件
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-24 20:20:36
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-04-16 10:43:22
 -->

<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="visible" :before-close="beforeClose" :custom-class="customClass" :fullscreen="bFullscreen" append-to-body>
       <div slot="title">
         <span>{{ title }}</span> 
        <el-button type="text" class="el-dialog-full-screen" @click="handleFullScreen">
          <i class="el-icon-full-screen"></i>
        </el-button> 
       </div>
       
       <slot></slot>

       <template slot="footer">
           <slot name="footer"></slot>
       </template>
    </el-dialog>
</template>

<script>    

export default {
  name: 'ElDialogFullScreen',
  directives: { },
  /* eslint-disable vue/require-prop-types */
  props: { 
    /**
     * @name: dialog标题
     * @param {type} 
     * @return: 
     * @other: 
     */
    title: { 
      default: () => {
        return "";
      }
    },
    visible: {  //当前dialog的显示标识 勿修改 
      default: () => {
        return false;
      }
    }, 
    /**
     * @name: 样式 class
     * @param {type} 
     * @return: 
     * @other: 
     */
    customClass:{
      default: () => {
        return "editDialog";
      }
    },
    /**
     * @name: 关闭事件
     * @param {type} 
     * @return: 
     * @other: 
     */
    beforeClose:{
      default: () => {
        return ()=>{

        };
      }
    },
    /**
     * @name: 默认是否全屏
     * @param {type} 
     * @return: 
     * @other: 
     */
    fullscreen:{
      default: () => {
        return false;
      }
    }
  }, 
  data() {
    return {
      bFullscreen: this.fullscreen
    }
  },  
  methods: {
    /**
     * @name: 全屏切换
     * @param {type} 
     * @return: 
     * @other: 
     */
    handleFullScreen() {
      return this.bFullscreen = !this.bFullscreen;
    }
  }
}
</script>
<style>
/**
 * @name: 全屏按钮样式
 * @param {type} 
 * @return: 
 * @other: 
 */
.el-dialog-full-screen{
    position: absolute;
    top: 20px;
    right: 40px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 16px;
}
</style>
 
 
 