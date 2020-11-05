<!--
 * @Descripttion: demo
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-17 14:26:40
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-02-17 15:03:56
 -->
<template>
  <div class="components-container">
    <code>drag-list base on
      <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
    </code>
    <div class="editor-container">
      <dnd-list :list1="list1" :list2="list2" list1-title="List" list2-title="Article pool" />
    </div>
  </div>
</template>

<script>
import DndList from '@/components/DndList'
import { fetchList } from '@/api/demo/article'

export default {
  name: 'DndListDemo',
  components: { DndList },
  data() {
    return {
      list1: [],
      list2: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list1 = response.data.items.splice(0, 5)
        this.list2 = response.data.items
      })
    }
  }
}
</script>

