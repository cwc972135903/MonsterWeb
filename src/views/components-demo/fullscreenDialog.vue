<!--
 * @Descripttion: 可全屏dialog demo
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-25 09:58:20
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-04-16 10:36:40
 -->
<template>
  <div class="components-container">
    <el-button type="primary" @click="visible = true">
      open a Full Screen Dialog
    </el-button>
    <el-dialog-full-screen title="标题" :visible="visible" :before-close="handleClose" custom-class="editDialog"> 
      <el-select ref="select" v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog-full-screen>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import elDialogFullScreen from "@/components/FullScreenDialog";

export default {
  name: 'FullScreenDialogDemo',
  components: { elDialogFullScreen },
  directives: { elDragDialog },
  data() {
    return {
      visible: false,
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' }
      ],
      value: '',
      gridData: [{
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }]
    }
  },
  methods: {
    handleClose() {
        if (this.visible) {
            this.visible = false;
            // this.$emit("update:visible",false);
        } 
    }
  }
}
</script>
<style>
/**
 * 全局样式名，确保全局唯一，不污染其他组件样式
 * 若不改动其默认值800px，不改样式名也可以
 */
.editDialog {
  width: 800px;
}
</style>