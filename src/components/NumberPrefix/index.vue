<!--
 * @Descripttion: 数字图标前缀 type: primary / success / warning / danger / info
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-06-18 15:00:38
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-06-18 15:17:17
 -->

<template>
  <span class="number-prefix" :style="{'background-color':bgColor}">
    <slot />
  </span>
</template>
<script>

export default {
  name: 'NumberPrefix',
  components: {

  },
  props: {
    type: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    bgColor: {
      get() {
        switch(this.type) {
          case "primary":
            return "#409eff";
            break;
          case "success":
            return "#67C23A";
            break;
          case "warning":
            return "#E6A23C";
            break;
          case "danger":
            return "#F56C6C";
            break;
          case "info":
            return "#909399";
            break;
          default:
            return "#909399";
            break;
        }
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.number-prefix { 
  border-radius: 10px;
  color: #fff;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
}
</style>

