<!--
 * @Descripttion: 部门选择
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-02 14:12:25
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-04 17:55:15
 -->
<!--
<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" title="组织机构" :visible.sync="visible" :before-close="handleClose" custom-class="editDialogSelectDepartment">
      <el-button v-if="loading" :loading="loading" type="text">加载组织机构</el-button>
      <!-- <el-button type="text" @click="test">test</el-button> --><!--
      <div v-if="!loading && list.length > 0" style="height:400px;overflow-y: auto;">
        <el-tree ref="tree" show-checkbox :data="list" node-key="id" :default-expanded-keys="expandedKeys" :highlight-current="true">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('table.cancel') }}</el-button>
        <el-button @click="handleSave" type="primary" :loading="loadingSave">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽
import { menuTypeList } from "@/utils/enum";
import { fetchDepartmentList,fetchRoleDetail, saveRoleDepartmentMap } from "@/api/sys";

export default {
  name: "SelectDepartment",
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
    }
  },
  watch: {
    params(newVal,oldVal) {
      //1 query request
      this.getRoleDetail();
    }
  },
  data() {
    return {
      list: [],
      loading: false,//获取数据 loading 
      loadingSave:false,//保存 loading
      menuTypeList: menuTypeList, 
      expandedKeys: [],//展开节点id list
    };
  },
  created() {
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData: function() {
      this.getList();
    },
    /**
    * @name: 获取列表 
    */
    getList: function() {
      this.loading=true;
      fetchDepartmentList().then(response => {
        this.loading=false;
        this.list=response.data;
      }).catch(error => {
        this.loading=false;
        this.$notify.error({ title: "获取组织机构",message: error,duration: 2000 });
      });
    },
   /**
     * @name: 获取角色详情
     * @param {type} 
     * @return: 
     * @other: 
     */
    getRoleDetail: function() { 
      if(!this.params.rId) {  
        return;
      } 
      fetchRoleDetail(this.params.rId).then(response => {  
        let keys = response.data.deptIdList; 
        this.expandedKeys = keys;
        this.$refs.tree.setCheckedKeys(keys);
      }).catch(error => { 
        this.$notify.error({ title: "获取角色详情",message: error,duration: 2000 });
      });
    },  
    handleClose() {
      if(this.visible) {
        this.$emit("update:visible",false);
      }
    },
    handleSave() {
      let departmentIds = this.$refs['tree'].getCheckedKeys(); 
      this.loadingSave = true;
      saveRoleDepartmentMap(departmentIds,this.params.rId).then(response=>{
          this.loadingSave = false;
          this.$notify({ title: '成功',message: "操作成功",type: 'success',duration: 2000 })
          this.handleClose();
          this.$emit("save");
      }).catch(error=>{
          this.loadingSave = false;
          this.$notify.error({ title: "保存",message: error,duration: 2000 });
      }); 
    },
    test:function(){
      debugger 
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
.editDialogSelectDepartment {
  width: 800px;
}
</style>