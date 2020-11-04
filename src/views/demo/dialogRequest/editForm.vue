<!--
 * @Descripttion: 打开dialog 内部请求表单
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-06-21 10:38:40
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-05-07 15:56:08
 -->

<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" title="dialog请求表单" :visible.sync="visible" :before-close="handleClose" custom-class="editDialogEditForm">
      <el-button v-show="loadingForm" :loading="loadingForm" type="text">加载中</el-button>
      <el-form v-show="!loadingForm" ref="dataForm" :inline="true" :rules="rules" :model="dataBind" label-width="120px" label-position="right" size="small">
        <el-form-item label="名称" prop="O_NAME">
          <el-input v-model="dataBind.O_NAME" class="form-input-item" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="loadingSave" @click="handleSave">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script> 
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽 
import { saveOrUpdateComponent,fetchForm } from "@/api/demo/demo";

export default {
  name: "DialogEditForm",
  components: {  },
  directives: { elDragDialog },
  props: {
    visible: {  //当前dialog的显示标识 勿修改 
      default: () => {
        return false;
      }
    },
    params: {
      type: Object,
      default:()=>{
        return {};
      }
    }
  },
  data() {
    return {
      dataBind: {},//表单绑定对象
      loadingForm: false,//获取表单信息 loading
      loadingSave: false,//保存 loading
      rules: {
        O_NAME: [
          { required: true,message: "名称不能为空",trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    /**
     * @name: 这种无初始化dataBind时，需在注释处声明此组件允许接受的参数
     * @param {oCode}  记录id
     */
    params(newVal,oldVal) { 
      //1 clear validate
      if(this.$refs["dataForm"]) {
        this.$refs["dataForm"].clearValidate();
      }
      //2 query request
      this.getForm();
    }
  }, 
  mounted() {
    this.initData();
  },
  methods: {
    initData: function() {

    },
    /**
     * @name: dataBind的初始值
     * @param {type} 
     * @return: 
     * @other: 
     */
    initDataBind:function(){
        this.dataBind = {
            oCode: "", 
            O_NAME:""
        };
    },
    /**
    * @name: 获取表单
    */
    getForm: function() {
      if(!this.params.oCode) {
        this.initDataBind();
        return;
      }
      this.loadingForm=true;
      fetchForm(this.params.oCode).then(response => { 
          this.loadingForm=false;
          this.dataBind=response.data; 
      }).catch(error => {
        this.loadingForm=false;
        this.$notify.error({ title: "获取详情",message: error,duration: 2000 });
      });
    },
    handleClose() {
      if(this.visible) {
        this.$emit("update:visible",false);
      }
    },
    /**
     * @name: 处理确定按钮事件
     * @param {type} 
     * @return: 
     * @other: 
     */
    handleSave() {
      this.$refs["dataForm"].validate(valid => {
        if(valid) {
          this.loadingSave=true;
          saveOrUpdateComponent(this.dataBind).then(response => {
            this.loadingSave=false;
            this.$notify({ title: '成功',message: "操作成功",type: 'success',duration: 2000 })
            this.handleClose();
            this.$emit("save",response.data);
          }).catch(error => {
            this.loadingSave=false;
            this.$notify.error({ title: "保存",message: error,duration: 2000 });
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.form-input-line {
  width: 530px;
}
.form-input-line-three {
  width: 870px;
}
</style> 


<style>
/**
 * 全局样式名，确保全局唯一，不污染其他组件样式
 */
.editDialogEditForm {
  width: 800px;
}
</style>