<!--
 * @Descripttion: 普通的curd page demo
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-06-10 16:08:06
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-11-05 17:31:25
 -->

<template>
  <div v-el-resize="{name:'contentSizeChange'}" class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.componentName" title="组件名称" placeholder="组件名称" class="form-input-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.componentTypeId" title="组件类型" placeholder="组件类型" class="form-input-item" clearable>
        <el-option v-for="item in componentTypeOptions" :key="item.componentTypeId" :label="item.componentType" :value="item.componentTypeId">
        </el-option>
      </el-select>
      <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div> 
    <Table-Header title="列表" iconClass="table">
      <el-button v-waves type="default" icon="el-icon-plus" size="mini" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves type="default" icon="el-icon-delete" size="mini" @click="handleDelete">{{ $t('table.delete') }}</el-button>
    </Table-Header>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" :height="tableHeight" @row-click="rowClick">
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50" :index="indexMethod"></el-table-column>
      <el-table-column :label="$t('table.actions')" header-align="center" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            {{ $t('table.edit') }}
          </el-button>
        </template>
      </el-table-column> 
      <el-table-column label="组件名称" header-align="center" align="left" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.componentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组件编码" header-align="center" align="left" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.componentCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="自定义组件编码" header-align="center" align="left" width="250" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.componentMetaCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径" align="left" header-align="center" show-overflow-tooltip width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宽度" align="center" header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.width }}</span>
        </template>
      </el-table-column>
      <el-table-column label="高度" align="center" header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.height | heightFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" header-align="center" align="center" :formatter="formatType" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="创建时间" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate | creatdateFilter }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    <componentEdit :visible.sync="editObj.visible" :params="editObj.params" @save="saveCallback"></componentEdit>
  </div>
</template>

<script> 
// import { fetchComponentList,fetchComponentType } from "@/api/layoutServer";
import waves from "@/directive/waves"; 
import elResize from "@/directive/el-doresize";
import Pagination from "@/components/Pagination";  
import TableHeader from "@/components/TableHeader";
import componentEdit from "@/views/demo/normal/edit"
import { deleteApi } from "@/api/demo/demo";

export default {
  name: "NormalList",
  components: { Pagination,TableHeader,componentEdit },
  directives: { waves,elResize },
  filters: {//filters可以理解为formatter 
    heightFilter:function(val){
        return val+"px";
    }
  },
  props: {
    layoutHeight: {
      default: () => {
        return -1;
      }
    },
     /**
     * @name:当前是否处于布局页面配置中 
     * @param {type} 
     * @return: 
     * @other: 
     */
    inLayoutSetting: {
      default: () => {
        return false;
      }
    },
  },
  data() {
    return {
      clientHeight:window.document.documentElement.clientHeight,
      //========================================列表查询==================================
      list: [],//列表 
      total: 0,
      listLoading: false,
      listQuery: {//page params  
        pagesize: 20,
        pagenum: 1,
        componentName: "",//组件名称
        componentTypeId: ""//组件类型
      },
      currentRow: null,//当前选中行
      //========================================查询控件数据===============================
      componentTypeOptions: [],//组件类型列表
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
        return this.baseHeight-230;
      }
    }
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
      this.getComponentType();
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
        ...this.listQuery
      };
    },
    /**
     * @name: 获取列表  
     */
    getList() {
      this.listLoading=true;
      let query=this.handleParams();
      // fetchComponentList(query).then(response => {
      //   this.listLoading=false;
      //   this.list=response.data.list;
      //   this.total=response.data.totalCount; 
      //   this.currentRow=null;
      // }).catch(error => {
      //   this.listLoading=false;
      //   this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      // });
        this.listLoading=false;
        this.list=[];
        this.total=0; 
    },
    /**
     * @name: 获取组件类型列表 
     */
    getComponentType: function() {
      // fetchComponentType().then(response => {
      //   this.componentTypeOptions=response.data;
      // }).catch(error => {
      //   this.$notify.error({ title: "获取类型",message: error,duration: 2000 });
      // });
       this.componentTypeOption = [];
    },
    /**
     * @name: 自定义type formatter
     */
    formatType: function(row,column,cellValue,index) {
      let typeName="";
      if(row.componentTypeId) {
        let typeList=this.componentTypeOptions.filter(t => t.componentTypeId==row.componentTypeId);
        if(typeList&&typeList.length>0) {
          typeName=typeList[0].componentType;
        }
      }
      return typeName;
    },
    /**
     * @name: 搜索
     */
    handleFilter() {
      this.listQuery.pagenum=1;
      this.getList();
    },
    //====================================edit===================================================
    /**
     * @name: 新增
     * @param {type} 
     * @return: 
     * @other: 没有参数就设置为空，不能不重置。
     * 要强制触发params watch: 新增个随机属性  key: Math.random()
     */
    handleCreate() {
      this.editObj.params={ };
      this.editObj.visible=true;
    },
    /**
     * @name: 更新
     * @param {type}  
     * @other:  需传对象，而非单个属性赋值
     * 要强制触发params watch: 新增个随机属性  key: Math.random()
     */
    handleUpdate: function(row) {
      this.editObj.params={
        ...row
      }
      this.editObj.visible=true;
    },
    /**
     * @name: 保存callback 
     * @param {type} 
     * @return: 
     * @other:  
     * 新增后有guid返回，所以只能刷新页面，后台接口需修改.
     */
    saveCallback: function(result) {
      // 1 简单请求时 直接刷新页面
      //  this.getList();
      //2 列表请求复杂时，直接前端操作修改显示
      let targetIndex=this.list.findIndex(c => c.componentId==result.componentId);
      if(targetIndex>-1) {
        this.list[targetIndex]=result;
      } else {
        this.list.unshift(result);//插入到第一位 
      }
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
    getCurrentRow: function() {
      let row=this.currentRow;
      if(!row) {
        this.$notify.warning({ title: "选中行",message: "请先选择一条记录",duration: 2000 });
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
    handleDelete: function() {
      let row=this.getCurrentRow();
      if(!row) {
        return;
      }
      this.$confirm('确认删除选中行?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(response => {
        deleteApi(row.componentId).then(response => {
          this.$notify({ title: '成功',message: "删除成功",type: 'success',duration: 2000 })
          // 1 简单请求时 直接刷新页面
          //  this.getList();
          //2 列表请求复杂时，直接前端操作修改显示
          this.list=this.list.filter(c => c.componentId!=this.currentRow.componentId); 
          this.currentRow=null;
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
