<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:17
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-10-28 15:34:42
 -->
<template>
  <div class="sql-editor">
    <textarea ref="textarea" :placeholder="placeholder"></textarea> 
  </div>
</template>

<script>  
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css' 

import 'codemirror/theme/xq-light.css'

require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/selection/active-line");
require("codemirror/mode/sql/sql");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/sql-hint"); //自动补全相关
require("codemirror/addon/display/placeholder.js");//placeholder

export default {
  name: 'CodemirrorSql',
  /* eslint-disable vue/require-prop-types */
  props: {
    value: {  
      default: () => {
        return null;
      }
    }, 
    lineNumbers: {  
      default: () => {
        return true;
      }
    },
    placeholder:{
      default: () => {
        return "";
      }
    }
  }, 
  data() {
    return {
      editor: false
    }
  }, 
  watch: {
    value(value) {
      const editor_value = this.editor.getValue()
      if (value !== editor_value) {
        this.editor.setValue(value||"", null, 2)
      }
    }
  },
  mounted() { 
    this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: this.lineNumbers,
      mode: 'text/x-mariadb',
      gutters: ['CodeMirror-lint-markers'],
      theme:  'xq-light',//'monokai',
      lint: true,
      extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
      lineWrapping: true//自动换行
    })
    
    //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
    //  this.editor.on('cursorActivity', function () {
    //    debugger
    //     this.editor.showHint()
    //   }) 

    if (this.value) {
      this.editor.setValue(this.value, null, 2)
    } 
    this.editor.on('change', cm => { 
      this.$emit("input", cm.getValue()); 
    })
  },
  methods: {
    getValue() {
      return this.editor.getValue()
    }
  }
}
</script>
<style scoped>
.sql-editor{
  height: 100%;
  position: relative; 
}
.sql-editor >>> .CodeMirror {
  height: 100%;
  min-height: 200px;
  background-color:blanchedalmond;
}
.sql-editor >>> .CodeMirror-scroll{
  min-height: 200px;
}
.sql-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
 
 
 