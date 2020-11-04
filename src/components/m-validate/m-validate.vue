<!--
 * @Descripttion: 滑块校验组件封装
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-07-27 13:15:37
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-07-27 15:11:02
--> 
<template>
  <div id="captcha"></div>
</template>

<script> 
import validateClass from "./validate.js";
import "./validate.css";

export default { 
  props: {
      onSuccess:{
          type:Function
      },
      onFail:{
          type:Function
      }
  },
  data() {
    return {
      validateClass,
      validateObj:null
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData: function() { 
        this.validateObj = new this.validateClass({
            el: document.getElementById('captcha'),
            onSuccess: this.onSuccess,
            onFail: this.onFail
        });
        this.validateObj.init();
    },
    refresh:function(){
      this.validateObj.reset();
    }
  }
}
</script>

<style>
</style>
