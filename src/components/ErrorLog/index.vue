<!--
 * @Descripttion: 错误日志
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-18 15:06:42
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-05-14 13:21:53
 -->
<template> 
  <div v-if="errorLogs.length>0" class="app-container">
  <!-- <div class="app-container"> -->
    <el-badge :is-dot="true" style="line-height: 25px;margin-top: -5px;" @click.native="dialogTableVisible=true">
      <el-button style="padding: 8px 10px;" size="small" type="danger">
        <svg-icon icon-class="bug" />
      </el-button>
    </el-badge>
    <el-dialog v-el-drag-dialog :close-on-click-modal="true" title="Error Log" :visible.sync="dialogTableVisible" custom-class="editDialog-errorLog">
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template slot-scope="scope">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ scope.row.err.message }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Info: </span>
              <el-tag type="warning">
                {{ scope.row.vm.$vnode.tag }} error in {{ scope.row.info }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <el-tag type="success">
                {{ scope.row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template slot-scope="scope">
            {{ scope.row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽 

export default {
  name: 'ErrorLog',
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false
    }
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    }
  }
}
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
<style>
/**
 * 全局样式名，确保全局唯一，不污染其他组件样式
 * 若不改动其默认值800px，不改样式名也可以
 */
.editDialog-errorLog {
  width: 900px;
}
</style>