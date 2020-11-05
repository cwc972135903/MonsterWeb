<!--
 * @Descripttion: 上传组件demo
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-18 10:45:25
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-04-22 15:55:40
 -->

<template>
  <div class="app-container">
    <code>上传组件 仅供代码参考 路径为测试路径 无法真正上传.具体示例可参考证券池导入</code>
    <el-form ref="dataForm" :inline="true" :rules="rules" :model="dataBind" label-width="120px" label-position="right" size="small">
      <el-form-item label="文件">
        <CommonUploader 
        class="form-input-line" 
        action="/uploader/demo" 
        accept=".XLS,.XLSX" 
        tip="只能上传符合格式的.xls,.xlsx文件" 
        :data="uploadParam" 
        :onError="onError" 
        :onSuccess="onSuccess" 
        :onBeforeUpload="onBeforeUpload">
        </CommonUploader>
      </el-form-item>
    </el-form>
    <div class="editor-container">
      <el-tag class="tag-title">
        属性 事件 方法
      </el-tag>
      <markdown-editor v-model="content" height="2500px" />
    </div>
  </div>
</template>

<script> 
import CommonUploader from "@/components/Upload/commonUploader.vue";
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  name: "UploadDemo",
  components: { CommonUploader,MarkdownEditor },
  directives: {},
  props: {
  },
  data() {
    return {
      dataBind: {
        impType: "2",
      },//表单绑定对象 
      rules: {
      },
      content: ` 
            //-----------------------------可选属性-----------------------------
            /**
            * @name: 上传地址 
            */
            action:{
                type:String,
                default(){
                    return "";
                }
            },
            /**
            * @name: 上传参数 
            */
            data:{
                type:Object,
                default(){
                    return {};
                }
            },
            /**
            * @name: 是否多选 
            */
            multiple:{
                type:Boolean,
                default(){
                    return false;
                }
            },
            /**
            * @name: 文件类型限制
            * others: 注意这里只是选择文件时限制格式，其实用户还是可以点选“所有文件”选项，上传其他格式。
            如果需要在在上传时再次校验，择需要在:before-upload这个钩子绑定相应的方法来校验
            */
            accept:{
                type:String,
                default(){
                    //.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.XLS,.XLSX
                    return "";
                }
            },
            /**
            * @name: 提示文字 
            */
            tip:{
                type:String,
                default(){
                    return "";
                }
            },
            /**
            * @name: 是否禁用
            */
            disabled:{
                type:Boolean,
                default(){
                    return false;
                }
            },
            //-----------------------------钩子函数---------------------------
            /**
            * @name:  点击文件列表中已上传的文件时的钩子
            * @other: 
            */
            onPreview:{
               type:Function
            },
            /**
            * @name:  文件列表移除文件时的钩子
            * @other: 
            */
            onRemove:{
                type:Function
            },
            /**
            * @name:  文件上传失败时的钩子
            * @other: 
            */
            onError:{
                type:Function
            },
            /**
            * @name:   文件上传成功时的钩子
            * @other: 
            */
            onSuccess:{
                type:Function
            }, 
            /**
            * @name:  文件上传前的钩子
            * others:上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            */
            onBeforeUpload:{
                type:Function
            }
            //-----------------------------方法---------------------------
            /**
            * @name: 清空已上传的文件列表 
            * @param {type} 
            * @return: 
            * @other: （该方法不支持在 before-upload 中调用）
            */
            clearFiles:function(){}
            
      `
    };
  },
  computed: {
    //上传参数 
    uploadParam: {
      get: function() {
        return this.dataBind;
      }
    }
  },
  watch: {
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData: function() {
    },
    /**
     * @name: 上传失败回调
     * @param {type} 
     * @return: 
     * @other: 
     */
    onError: function(error,file,fileList) {
      this.$notify.error({ title: "上传",message: error,duration: 2000 });
    },
    /**
     * @name: 上传成功回调
     */
    onSuccess: function(response,file,fileList) {
      this.$notify({ title: '成功',message: "上传成功",type: 'success',duration: 2000 })
    },
    /**
     * @name: 上传前校验
     */
    onBeforeUpload: function(file) { 
      return true;
    }
  }
};
</script>
<style scoped>
.form-input-line {
  width: 530px;
}
</style>
 