<!--
 * @Descripttion: 表格拖拽
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-05 15:46:05
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-05 17:51:01
 -->

<template>
  <div class="app-container"> 
    <el-table ref="dragTable" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="icon-star" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="{}">
          <svg-icon class="drag-handler" icon-class="drag" />
        </template>
      </el-table-column>
    </el-table> 
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/article'
import Sortable from 'sortablejs'

export default {
  name: 'DragTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const data = {
         items:[{
            id:"1",
            title:"测试数据1",
            author:"cwc"
         },{
             id:"2",
            title:"测试数据2",
            author:"hsj"
         },{
             id:"3",
            title:"测试数据3",
            author:"hsj"
         }],
         total:2
      }
      this.list = data.items
      this.total = data.total
      this.listLoading = false 
      this.$nextTick(() => {
        this.setSort()
      })
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {    
          //处理数据本身的sortIndex field
          //这里以id作为sortIndex field
          // if (evt.newIndex == evt.oldIndex) {
          //   return;
          // }
          // if (evt.newIndex < evt.oldIndex) {
          //   //上移 
          //   this.list[evt.oldIndex] = {...this.list[evt.oldIndex],id:this.list[evt.newIndex].id + 1}
          // }else{
          //   //下移  
          //   this.list[evt.oldIndex] = {...this.list[evt.oldIndex],id:this.list[evt.newIndex].id - 1}            
          // }  
          //发送请求改变次序 如果是排序多次统一保存就不需要这里处理请求了
          // this.putChangeSort(this.rightList[evt.oldIndex]);  
        }
      })
    }
  }
}
</script> 

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
</style>
