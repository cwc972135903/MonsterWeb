<!--
 * @Descripttion: 菜单列表
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-06-25 14:25:25
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-06-28 10:45:00
 -->
<!--
<template>
  <div id="menuTableContainer" v-el-resize="{name:'contentSizeChange'}" class="app-container">
    <Table-Header title="菜单列表" iconClass="table">
      <el-button v-waves type="default" icon="el-icon-plus" size="mini" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves type="default" icon="el-icon-edit" size="mini" @click="handleUpdate">{{ $t('table.edit') }}</el-button>
      <el-button v-waves type="default" icon="el-icon-delete" size="mini" @click="handleDelete">{{ $t('table.delete') }}</el-button>
    </Table-Header>
    <el-table ref="tableList" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" :height="tableHeight" row-key="pk_menu_id" @row-click="rowClick">
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="国际化名称" align="left" width="200" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ $t(`route.${scope.row.meta_title}`) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原始名称" align="left" width="150" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.meta_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type | statusFilter">
            {{ scope.row.type | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="路径" align="left" show-overflow-tooltip width="250" header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组件路径" align="left" show-overflow-tooltip width="300" header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.component_path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限标识" align="left" header-align="center" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.meta_code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="配置菜单编码" align="left" header-align="center" width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.meta_component_code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="200" show-overflow-tooltip align="left" header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.sortindex }}</span>
        </template>
      </el-table-column>
    </el-table>
    <MenuEdit ref="menuEdit" :visible.sync="editObj.visible" :params="editObj.params" @save="saveCallback"></MenuEdit>
  </div>
</template>

<script>  
import { fetchMenuForList, deleteMenu } from "@/api/sys";
import waves from "@/directive/waves"; // Waves directive 加上这个点击有水波纹
import TableHeader from "@/components/TableHeader"; 
import MenuEdit from '@/views/sys/menu/edit' 

import elResize from "@/directive/el-doresize";

export default {
  name: "MenuList",
  components: { TableHeader, MenuEdit },
  directives: { waves,elResize },
  filters: { 
     statusFilter(type) {
      const statusMap = {
        '0': 'success',
        '1': 'info',
        '2': 'danger'
      }
      return statusMap[type]
    },
    typeFilter: function(type) {
        const statusMap = {
        '0': '目录',
        '1': '菜单',
        '2': '按钮'
      }
      return statusMap[type] 
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
        return this.baseHeight-170;
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
      fetchMenuForList().then(response => {
        this.list=response.data;
        if (this.$refs.menuEdit) {
          this.$refs.menuEdit.getParentMenuList();
        } 
        this.listLoading=false;
      }).catch(error => {
        this.listLoading=false;
        this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      });
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
      this.editObj.params= {};
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
        deleteMenu(row.pk_menu_id).then(response => {
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
