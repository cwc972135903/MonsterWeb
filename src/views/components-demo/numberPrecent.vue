<!--
 * @Descripttion: 百分比控件
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-30 13:41:52
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-08-19 11:10:23
 -->

<template>
  <div class="components-container">
    <p class="warn-content">
       百分比控件 基于el-number进行封装，v-model，省去数值与百分比间的相互手工转换
    </p>
   <NumberPercent v-model="testNum"></NumberPercent> 
    <code>
      v-model： {{testNum}}
    </code>
    <code>
      import NumberPercent from '@/components/NumberPercent/index'
      <br>
      &lt;NumberPercent v-model="testNum"&gt;&lt;/NumberPercent&gt;
      <br> 
    </code>
  </div>
</template>

<script>
import NumberPercent from '@/components/NumberPercent/index'

export default {
  name: 'NumberPercentDemo',
  components: { NumberPercent },
  data() {
    return {
      testNum:0.56
    }
  },
  computed: {
 
  },
  methods: {
    
  }
}
</script>

<style scoped>
 
</style>

