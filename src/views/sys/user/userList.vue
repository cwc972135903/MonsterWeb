<!--
 * @Descripttion: 角色列表
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-04-03 14:24:05
 * @LastEditors: mengmeng.jiang
 * @LastEditTime: 2020-10-14 16:22:19
 -->
<!--
<template>
  <div v-el-resize="{name:'contentSizeChange'}" class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.emUsername" class="filter-item" placeholder="用户名称" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.emAccount" class="filter-item" placeholder="用户账号" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <SelectTree v-model="listQuery.emDeptId" class="filter-item" :data="departData" placeholder="部门选择"></SelectTree>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div> 
    <Table-Header>
      <el-button v-waves type="default" icon="el-icon-plus" size="mini" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves type="default" icon="el-icon-delete" size="mini" @click="handleDelete">{{ $t('table.delete') }}</el-button>
      <el-button v-waves type="default" icon="el-icon-refresh" size="mini" @click="handleResetPwd">重置密码</el-button>
    </Table-Header>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" :height="tableHeight" @row-click="rowClick">
      <el-table-column fixed :label="$t('table.id')" type="index" align="center" width="50" :index="indexMethod"></el-table-column>
      <el-table-column fixed :label="$t('table.actions')" header-align="center" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            {{ $t('table.edit') }}
          </el-button>  
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" align="center" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.emUsername }} 
        </template>
      </el-table-column>
      <el-table-column label="用户账号" align="center" header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.emAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号状态" align="center" header-align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.emStatus | statusFilter">{{ scope.row.emStatus | statusContentFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="邮件地址" align="center" show-overflow-tooltip header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.emEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" align="center" header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.emMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门" align="center" header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deptName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" show-overflow-tooltip header-align="center" min-width="100%">
        <template slot-scope="scope">
          <span>{{ scope.row.emCreatdate | creatdateFilter }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />

    <userEdit :visible.sync="userEditObj.visible" :params="userEditObj.params" @save="saveUserCallback" />
</div>
</template>

<script>
import { fetchUserList,fetchDepartmentList,deleteUser, resetUserPwd } from "@/api/user";
import waves from "@/directive/waves"; // Waves directive 加上这个点击有水波纹
import elResize from "@/directive/el-doresize";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import SelectTree from "@/components/SelectTree";
import userEdit from "@/views/sys/user/userEdit"
import TableHeader from "@/components/TableHeader";

export default {
  name: "UserList",
  components: { Pagination,SelectTree,userEdit,TableHeader },
  directives: { waves,elResize },
  filters: {//filters可以理解为formatter
    statusFilter(status) {
      const statusMap={
        0: "success",
        1: "danger",
        2: "info"
      };
      return statusMap[status];
    },
    statusContentFilter: function(status) {
      const statusMap={
        0: "正常",
        1: "注销",
        2: "冻结"
      };
      return statusMap[status];
    }
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
      clientHeight:window.document.documentElement.clientHeight,
      //========================================列表查询==================================
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {//page params 
        emUsername: "",
        emDeptId: "",
        emAccount:"",
        pagesize: 20,
        pagenum: 1
      },
      currentRow:null,
      //========================================查询控件数据===============================
      departData: [],//部门下拉列表 
      //========================================新增编辑相关===============================
      userEditObj: {
        visible: false, //新增编辑组件 visible
        params: {//固定的编辑页面表单数据 
        }
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
    baseHeight:{
      get:function(){
          let height; 
          if (this.layoutHeight == -1){
              height = this.clientHeight
          }else{
              height = this.layoutHeight + this.$store.getters.marginHeightTopMainContent;
          }
          return height;
      }
    },
    tableHeight: {
      get: function() { 
        return this.baseHeight-210;
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
      this.getDepartmentList();//获取部门下拉列表
      this.getList();//获取用户列表
    },
    /**
    * @name: 监听client size change
    * @param {type} 
    * @return: 
    * @other: 
    */
    contentSizeChange: function(domWidth,domHeight,windowClientWidth,windowClientHeight) {
      this.clientHeight=windowClientHeight; 
    },
    /**
     * @name: 索引
     */
    indexMethod(index) {
      return this.listQuery.pagesize*(this.listQuery.pagenum-1)+index+1;
    },
    /**
     * @name: 处理请求参数  
     */
    handleParams: function() {
      return {
        ...this.listQuery,
        sortname: "emCreatdate",
        ordername: "desc"
      };
    },
    /**
     * @name: 获取用户列表  
     */
    getList() {
      this.listLoading=true;
      let query=this.handleParams();
      fetchUserList(query).then(response => {
        this.listLoading=false;
        this.list=response.data.list;
        this.total=response.data.totalCount; 
      }).catch(error=>{
        this.listLoading=false;
         this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      });
    },
    /**
     * @name: 获取部门下拉列表 
     */
    getDepartmentList: function() {
      fetchDepartmentList().then(response => {
        this.departData=response.data;
      });
    },
    /**
     * @name: 搜索
     */
    handleFilter() {
      this.listQuery.pagenum=1;
      this.getList();
    },
    /**
     * @name: 新增
     * @param {type} 
     * @return: 
     * @other: 没有参数就设置为空，不能不重置。
     */
    handleCreate() {
      this.userEditObj.params={};
      this.userEditObj.visible=true;
    },
    /**
     * @name: 更新
     * @param {type}  
     * @other:  需传对象，而非单个属性赋值
     */
    handleUpdate: function(row) {
      this.userEditObj.params=row;
      this.userEditObj.visible=true;
    },
    /**
     * @name: 保存callback 
     * @param {type} 
     * @return: 
     * @other:   
     */
    saveUserCallback: function(result) { 
      this.currentRow=null;
      this.getList();
    },
    rowClick: function(row,column,event) {
      this.currentRow=row;
    },
    /**
     * @name: 获取当前选中行
     * @param {type} 
     * @return: 
     * @other: 
     */
    getCurrentRow:function(){
      let row=this.currentRow;
      if(!row) {
        this.$notify.warning({ title: "选中行",message: "请先选择一条记录",duration: 2000 });
        return false;
      }else{
        return row;
      }
    },
     /**
     * @name: 删除操作
     * @param {type} 
     * @return: 
     * @other: 
     */
    handleDelete: function() { 
      let row= this.getCurrentRow();
      if (!row) {
        return;
      }
      this.$confirm('确认删除?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(response => {
        deleteUser(row.emId).then(response => {
          this.$notify({ title: '成功',message: "删除成功",type: 'success',duration: 2000 }) 
          this.getList();
          this.currentRow=null;
        }).catch(error => {
          this.$notify.error({ title: "删除",message: error,duration: 2000 });
        });
      }).catch(() => { });
    },
    /**
     * @name: 重置密码
     * @param {type} 
     * @return: 
     * @other: 
     */
    handleResetPwd:function(){
      let row= this.getCurrentRow();
      if (!row) {
        return;
      }
      this.$confirm('确认重置?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(response => {
          resetUserPwd(row.emId).then(response=>{
              this.$notify({ title: '成功',message: response.msg,type: 'success',duration: 2000 }) 
          }).catch(error=>{
              this.$notify.error({ title: "重置密码",message: error,duration: 2000 });
          });
      }).catch(() => { });
    }
  }
};
</script>


<style scoped>
.app-container {
  padding-bottom: 0px;
}
</style>
 -->