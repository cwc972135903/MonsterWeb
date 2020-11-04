<!--
 * @Descripttion: 左右布局 左边树
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-07-23 14:16:46
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-02-21 12:36:50
 -->

<template>
  <div v-el-resize="{name:'contentSizeChange'}" class="app-container" :style="{height: containerHeight + 'px'}">
    <split-pane split="vertical" :min-percent="10" :default-percent="25">
      <template slot="paneL">
        <div class="left-container"> 
          <el-input v-model="filterText" placeholder="输入关键字进行过滤">  </el-input>
          <Table-Header>
            <el-button v-waves type="default" icon="el-icon-plus" size="mini">{{ $t('table.add') }}</el-button>
          </Table-Header>
          <el-tree  
            ref="leftTree" v-loading="listLoadingLeft" class="filter-tree" 
            :expand-on-click-node="false" 
            :filter-node-method="filterClassNode" 
            :data="leftList" 
            :node-key="props.value" 
            :highlight-current="true" 
            :props="props" 
            default-expand-all
            @node-click="leftRowClick"
          >
          </el-tree> 
        </div>
      </template>
      <template slot="paneR">
        <div class="right-container">
          <div id="topDiv">
            <Table-Header iconClass="component"> 
            </Table-Header>
            <el-table ref="rightTable" v-loading="listLoadingRight" :data="rightList" border fit highlight-current-row style="width: 100%;" :height="rightTableHeight/2">
              <el-table-column :label="$t('table.id')" type="index" align="center" width="50" :index="indexMethod"></el-table-column>
              <el-table-column label="日期" header-align="center" align="left" show-overflow-tooltip width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" header-align="center" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="地址" header-align="center" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.address }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div id="bottomDiv">
            <Table-Header iconClass="component"> 
            </Table-Header>
            <el-table ref="rightTable" v-loading="listLoadingRight" :data="rightList" border fit highlight-current-row style="width: 100%;" :height="rightTableHeight/2">
              <el-table-column :label="$t('table.id')" type="index" align="center" width="50" :index="indexMethod"></el-table-column>
              <el-table-column label="日期" header-align="center" align="left" show-overflow-tooltip width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" header-align="center" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="地址" header-align="center" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.address }}</span>
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
import { fetchTree, fetchTableList } from "@/api/demo/demo";
 
export default {
  name: "LeftRightTree",
  components: { TableHeader,splitPane },
  directives: { waves,permission,elResize },
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
          label: "label", // 显示名称
          children: "children" // 子级字段名
        };
      }
    },
  },
  data() {
    return {
      clientHeight: window.document.documentElement.clientHeight,
      //========================================列表查询==================================
      filterText:"",  
      leftList: [],//列表 left
      rightList: [],//列表 right
      currentNodeLeft: null,//当前选中的left node 
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
      get: function() {
        let height;
        if(this.layoutHeight==-1) {
          height=this.clientHeight
        } else {
          height=this.layoutHeight+this.$store.getters.marginHeightTopMainContent;
        }
        return height;
      }
    },
    containerHeight: {
      get: function() {
        return this.baseHeight-90;
      }
    },
    /**
     * @name: right height
     * @param {type} 
     * @return: 
     * @other: 
     */
    rightTableHeight: {
      get: function() {
        return this.baseHeight-170;
      }
    },
    /**
     * @name: left height
     * @param {type} 
     * @return: 
     * @other: 
     */
    leftTableHeight: {
      get: function() {
        return this.baseHeight-170;
      }
    }
  },
  watch: {
    filterText(val) {
        this.$refs.leftTree.filter(val);
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
    contentSizeChange: function(newWidth,newHeight,clientWidth,clientHeight) {
      this.clientHeight=clientHeight;
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
      return index+1;
    }, 
    /**
     * @name: 获取left tree
     * @param {type} 
     * @return: 
     * @other: 
     */
    getLeftList() {
      this.listLoadingLeft = true;
      fetchTree({}).then(response=>{
        this.listLoadingLeft = false;
        this.leftList = response.data;
        if (this.leftList.length == 0) {
          return;
        }
        //数据加载完以后默认选中一行
        this.$nextTick(()=>{  
            this.leftRowClick(this.leftList[0]);
        }) 
      }).catch(error=>{
        this.listLoadingLeft = false;
        this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      });  
    },
    /**
     * @name: 获取列表 right
     * @return: 
     * @other: 
     */
    getRightTableList() {
      this.listLoadingRight = true;  
      fetchTableList().then(response=>{
        this.listLoadingRight = false;
        this.rightList = response.data;
      }).catch(error=>{
        this.listLoadingRight = false;
        this.$notify.error({ title: "获取列表",message: error,duration: 2000 });
      });  
    },  
    /**
     * @name: left tree click
     * @param {type} 
     * @return: 
     * @other: 
     */
    leftRowClick:function(node){  
      this.currentNodeLeft = node;
      this.getRightTableList();
    },
    /**
     * @name: tree data filter
     */
    filterClassNode(value, data){   
        if (!value){
            return true; 
        }  
        return data.label.indexOf(value) !== -1;
    },
  }

}
</script>

<style scoped>
.app-container {
  padding-bottom: 0px;
  position: relative;
}
.left-container {
  height: 100%;
  overflow: auto;
}

.right-container {
  height: 100%;
}
</style>



