<!--
 * @Descripttion: 部门编辑
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-01 17:35:34
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-11-04 17:55:07
 -->
<!--
<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" title="部门详情" :visible.sync="visible" :before-close="handleClose" custom-class="editDialogDepartment">
      <el-form :inline="inline" ref="dataForm" :rules="rules" :model="dataBind" label-width="120px" label-position="right" size="small">
        <el-form-item label="上级部门" prop="sdParentId">
          <SelectTree ref="selectSingleTree" v-model="dataBind.sdParentId" :data="parentOption" class="form-input-item" placeholder="顶级部门则设置为空"></SelectTree>
        </el-form-item>
        <el-form-item label="部门名称" prop="sdName">
          <el-input v-model="dataBind.sdName" class="form-input-item"  />
        </el-form-item>
        <el-form-item label="英文名称" prop="sdNameEn">
          <el-input v-model="dataBind.sdNameEn" class="form-input-item"  />
        </el-form-item>
        <el-form-item label="部门编码" prop="sdCode">
          <el-input v-model="dataBind.sdCode" class="form-input-item" :disabled="dataBind.sdId != ''"  />
        </el-form-item>        
        <el-form-item label="排序" prop="sdIndex">
          <el-input-number v-model="dataBind.sdIndex" :controls="false" class="form-input-item" :min="0">
          </el-input-number>
        </el-form-item> 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('table.cancel') }}</el-button>
        <el-button @click="handleSave" type="primary" :loading="loadingSave">{{ $t('table.confirm') }}</el-button>
      </div> 
    </el-dialog>
  </div>
</template>

<script>
import { deepCopy } from "@/utils/arrayHelper";
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽 
import SelectTree from "@/components/SelectTree";  
import { fetchDepartmentList,saveOrUpdateDepartment } from "@/api/sys";
import { deleteTree } from "@/utils/arrayHelper";

export default {
  name: "DepartmentEdit",
  components: { SelectTree },
  directives: { elDragDialog },
  props: {
    visible: {  //当前dialog的显示标识 勿修改 
      default: () => {
        return false;
      }
    },
    params: {//表单参数 
      type: Object
    },
    inline: {
      default: () => {
        return true;
      }
    }
  },
  watch: {
    params(newVal,oldVal) {
      let copy={
        sdId: "",
        sdParentId: "",
        sdName: "",
        sdNameEn: "",
        sdIndex: "0",
        sdCode:""
      };
      //1 deep copy
      if(newVal&&JSON.stringify(newVal)!="{}") {
        copy=deepCopy(Object.assign({},copy,newVal));
      }
      //2 set attr from copy obj 
      this.dataBind=Object.assign({},this.dataBind,copy);

      //3 clear validate 
      if(this.$refs["dataForm"]) {
        this.$refs["dataForm"].clearValidate();
      }

      if (this.dataBind.sdId) {//编辑时
        let data = JSON.parse(JSON.stringify(this.parentOptionInit));
        this.parentOption = deleteTree(data,this.dataBind.sdId,"sdId");
      }else{//新增时 还原
        this.parentOption = this.parentOptionInit;
      }
    }
  },
  data() {  
    const validName = (rule, value, callback) => { 
        if (!value) {
          callback(new Error('部门名称不能为空')); 
        }
        if (value && value.length > 25) { 
          callback(new Error('部门名称过长>25')); 
        } 
        callback();
    };
    return {
      dataBind: {},//表单绑定对象 
      loadingSave: false,//保存 loading
      parentOptionInit: [],//父菜单列表  初始化集合
      parentOption: [],//父菜单列表   显示集合
      rules: {
        sdName: [
           { required: true,validator: validName, trigger: "blur" } 
        ],
        sdCode: [
           { required: true,message: "部门编码不能为空",trigger: "blur" }
        ]
      },
      //========================================icon select dialog=================================
      iconSelectObj: {
        visible: false, //新增编辑组件 visible
      }
    };
  },
  computed: {
  },
  mounted() {
    // this.initData();
  },
  methods: {
    initData: function() {
      this.getParentList();
    },
    /**
     * @name: 获取父菜单列表
     * @param {type} 
     * @return: 
     * @other: 
     */
    getParentList: function() {
      fetchDepartmentList().then(response => {
        this.parentOption=response.data; 
        this.parentOptionInit = response.data; 
      }).catch(error => {
        this.$notify.error({ title: "获取父菜单",message: error,duration: 2000 });
      });
    },   
    handleClose() {
      if(this.visible) {
        this.$emit("update:visible",false);
      }
    },  
    handleSave() {
      this.$refs["dataForm"].validate(valid => {
        if(valid) { 
          this.loadingSave=true;
          console.log(this.dataBind);
          saveOrUpdateDepartment(this.dataBind).then(response => {
            this.loadingSave=false;
            this.$notify({ title: '成功',message: "操作成功",type: 'success',duration: 2000 })
            this.handleClose();
            this.$emit("save",response.data);
          }).catch(error => {
            this.loadingSave=false;
            this.$notify.error({ title: "保存部门",message: error,duration: 2000 });
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
</style>

<style>
.editDialogDepartment {
  width: 800px;
}
</style>