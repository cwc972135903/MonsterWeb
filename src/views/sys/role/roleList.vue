<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:15
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-11-04 17:54:20
 -->
<!--
<template>
  <div v-el-resize="{name:'contentSizeChange'}" class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.rName" placeholder="角色名称" style="width: 200px;" class="filter-item" />
      <el-select v-model="listQuery.roleType" class="filter-item" clearable placeholder="角色类型">
        <el-option v-for="item in roleTypeOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <Table-Header>
      <el-button v-waves class="filter-item" type="default" icon="el-icon-plus" size="mini" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves type="default" icon="el-icon-delete" size="mini" @click="handleDelete">{{ $t('table.delete') }}</el-button>
      <el-button v-waves type="default" icon="el-icon-menu" size="mini" @click="handleConfigMenu">菜单权限</el-button>
      <el-button v-waves type="default" icon="el-icon-menu" size="mini" @click="handleConfigDepartment">数据权限</el-button>
      <el-button v-waves type="default" icon="el-icon-menu" size="mini" @click="handleConfigUser">配置用户</el-button>
    </Table-Header>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" :height="tableHeight" @row-click="rowClick">
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50" :index="indexMethod"></el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            {{ $t('table.edit') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="left" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span> {{ scope.row.rName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色编码" align="left" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.rCode }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="是否为管理员" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rFlag == "0"?"否":"是" }}</span>
        </template>
      </el-table-column> --><!--
      <el-table-column label="角色状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.rStatus | statusFilter">{{ scope.row.rStatus | statusContentFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleType | roleTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.rRemark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.rCreatdate | creatdateFilter }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    <roleEdit :visible.sync="roleEditObj.visible" :params="roleEditObj.params" @save="saveRoleCallback" />
    <selectMenu :visible.sync="selectMenuEditObj.visible" :params="selectMenuEditObj.params" @save="saveMenuCallback" />
    <userConfig :visible.sync="userConfig.visible" :params="userConfig.params" />
    <selectDepartment :visible.sync="selectDepartmentEditObj.visible" :params="selectDepartmentEditObj.params" @save="saveDepartmentCallback" />
  </div>
</template>

<script>
import { fetchRoleList, deleteRole } from "@/api/sys";
import waves from "@/directive/waves"; // Waves directive 加上这个点击有水波纹
import elResize from "@/directive/el-doresize";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import roleEdit from "@/views/sys/role/roleEdit"
import TableHeader from "@/components/TableHeader";
import { roleTypeOptions } from "@/utils/enum";
import selectMenu from "@/views/sys/menu/selectMenu";
import selectDepartment from "@/views/sys/department/selectDepartment";
import userConfig from "@/views/sys/role/userConfig";

export default {
  name: "RoleList",
  components: { Pagination, roleEdit, TableHeader, selectMenu, selectDepartment, userConfig },
  directives: { waves, elResize },
  filters: {//filters可以理解为formatter
    statusFilter(status) {
      const statusMap = {
        0: "danger",
        1: "success",
      };
      return statusMap[status];
    },
    statusContentFilter: function (status) {
      const statusMap = {
        0: "禁用",
        1: "启用"
      };
      return statusMap[status];
    },
    roleTypeFilter: function (type) {
      const statusMap = {
        0: "功能角色",
        1: "流程角色",
        2: "数据角色"
      };
      return statusMap[type];
    },
  },
  props: {
    layoutHeight: {
      default: () => {
        return -1;
      }
    }
  },
  data() {
    return {
      clientHeight: window.document.documentElement.clientHeight,
      //========================================列表查询==================================
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {//page params 
        rName: "",
        roleType: "",
        pagesize: 20,
        pagenum: 1
      },
      currentRow: null,
      //========================================查询控件数据===============================
      roleTypeOptions: roleTypeOptions,
      //========================================新增编辑相关===============================
      roleEditObj: {
        visible: false, //新增编辑组件 visible
        params: {//固定的编辑页面表单数据 
        }
      },
      //========================================菜单权限相关===============================
      selectMenuEditObj: {
        visible: false, //新增编辑组件 visible
        params: {//固定的编辑页面表单数据 
        }
      },
      //========================================部门相关===============================
      selectDepartmentEditObj: {
        visible: false, //新增编辑组件 visible
        params: {//固定的编辑页面表单数据 
        }
      },
      //配置用户
      userConfig: {
        visible: false,
        params: {}
      }
    };
  },
  computed: {
    /**
     * @name: 通用计算属性 返回当前页面的基础高度
     * @param {type} 
     * @return: 
     * @other: 
     */
    baseHeight: {
      get: function () {
        let height;
        if (this.layoutHeight == -1) {
          height = this.clientHeight
        } else {
          height = this.layoutHeight + this.$store.getters.marginHeightTopMainContent;
        }
        return height;
      }
    },
    tableHeight: {
      get: function () {
        return this.baseHeight - 210;
      }
    }
  },
  /** 
   * @name: 4.在watch中监听高度的变化
   */
  watch: {

  },
  created() {
  },
  /** 
   * @name: 3.在mounted中初始化数据
   */
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getList();//获取列表
    },
    /**
    * @name: 监听client size change
    * @param {type} 
    * @return: 
    * @other: 
    */
    contentSizeChange: function (domWidth, domHeight, windowClientWidth, windowClientHeight) {
      this.clientHeight = windowClientHeight;
    },
    /**
     * @name: 索引
     */
    indexMethod(index) {
      return this.listQuery.pagesize * (this.listQuery.pagenum - 1) + index + 1;
    },
    /**
     * @name: 处理请求参数  
     */
    handleParams: function () {
      let params = {
        rName: this.listQuery.rName,
        pagesize: this.listQuery.pagesize,
        pagenum: this.listQuery.pagenum,
        sortname: "rCreatdate",
        ordername: "desc"
      };
      if (this.listQuery.roleType || this.listQuery.roleType === 0) {
        params["roleType"] = this.listQuery.roleType
      }
      return params;
    },
    /**
     * @name: 获取列表  
     */
    getList() {
      this.listLoading = true;
      let query = this.handleParams();
      fetchRoleList(query).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.totalCount;
      }).catch(error => {
        this.listLoading = false;
        this.$notify.error({ title: "获取列表", message: error, duration: 2000 });
      });
    },
    /**
     * @name: 搜索
     */
    handleFilter() {
      this.listQuery.pagenum = 1;
      this.getList();
    },
    /**
     * @name: 新增
     * @param {type} 
     * @return: 
     * @other: 没有参数就设置为空，不能不重置。
     */
    handleCreate() {
      this.roleEditObj.params = {};
      this.roleEditObj.visible = true;
    },
    /**
     * @name: 更新
     * @param {type}  
     * @other:  需传对象，而非单个属性赋值
     */
    handleUpdate: function (row) {
      this.roleEditObj.params = row;
      this.roleEditObj.visible = true;
    },
    /**
     * @name: 保存callback 
     * @param {type} 
     * @return: 
     * @other:   
     */
    saveRoleCallback: function (result) {
      this.getList();
    },
    rowClick: function (row, column, event) {
      this.currentRow = row;
    },
    /**
     * @name: 获取当前选中行
     * @param {type} 
     * @return: 
     * @other: 
     */
    getCurrentRow: function () {
      let row = this.currentRow;
      if (!row) {
        this.$notify.warning({ title: "选中行", message: "请先选择一条记录", duration: 2000 });
        return false;
      } else {
        return row;
      }
    },
    /**
    * @name: 删除操作
    * @param {type} 
    * @return: 
    * @other: 
    */
    handleDelete: function () {
      let row = this.getCurrentRow();
      if (!row) {
        return;
      }
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(response => {
        deleteRole(row.rId).then(response => {
          this.$notify({ title: '成功', message: "删除成功", type: 'success', duration: 2000 })
          this.getList();
        }).catch(error => {
          this.$notify.error({ title: "删除", message: error, duration: 2000 });
        });
      }).catch(() => { });
    },
    /**
     * @name: 菜单权限 配置
     * @param {type} 
     * @return: 
     * @other: 
     */
    handleConfigMenu: function () {
      let row = this.getCurrentRow();
      if (!row) {
        return;
      }
      if (row.roleType != 0) {
        this.$notify.warning({ title: "选中行", message: "只有功能角色能分配菜单", duration: 2000 });
        return;
      }
      this.selectMenuEditObj.params = row;
      this.selectMenuEditObj.visible = true;
    },
    saveMenuCallback: function () { },
    /**
    * @name: 数据(部门) 配置
    * @param {type} 
    * @return: 
    * @other: 
    */
    handleConfigDepartment: function () {
      let row = this.getCurrentRow();
      if (!row) {
        return;
      }
      if (row.roleType != 2) {
        this.$notify.warning({ title: "选中行", message: "只有数据角色能分配菜单", duration: 2000 });
        return;
      }
      this.selectDepartmentEditObj.params = row;
      this.selectDepartmentEditObj.visible = true;
    },
    /**
     * 配置用户
     */
    handleConfigUser() {
      let row = this.getCurrentRow();
      if (!row) {
        return;
      }
      this.userConfig.visible = true;
      this.userConfig.params = { roleId: row.rId }
    },
    saveDepartmentCallback: function () { }
  }
};
</script>


<style scoped>
.app-container {
  padding-bottom: 0px;
}
</style>
