<!--
 * @Descripttion: 配置用户弹框
 * @version: v1.0.0
 * @Author: chunhui.qin
 * @Date: 2020-04-08 16:37:58
 * @LastEditors: chunhui.qin
 * @LastEditTime: 2020-04-15 17:08:04
 -->
 <!--
<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" title="配置用户" :visible.sync="visible" :before-close="handleClose"
      custom-class="editDialogSelectDepartment">
      <el-button v-if="loading" :loading="loading" type="text">加载数据</el-button>
      <div v-if="!loading && list.length > 0" style="height:400px;overflow-y: auto;">
        <el-tree ref="userAndDepartMentTree" show-checkbox :data="list" node-key="id" :default-checked-keys="checkedKeys" :props="treeProps"
          :highlight-current="true">
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
import { deepCopy } from "@/utils/arrayHelper";
import { fetchDepartmentAndUserTree, saveRoleUser } from "@/api/sys";
import { buildTreeData } from "@/utils/arrayHelper";
export default {
  name: "UserConfig",
  components: {},
  directives: { elDragDialog },
  props: {
    visible: {  //当前dialog的显示标识 勿修改 
      default: () => {
        return false;
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    params: {//表单参数 
      type: Object
    }
  },
  data() {
    return {
      list: [],
      loading: false,//获取数据 loading 
      loadingSave: false,//保存 loading
      dataBind: {},
      treeProps: {
        children: 'children',
        label: 'label'
      },
      checkedKeys: [],//选中得用户节点
    };
  },
  watch: {
    params(newVal, oldVal) {
      let copy = {
        roleId: ""
      };
      if (newVal && JSON.stringify(newVal) != "{}") {
        copy = deepCopy(Object.assign({}, copy, newVal));
      }
      this.dataBind = Object.assign({}, this.dataBind, copy);
      this.initData();
    }
  },
  mounted() {

  },
  methods: {
    initData: function () {
      this.getDepartmentAndUserTree();
    },
    getDepartmentAndUserTree() {
      this.loading = true;
      fetchDepartmentAndUserTree(this.dataBind.roleId).then(response => {
        this.loading = false;
        let data = response.data;
        if (data != null && data.length > 0) {
          let selectItem = data.filter(i => { return i.isSelect });
          let keys = selectItem.map(j => j.id);
          this.list = buildTreeData(data, "id", "pId", "name");
          this.checkedKeys = keys;
        }
      }).catch(error => {
        this.loading = false;
        this.$notify.error({ title: "获取用户", message: error, duration: 2000 });
      });
    },
    /**
     * 保存
     */
    handleSave() {
      let userId = this.$refs['userAndDepartMentTree'].getCheckedKeys();
      this.loadingSave = true;
      let param = { roleId: this.dataBind.roleId, userIds: userId }
      saveRoleUser(param).then(response => {
        this.loadingSave = false;
        this.$notify({ title: '成功', message: "操作成功", type: 'success', duration: 2000 })
        this.handleClose();
      }).catch(error => {
        this.loadingSave = false;
        this.$notify.error({ title: "保存", message: error, duration: 2000 });
      });
    },
    handleClose() {
      if (this.visible) {
        this.$emit("update:visible", false);
      }
    },
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