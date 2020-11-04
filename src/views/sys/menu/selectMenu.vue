<!--
 * @Descripttion: 菜单选择
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-02 10:32:15
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-04 17:54:41
 -->
<!--
<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" title="功能菜单" :visible.sync="visible" :before-close="handleClose" custom-class="editDialogSelectMenu">
      <el-button v-if="loading" :loading="loading" type="text">加载菜单</el-button>
      <div v-if="!loading && list.length > 0" style="height:400px;overflow-y: auto;">
        <el-tree ref="tree" :render-content="renderContent" show-checkbox :check-strictly="disable1" :data="list" node-key="id" :default-expanded-keys="expandedKeys" :highlight-current="true">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="loadingSave" @click="handleSave">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽
import { menuTypeList } from "@/utils/enum";
import { fetchMenuForList,fetchRoleMenuMap,saveOrUpdateMenuRoleMap } from "@/api/sys";

export default {
  name: "SelectMenu",
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
      default: ()=>{
        return {}
      }
    }
  },
  data() {
    return {
      list: [],
      loading: false,//获取数据 loading 
      loadingSave: false,//保存 loading
      menuTypeList: menuTypeList,
      expandedKeys: [],//展开节点id list
      disable1:true,
    };
  },
  watch: {
    params(newVal,oldVal) {
      //1 query request
      this.getRoleMenuMap();
    }
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
      fetchMenuForList().then(response => {
        this.loading=false;
        this.list=response.data;
      }).catch(error => {
        this.loading=false;
        this.$notify.error({ title: "获取菜单",message: error,duration: 2000 });
      });
    },
    /**
     * @name: 获取角色菜单权限关联数据
     * @param {type} 
     * @return: 
     * @other: 
     */
    getRoleMenuMap: function() {
      if(!this.params.rId) {
        return;
      }
      fetchRoleMenuMap(this.params.rId).then(response => {
        // let keys=response.data.filter(c => c.type!="0").map(c => c.pk_menu_id);
        let keys=response.data.map(c => c.pk_menu_id);
        this.expandedKeys=keys;
        this.$refs.tree.setCheckedKeys(keys);
      }).catch(error => {
        this.$notify.error({ title: "获取菜单角色关联信息",message: error,duration: 2000 });
      });
    },
    /**
     * @name: 自定义tree label显示内容 这里是为了国际化
     * @param {type} 
     * @return: 
     * @other: 
     */
    renderContent(h,{ node,data,store }) {
      const statusMap={
        '0': 'success',
        '1': 'info',
        '2': 'danger'
      }
      const labelMap={
        '0': '目录',
        '1': '菜单',
        '2': '按钮'
      }
      return (
        <span>
          <span>{this.$te(`route.${node.label}`)? this.$t(`route.${node.label}`):node.label}</span>
          <span>    </span>
          <span>    </span>
          <el-tag type={statusMap[data.type]}>
            {labelMap[data.type]}
          </el-tag>
        </span>);
    },
    handleClose() {
      if(this.visible) {
        this.$emit("update:visible",false);
      }
    },
    handleSave() {
      // let menuIds=this.$refs['tree'].getCheckedKeys();
      let nodes = this.$refs['tree'].getCheckedNodes(false, true); 
      let menuIds = nodes.map(c=>c.id);
      this.loadingSave=true;
      saveOrUpdateMenuRoleMap({
        menuIds: menuIds,
        roleId: this.params.rId
      }).then(response => {
        this.loadingSave=false;
        this.$notify({ title: '成功',message: "菜单保存成功",type: 'success',duration: 2000 })
        this.handleClose();
        this.$emit("save");
      }).catch(error => {
        this.loadingSave=false;
        this.$notify.error({ title: "保存",message: error,duration: 2000 });
      });
    },
    test: function() {
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
.editDialogSelectMenu {
  width: 800px;
}
</style>