<!--
 * @Descripttion: 增删改查
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-06-10 16:09:59
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-04 17:49:47
 -->

<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" :title="dataBind.componentId ? '编辑title':'新增title'" :visible.sync="visible" :before-close="handleClose" custom-class="editDialog">
      <el-form ref="dataForm" :inline="true" :rules="rules" :model="dataBind" label-width="120px" label-position="right" size="small">
        <el-form-item label="组件名称" prop="componentName">
          <el-input v-model="dataBind.componentName" class="form-input-item" />
        </el-form-item>
        <el-form-item label="类型" prop="componentTypeId">
          <el-select v-model="dataBind.componentTypeId" placeholder="组件类型" class="form-input-item">
            <el-option v-for="item in componentTypeOptions" :key="item.componentTypeId" :label="item.componentType" :value="item.componentTypeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组件编码" prop="componentCode">
          <el-input v-model="dataBind.componentCode" :disabled="dataBind.componentId ? true:false" class="form-input-item" />
        </el-form-item>
        <el-form-item v-if="dataBind.componentMetaCode" label="自定义组件编码" prop="componentMetaCode">
          <el-input v-model="dataBind.componentMetaCode" class="form-input-item" disabled />
        </el-form-item>
        <el-form-item label="宽度" prop="width">
          <el-input-number v-model="dataBind.width" :controls="false" class="form-input-item" :min="50"></el-input-number>
        </el-form-item>
        <el-form-item label="高度" prop="height">
          <el-input-number v-model="dataBind.height" :controls="false" class="form-input-item" :min="50"></el-input-number>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="dataBind.path" class="form-input-line" :disabled="dataBind.componentMetaCode?true:false" placeholder="@/views/module/component" />
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
import { deepCopy } from "@/utils/arrayHelper"; 
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽 
// import { fetchComponentType } from "@/api/layoutServer";
import { saveOrUpdateComponent } from "@/api/demo/demo";

export default {
  name: "NormalEdit",
  components: {},
  directives: { elDragDialog },
  props: {
    visible: {  //当前dialog的显示标识 勿修改 
      default: () => {
        return false;
      }
    },
    params: {//表单参数 
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      componentTypeOptions: [],//组件类型列表
      dataBind: {
        //放置与参数传递无关的默认参数
      },//表单绑定对象
      loadingSave:false,//保存 loading
      rules: {
        componentName: [
          { required: true,message: "组件名称不能为空",trigger: "blur" }
        ],
        componentTypeId: [
          { required: true,message: "请选择组件类型",trigger: "blur" }
        ],
        componentCode: [
          { required: true,message: "组件编码不能为空",trigger: "blur" }
        ],
        path: [
          { required: true,message: "组件path不能为空",trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    params(newVal,oldVal) { 
       let copy={
            componentId: "",
            componentCode: "",
            componentMetaCode: "",
            componentName: "",
            componentTypeId: "",
            width: "",
            height: "",
            path: "",
        };
        //1 deep copy
        if(newVal&&JSON.stringify(newVal)!="{}") {
            copy=deepCopy(Object.assign({},copy,newVal));
        } 
        //2 set attr from copy obj 
        this.dataBind = Object.assign({},this.dataBind,copy); 
        //3 clear validate 
        if(this.$refs["dataForm"]) {
            this.$refs["dataForm"].clearValidate();
        }
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData: function() {
      this.getComponentType();
    },
    /**
    * @name: 获取列表 
    */
    getComponentType: function() {
      // fetchComponentType().then(response => {
      //   this.componentTypeOptions=response.data;
      // }).catch(error => {
      //   this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      // });
    },
    handleClose() {
        if (this.visible) {
            this.$emit("update:visible",false);
        } 
    },
    handleSave() {
      this.$refs["dataForm"].validate(valid => {
        if(valid) {
          this.loadingSave = true;
          saveOrUpdateComponent(this.dataBind).then(response => {
              this.loadingSave = false; 
              this.$notify({ title: '成功',message: "操作成功",type: 'success',duration: 2000 })
              this.handleClose();
              this.$emit("save",response.data);
          }).catch(error=>{
              this.loadingSave = false;
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
 * 若不改动其默认值800px，不改样式名也可以
 */
.editDialog {
  width: 800px;
}
</style>