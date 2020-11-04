<!--
 * @Descripttion: dialog 打开后请求获取数据列表跟表单
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-06-21 10:18:19
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-04 18:02:38
 -->

<template>
  <div v-el-resize="{name:'contentSizeChange'}" class="app-container">
    <Table-Header title="列表" iconClass="component">
    </Table-Header>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="公司名称" width="250px" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.O_NAME }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内部评级" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.B_GRADE2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评级展望" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.F_GRADE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评级生效日期" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.BEG_DATE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="示例" width="150px" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="showDialogList(scope.row)">dialog内请求列表</span>
        </template>
      </el-table-column>
      <el-table-column label="示例" width="150px" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="showDialogForm(scope.row)">dialog内请求表单</span>
        </template>
      </el-table-column>
    </el-table>
    <DialogEditList :visible.sync="editObjList.visible" :params="editObjList.params"></DialogEditList>
    <DialogEditForm :visible.sync="editObjForm.visible" :params="editObjForm.params"></DialogEditForm>
  </div>
</template>

<script>  
import waves from "@/directive/waves"; // Waves directive 加上这个点击有水波纹 
import TableHeader from "@/components/TableHeader";
import elResize from "@/directive/el-doresize";
// import { fetchSingleHistory } from "@/api/rating";
import DialogEditList from "@/views/demo/dialogRequest/editList";
import DialogEditForm from "@/views/demo/dialogRequest/editForm";
 

export default {
  name: "DialogList",
  components: { TableHeader,DialogEditList,DialogEditForm },
  directives: { waves,elResize },
  filters: {//filters可以理解为formatter 

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
      //========================================新增编辑相关===============================
      editObjList: {
        visible: false, //新增编辑组件 visible
        params: {//固定的编辑页面表单数据 
        }
      },
      editObjForm: {
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
        return this.baseHeight-150;
      }
    }
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
      this.listLoading=true;
      // fetchSingleHistory("CP20141223134202631").then(response => {
      //   this.list= [{
      //     O_CODE:"CP20141223134202631",
      //     O_NAME:"测试数据",
      //     B_GRADE2:"AAA",
      //     F_GRADE:"A"
      //   }];// response.data;
      //   this.listLoading=false;
      // }).catch(error => {
      //   this.listLoading=false;
      //   this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      // });
    },
    //====================================edit===================================================
    /**
     * @name: 更多评级 点击
     * @param {type} 
     * @return: 
     * @other: 
     */
    showDialogList: function(row) {
      this.editObjList.params={
        oCode: row.O_CODE
      };
      this.editObjList.visible=true;
    },
    showDialogForm: function(row) {
      this.editObjForm.params={
        oCode: row.O_CODE
      };
      this.editObjForm.visible=true;
    }
  }
};
</script>


<style scoped>
.app-container {
  padding-bottom: 0px;
}
</style>
