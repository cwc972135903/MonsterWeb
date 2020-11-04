<!--
 * @Descripttion: 自定义主题下拉选择组件
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-18 14:14:56
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-05-28 15:13:10
 -->
<template>
  <el-dropdown trigger="click" class="international" @command="handleSetCustomTheme">
    <div>
      <svg-icon class-name="international-icon" icon-class="theme" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="customTheme==='default'" command="default">
        默认
      </el-dropdown-item>
      <!-- <el-dropdown-item :disabled="customTheme==='custom-theme'" command="custom-theme">
        暗系(demo性质)
      </el-dropdown-item>  -->
      <el-dropdown-item :disabled="customTheme==='custom-theme-1'" command="custom-theme-1">
        衡泰蓝主题
      </el-dropdown-item> 
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

import '@/assets/custom-theme/index.css' //custom-theme 暗系主题 不覆盖默认的
import '@/assets/custom-theme/custom-theme-1.css' //custom-theme 测试主题 custom-theme-1 不覆盖默认的

// import '@/assets/custom-theme-1/index.css' //custom-theme 测试主题 custom-theme-1 直接覆盖掉默认的
// https://element.eleme.cn/#/zh-CN/theme/preview 配置element主题 但直接使用会导致一些样式问题(由于我们对现有样式已进行的修改没有很规范)

export default {
  computed: {
    customTheme() {
      return this.$store.getters.customTheme
    }
  },
  methods: {
    handleSetCustomTheme(customTheme) { 
      document.body.className = customTheme == "default" ? "": customTheme;
      
      this.$store.dispatch('settings/changeSetting', {
        key: 'customTheme',
        value: customTheme
      })
 
      this.$message({
        message: 'Switch theme Success',
        type: 'success'
      })
    }
  }
}
</script>
