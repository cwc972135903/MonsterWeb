<!--
 * @Descripttion: 角色编辑
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-01 15:43:15
 * @LastEditors: mengmeng.jiang
 * @LastEditTime: 2020-10-20 10:29:44
 -->
<!--
<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" title="角色详情" :visible.sync="visible" :before-close="handleClose" custom-class="editDialogRoleEdit">
      <el-form :inline="inline" ref="dataForm" :rules="rules" :model="dataBind" label-width="120px" label-position="right" size="small">
        <el-form-item label="角色名称" prop="rName">
          <el-input v-model="dataBind.rName" class="form-input-item" :disabled="dataBind.rId != ''" />
        </el-form-item>
        <el-form-item label="角色编码" prop="rCode">
          <el-input v-model="dataBind.rCode" class="form-input-item" :disabled="dataBind.rId != ''" />
        </el-form-item>
        <el-form-item label="角色状态" prop="rStatus">
          <el-select v-model="dataBind.rStatus" placeholder="组件类型" class="form-input-item">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色类型" prop="roleType">
            <el-select v-model="dataBind.roleType" placeholder="角色类型" class="form-input-item" :disabled="dataBind.rId != ''">
              <el-option v-for="item in roleTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <!--
        <el-form-item label="管理员" prop="rFlag " v-if="dataBind.roleType == 0">
           <el-select v-model="dataBind.rFlag" placeholder="组件类型" class="form-input-item">
            <el-option v-for="item in flagOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>   
        -->
        <el-form-item label="备注" prop="rRemark">
          <el-input v-model="dataBind.rRemark" type="textarea" class="form-input-line" maxlength="100" show-word-limit/>
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
import { fetchRoleDetail, saveOrUpdateRole } from "@/api/sys"; 
import { roleTypeOptions } from "@/utils/enum";

export default {
  name: "RoleEdit",
  components: {},
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
      //1 clear validate
      if(this.$refs["dataForm"]) {
        this.$refs["dataForm"].clearValidate();
      }
      //2 query request
      this.getRoleDetail();
    }
  },
  data() { 
    const validRemark = (rule, value, callback) => { 
      if (value && value.length > 50) { 
        callback(new Error('备注过长>50')); 
      } 
       callback();
    };
    return {
      listForComponentType: [],//组件类型列表
      dataBind: {},//表单绑定对象
      loadingForm:false,//获取详情 loading
      loadingSave:false,//保存 loading
      statusOptions:[
        {value:0,label:"禁用"},
        {value:1,label:"启用"}
      ],
      flagOptions:[
        {value:0,label:"否"},
        {value:1,label:"是"}
      ],
      roleTypeOptions:roleTypeOptions,//角色类型options
      rules: {
        rName: [
          { required: true,message: "角色名称不能为空",trigger: "blur" }
        ],
        rRemark:[
           { validator: validRemark, trigger: "blur" }
        ],
        rCode: [
          { required: true,message: "角色码不能为空",trigger: "blur" }
        ]
      }
    };
  },
  created() {
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
          rId: "",
          deptIdList: [],
          menuIdList: [],
          rFlag: 1,
          rName: "",
          rRemark: "",
          rStatus: 1,
          roleType: 0,
          rCreatDate:"",
          rCode:""
        };
    },
    /**
     * @name: 获取角色详情
     * @param {type} 
     * @return: 
     * @other: 
     */
    getRoleDetail: function() { 
      if(!this.params.rId) { 
        this.initDataBind();
        return;
      }
      this.loadingForm=true;
      fetchRoleDetail(this.params.rId).then(response => {
        this.loadingForm = false; 
        this.dataBind= response.data;
      }).catch(error => {
        this.loadingForm=false;
        this.$notify.error({ title: "获取角色详情",message: error,duration: 2000 });
      });
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
          saveOrUpdateRole(this.dataBind).then(response => {
              this.loadingSave = false; 
              this.$notify({ title: '成功',message: "操作成功",type: 'success',duration: 2000 })
              this.handleClose();
              this.$emit("save",response.data);
          }).catch(error=>{
              this.loadingSave = false;
              this.$notify.error({ title: "保存角色",message: error,duration: 2000 });
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
.editDialogRoleEdit {
  width: 800px;
}
</style>