<!--
 * @Descripttion: 左右布局配置
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-06-02 17:27:33
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-11-05 17:34:41
 -->

<template>
  <div v-el-resize="{name:'contentSizeChange'}" class="app-container" :style="{height: containerHeight + 'px'}">
    <split-pane split="vertical" :min-percent="10" :default-percent="25">
      <template slot="paneL">
        <div class="left-container">
          <Table-Header iconClass="component">
          </Table-Header>
          <el-table ref="leftTable" v-loading="listLoadingLeft" :data="leftList" fit highlight-current-row style="width: 100%;"
            :height="leftTableHeight" @row-click="leftRowClick">
            <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
            <el-table-column label="等级模型名称" header-align="center" align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.GM_NAME }}</span>
              </template>
            </el-table-column>
            <el-table-column label="等级模型描述" header-align="center" align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.GM_DESC }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template slot="paneR">
        <div class="right-container">
          <div id="topDiv">
            <Table-Header iconClass="component">
            </Table-Header>
            <el-table ref="rightTable" v-loading="listLoadingRight" :data="rightList" border fit highlight-current-row style="width: 100%;"
              :height="rightTableHeight/2">
              <el-table-column :label="$t('table.id')" type="index" align="center" width="50" :index="indexMethod"></el-table-column>
              <el-table-column label="等级名称" header-align="center" align="left" show-overflow-tooltip width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.GRADE }}</span>
                </template>
              </el-table-column>
              <el-table-column label="等级描述" header-align="center" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.G_DESC }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div id="bottomDiv">
            <Table-Header iconClass="component">
            </Table-Header>
            <el-table ref="rightTable" v-loading="listLoadingRight" :data="rightList" border fit highlight-current-row style="width: 100%;"
              :height="rightTableHeight/2">
              <el-table-column :label="$t('table.id')" type="index" align="center" width="50" :index="indexMethod"></el-table-column>
              <el-table-column label="等级名称" header-align="center" align="left" show-overflow-tooltip width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.GRADE }}</span>
                </template>
              </el-table-column>
              <el-table-column label="等级描述" header-align="center" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.G_DESC }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </template>
    </split-pane>
  </div>
</template>
<script>  
import TableHeader from "@/components/TableHeader";
import splitPane from 'vue-splitpane'
import permission from '@/directive/permission/index.js'; // 权限判断指令 
import elResize from "@/directive/el-doresize"; //自适应事件
import waves from "@/directive/waves"; // Waves directive 加上这个点击有水波纹 
// import { fetchGradeModelList, fetchGradeModelData } from "@/api/paramConfig";

export default {
  name: "LeftRightTable",
  components: { TableHeader, splitPane },
  directives: { waves, permission, elResize },
  props: {
    layoutHeight: {
      default: () => {
        return -1;
      }
    },
    props: {
      type: Object,
      default: () => {
        return {
          value: "id", // ID字段名
          label: "name", // 显示名称
          children: "children" // 子级字段名
        };
      }
    },
  },
  data() {
    return {
      clientHeight: window.document.documentElement.clientHeight,
      //========================================列表查询==================================
      leftList: [],//列表 left
      rightList: [],//列表 right
      currentRowLeft: null,//当前选中的左右布局 left 
      listLoadingLeft: false,
      listLoadingRight: false,
      //========================================新增编辑相关===============================
      editObj: {
        visible: false, //新增编辑组件 visible
        params: {//固定的编辑页面表单数据 
        }
      },
    }
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
    containerHeight: {
      get: function () {
        return this.baseHeight - 90;
      }
    },
    /**
     * @name: right height
     * @param {type} 
     * @return: 
     * @other: 
     */
    rightTableHeight: {
      get: function () {
        return this.baseHeight - 170;
      }
    },
    /**
     * @name: left height
     * @param {type} 
     * @return: 
     * @other: 
     */
    leftTableHeight: {
      get: function () {
        return this.baseHeight - 170;
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
    /**
     * @name: 容器的高度监听，自适应整体
     * @return: 
     * @other: 
     */
    contentSizeChange: function (newWidth, newHeight, clientWidth, clientHeight) {
      this.clientHeight = clientHeight;
    },
    /**
    * @name: 初始化数据
    * @return: 
    * @other: 
    */
    initData() {
      this.getLeftList();
    },
    /**
    * @name: 索引
    */
    indexMethod(index) {
      return index + 1;
    },

    /**
     * @name: 获取left列表
     * @param {type} 
     * @return: 
     * @other: 
     */
    getLeftList() {
      this.listLoadingLeft = true;
      // fetchGradeModelList({}).then(response=>{
      //   this.listLoadingLeft = false;
      //   this.leftList = response.data; 
      //   if (this.leftList.length == 0) {
      //     return;
      //   }
      //    //数据加载完以后默认选中一行
      //   this.$nextTick(()=>{
      //       this.$refs.leftTable.setCurrentRow(this.leftList[0]);  
      //       this.leftRowClick(this.leftList[0]);
      //   }) 
      // }).catch(error=>{
      //   this.listLoadingLeft = false;
      //   this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      // });  
      this.listLoadingLeft = false;
      this.leftList = [{
        GM_NAME: "CP2014122313420263111",
        GM_DESC: "测试左侧数据",
      
      }];// response.data;
    },
    /**
     * @name: 获取列表 right
     * @return: 
     * @other: 
     */
    getRightTableList() {
      this.listLoadingRight = true;
      // fetchGradeModelData(this.currentRowLeft.GM_CODE).then(response=>{
      //   this.listLoadingRight = false;
      //   this.rightList = response.data;
      // }).catch(error=>{
      //   this.listLoadingRight = false;
      //   this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      // });  
      this.listLoadingRight = false;
      this.rightList = [{
        GRADE: "CP20141223134202631",
        G_DESC: "测试数据",
      
      }];// response.data;
    },
    /**
     * @name: left列表点击事件
     * @return: 
     * @other: 
     */
    leftRowClick(row, column, event) {
      this.currentRowLeft = row;
      this.getRightTableList();
    }
  }

}
</script>

<style scoped>
.app-container {
  padding-bottom: 0px;
  /* position: relative; */
}
.left-container {
  height: 100%;
  overflow: auto;
}

.right-container {
  height: 100%;
}
</style>



