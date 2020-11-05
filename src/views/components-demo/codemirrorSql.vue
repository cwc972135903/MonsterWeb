<template>
  <div class="components-container">
    <code>暂时只是实现Ctrl自动补全，语法高亮，其他的日后完善 </code>
    <CodemirrorSql v-model="content"></CodemirrorSql>
    <el-button @click="getValue">打印绑定值</el-button>
  </div>
</template>

<script>
  import CodemirrorSql from "@/components/CodemirrorSql";

  export default {
    name: "CodeMirrorSqlDemo",
    components: { CodemirrorSql },
    data() {
      return {
        content: "select * from user"
      };
    },
    created() {},
    methods: {
      getValue: function() {
        console.log(this.content);
      }
    }
  };
</script>
