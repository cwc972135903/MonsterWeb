<!--
 * @Descripttion: 部门列表
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-01 16:59:26
 * @LastEditors  : wenchao.chai
 * @LastEditTime : 2020-02-03 14:58:36
 -->
<!--
<template>
  <div class="app-container"   v-el-resize="{name:'contentSizeChange'}">
    <Table-Header>
      <el-button v-waves type="default" icon="el-icon-plus" @click="handleCreate" size="mini">{{ $t('table.add') }}</el-button>
      <el-button v-waves type="default" icon="el-icon-edit" @click="handleUpdate" size="mini">{{ $t('table.edit') }}</el-button>
      <el-button v-waves type="default" icon="el-icon-delete" @click="handleDelete" size="mini">{{ $t('table.delete') }}</el-button>
    </Table-Header>
    <el-table ref="tableList" v-loading="listLoading" :data="list" @row-click="rowClick" border fit highlight-current-row style="width: 100%;" :height="tableHeight"  row-key="sdId">
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="部门名称" align="left" width="350" header-align="center" show-overflow-tooltip="">
        <template slot-scope="scope">
          <span>{{ scope.row.sdName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="英文名称" align="left" width="150" header-align="center" show-overflow-tooltip="">
        <template slot-scope="scope">
          <span>{{ scope.row.sdNameEn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门编码" align="left" width="150" header-align="center" show-overflow-tooltip="">
        <template slot-scope="scope">
          <span>{{ scope.row.sdCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级部门" align="left" width="150" header-align="center" show-overflow-tooltip="">
        <template slot-scope="scope">
          <span>{{ scope.row.parentName }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="排序" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.sdIndex }}</span>
        </template>
      </el-table-column>
    </el-table>
    <DepartmentEdit ref="departmentRef" :visible.sync="editObj.visible" :params="editObj.params" @save="saveCallback"></DepartmentEdit>
  </div>
</template>

<script>  
import { fetchDepartmentList, deleteDepartment } from "@/api/sys";
import waves from "@/directive/waves"; // Waves directive 加上这个点击有水波纹
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination 
import TableHeader from "@/components/TableHeader"; 
import DepartmentEdit from '@/views/sys/department/departmentEdit' 

import elResize from "@/directive/el-doresize";

export default {
  name: "DepartmentList",
  components: { Pagination,TableHeader, DepartmentEdit },
  directives: { waves,elResize },
  filters: {  
  },
  props: {
    layoutHeight: {
      default: () => {
        return -1;
      }
    }
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
        return this.baseHeight-130;
      }
    }
  },
  data() {
    return {
      clientHeight:window.document.documentElement.clientHeight,
      //========================================列表查询==================================
      list: [],//组件列表  
      listLoading: false,
      currentRow:null,
      //========================================新增编辑相关===============================
      editObj: {
        visible: false, //新增编辑组件 visible
        params: {//固定的编辑页面表单数据 
        }
      }
    };
  },
  created() {
  },
  /** 
   * @name: 3.在mounted中初始化数据
   */
  mounted() {
    this.initData();
  },
  /** 
   * @name: 4.在watch中监听高度的变化
   */
  watch: {

  },
  methods: {
    initData() {
      this.getList();
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
     * @name: 获取列表  
     */
    getList() {
      this.currentRow=null;
      this.listLoading=true;
      fetchDepartmentList().then(response => {
        this.list=response.data;
        if (this.$refs.departmentRef) {
           this.$refs.departmentRef.initData();
        }  
        this.listLoading=false;
      }).catch(error => {
        this.listLoading=false;
        this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      });;
    },
    rowClick:function(row, column, event){
        this.currentRow = row;
    },
    //====================================edit===================================================
    /**
     * @name: 新增
     * @param {type} 
     * @return: 
     * @other: 没有参数就设置为空，不能不重置。
     */
    handleCreate() {
      let row = this.currentRow;
      if (row) {
        this.editObj.params= {
          sdParentId:row.sdId
        };
      }else{
        this.editObj.params= {};
      }  
      this.editObj.visible=true;
    },
    /**
     * @name: 更新
     * @param {type}  
     * @other:  需传对象，而非单个属性赋值
     */
    handleUpdate: function() { 
      let row = this.currentRow;
      if (!row) {
          this.$notify.warning({ title: "编辑",message: "请先选择一条记录",duration: 2000 });
          return;
      } 
      this.editObj.params= row;
      this.editObj.visible=true;
    },
    /**
     * @name: 保存callback 
     * @param {type} 
     * @return: 
     * @other:  新增后有guid返回，所以只能刷新页面，后台接口需修改. 
     */
    saveCallback: function(result) {
      this.getList();
    },
    handleDelete:function(){
      let row=this.currentRow;
      if(!row) {
        this.$notify.warning({ title: "删除",message: "请先选择一条记录",duration: 2000 });
        return;
      }
      this.$confirm('将删除记录本身及其子节点，确认删除?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(response => {
        deleteDepartment(row.sdId).then(response => {
          this.$notify({ title: '成功',message: "删除成功",type: 'success',duration: 2000 }) 
          this.getList(); 
        }).catch(error => {
          this.$notify.error({ title: "删除",message: error,duration: 2000 });
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
