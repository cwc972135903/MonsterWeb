<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-04-08 15:54:36
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-04 17:52:12
 -->
 <!--
<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog title="用户详情" :close-on-click-modal="false" :visible.sync="visible" :before-close="handleClose" @open="open" custom-class="userEditDialog">
      <el-form  :inline="inline" ref="dataForm" :rules="rules" :model="dataBind" label-position="right" label-width="80px" size="small">
        <el-form-item label="用户账号" prop="emAccount">
          <el-input v-model="dataBind.emAccount" :disabled="dataBind.emId ? true:false" class="form-input-item" />
        </el-form-item>
        <el-form-item label="用户姓名" prop="emUsername">
          <el-input v-model="dataBind.emUsername" :disabled="dataBind.emId ? true:false" class="form-input-item" />
        </el-form-item>
        <el-form-item label="用户密码" prop="emPassword" v-if="!dataBind.emId">
          <el-input v-model="dataBind.emPassword" type="password" class="form-input-item" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="emEmail">
          <el-input v-model="dataBind.emEmail" class="form-input-item" />
        </el-form-item>
        <el-form-item label="用户部门" prop="emDeptId">
          <SelectTree ref="selectSingleTree" v-model="dataBind.emDeptId" :data="departData" placeholder="部门选择" class="form-input-item"></SelectTree>
        </el-form-item>
        <el-form-item label="手机号码" prop="emMobile">
          <el-input v-model="dataBind.emMobile" class="form-input-item" />
        </el-form-item>
        <el-form-item label="传真" prop="emFax">
          <el-input v-model="dataBind.emFax" class="form-input-item" />
        </el-form-item>
        <el-form-item label="账号状态" prop="emStatus">
          <el-select v-model="dataBind.emStatus" class="form-input-item">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item  label="功能角色" prop="roleIdsFunction">
          <el-select multiple collapse-tags v-model="dataBind.roleIdsFunction" class="form-input-item">
            <el-option v-for="item in roleOptionsFunction" :key="item.rId" :label="item.rName" :value="item.rId">
            </el-option>
          </el-select>
        </el-form-item>  
        <el-form-item label="数据角色" prop="roleIdsData">
          <el-select multiple collapse-tags v-model="dataBind.roleIdsData" class="form-input-item">
            <el-option v-for="item in roleOptionsData" :key="item.rId" :label="item.rName" :value="item.rId">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="流程角色" prop="roleIdsWF">
          <el-select multiple collapse-tags v-model="dataBind.roleIdsWF" class="form-input-line">
            <el-option v-for="item in roleOptionsWF" :key="item.rId" :label="item.rName" :value="item.rId">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="备注" prop="emRemark">
          <el-input type="textarea" v-model="dataBind.emRemark" class="form-input-line" maxlength="100" show-word-limit/>
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
import { validEmail } from "@/utils/validate";
import SelectTree from "@/components/SelectTree";
import {
  fetchUserList,
  fetchDepartmentList,
  saveOrUpdateUser,
  fetchUserDetail,
  fetchRoleListData,
  fetchRoleListFunction,
  fetchRoleListWF
} from "@/api/user";
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽
import { ruleCommonValidator } from '@/utils/ruleValidator';
import { statusOptions } from '@/utils/enum'


export default {
  name: "userEdit",
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
      //1 clear validate
      if(this.$refs["dataForm"]) {
        this.$refs["dataForm"].clearValidate();
      }
      //2 query request
      this.getUserDetail();
    }
  },
  data() {  
    const validRemark = (rule, value, callback) => { 
      if (value && value.length > 100) { 
        callback(new Error('备注过长>100')); 
      } 
       callback();
    };
    return {
      dataBind: {},
      departData: [], //部门下拉列表数据
      roleOptionsFunction: [],//功能角色 id List
      roleOptionsWF: [],//流程角色 id List
      roleOptionsData: [],//数据角色 id List
      statusOptions: statusOptions,//状态
      loadingForm: false,
      loadingSave: false,
      rules: {
        emAccount: [
          { required: true,message: "账号不能为空",trigger: "blur" }
        ],
        emUsername: [
          { required: true,message: "姓名不能为空",trigger: "blur" }
        ],
        emPassword: [
          { required: true,validator: ruleCommonValidator.validatePass,trigger: "blur" }
        ],
        emEmail: [
          { required: true,validator: ruleCommonValidator.validateEmail,trigger: "blur" }
        ],
        emDeptId: [
          { required: true, message: "请选择部门",trigger: "blur" }
        ],
        roleIdsFunction:[
           { required: true, message: "至少选择一个功能角色",trigger: "blur" }
        ],
        emRemark:[
           { validator: validRemark, trigger: "blur" }
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
    open: function() {

    },
    initData: function() {
      this.getDepartmentList(); //获取部门下拉数据 request 只需获取一次
      this.getRoleList();//获取角色列表
    },
    /**
     * @name: dataBind的初始值
     * @param {type} 
     * @return: 
     * @other: 
     */
    initDataBind:function(){
        this.dataBind = {
            emId: "",
            emAccount: "",
            emUsername: "",
            emPassword: "",
            emEmail: "",
            emDeptId: "",
            emMobile: "",
            emFax:"",
            emStatus:0,
            roleIdsWF:[],
            roleIdsData:[],
            roleIdsFunction:[],
            emRemark:""
        };
    },
    /**
     * @name: 获取用户详情
     * @param {type} 
     * @return: 
     * @other: 
     */
    getUserDetail: function() {
      if(!this.params.emId) { 
        this.initDataBind();
        return;
      }
      this.loadingForm=true;
      fetchUserDetail(this.params.emId).then(response => {
        this.loadingForm=false; 
        this.dataBind=this.handleUserDetail(response.data);
      }).catch(error => {
        this.loadingForm=false;
        this.$notify.error({ title: "获取详情",message: error,duration: 2000 });
      });
    },
    /**
     * @name: 处理用户详情数据
     * @param {type} 
     * @return: 
     * @other: 
     */
    handleUserDetail: function(user) {
      let dataBind={
        ...user,
        roleIdsFunction: [],//功能角色 id List
        roleIdsWF: [],//流程角色 id List
        roleIdsData: [],//数据角色 id List
      };
      if(user.roleIdList&&user.roleIdList.length>0) {
        let roleIdsFunction=[];
        let roleIdsWF=[];
        let roleIdsData=[];
        user.roleIdList.forEach(rId => {
          const indexFunction=this.roleOptionsFunction.findIndex(c => c.rId==rId)
          const indexWF=this.roleOptionsWF.findIndex(c => c.rId==rId)
          const indexData=this.roleOptionsData.findIndex(c => c.rId==rId)
          if(indexFunction>- 1) {
            roleIdsFunction.push(rId);
          } else if(indexWF>-1) {
            roleIdsWF.push(rId);
          } else if(indexData>-1) {
            roleIdsData.push(rId);
          }
        });

        dataBind.roleIdsFunction=roleIdsFunction;
        dataBind.roleIdsWF=roleIdsWF;
        dataBind.roleIdsData=roleIdsData;
      }
      return dataBind;
    },
    handleClose() {
      this.$emit("update:visible",false);
      this.$refs["dataForm"].clearValidate();
    },
    /**
     * @name: 处理保存参数
     * @param {type} 
     * @return: 
     * @other: 
     */
    handleParams: function() {
      return {
        ...this.dataBind,
        roleIdList: this.dataBind.roleIdsFunction.concat(this.dataBind.roleIdsWF,this.dataBind.roleIdsData),
      }
    },
    /**
     * @name: 新增 更新操作
     * @param {type} 
     * @return: 
     * @other: 
     */
    handleSave() {
      this.$refs["dataForm"].validate(valid => {
        if(valid) {
          let params=this.handleParams(); 
          this.loadingSave = true;
          saveOrUpdateUser(params).then(response => {
            this.loadingSave = false;
            this.$notify({ title: '成功',message: "操作成功",type: 'success',duration: 2000 })
            this.handleClose();
            this.$emit("save",params);
          }).catch(error => {
            this.loadingSave = false;
            this.$notify.error({ title: '失败',message: error,duration: 2000 })
          });
        }
      });
    },
    /**
     * @name: 获取部门下拉列表
     * @param {type} 
     * @return: 
     * @other: 
     */
    getDepartmentList: function() {
      fetchDepartmentList().then(response => {
        this.departData=response.data;
      });
    },
    /**
     * @name: 获取角色信息 流程角色 数据角色 功能角色
     * @param {type} 
     * @return: 
     * @other: 
     */
    getRoleList: function() {
      // 数据角色
      fetchRoleListData().then(response => {
        this.roleOptionsData=response.data
      }).catch(error => {
        this.$notify.error({ title: '失败',message: error,duration: 2000 })
      });
      // 功能角色
      fetchRoleListFunction().then(response => {
        this.roleOptionsFunction=response.data
      }).catch(error => {
        this.$notify.error({ title: '失败',message: error,duration: 2000 })
      });
      // 流程角色
      fetchRoleListWF().then(response => {
        this.roleOptionsWF=response.data
      }).catch(error => {
        this.$notify.error({ title: '失败',message: error,duration: 2000 })
      });
    }
  }
};
</script>
<style>
.userEditDialog {
  width: 700px; 
}
</style>
<style scoped>
.form-input-line {
  width: 500px;
}
</style> --> 