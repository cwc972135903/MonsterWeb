<!--
 * @Descripttion: dialog请求列表
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-06-21 10:27:05
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-04 18:02:27
 -->

<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" title="dialog请求列表" :visible.sync="visible" :before-close="handleClose" custom-class="editDialogEditList">
      <Table-Header title="列表" iconClass="table">
      </Table-Header>
      <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 100%;" :height="300">
        <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
        <el-table-column label="模型名称" align="center" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.MODEL_NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="基准日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.BASEDATE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="内部等级" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.B_GRADE2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="内部展望" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.F_GRADE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评级生效日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.BEG_DATE }}</span>
          </template>
        </el-table-column> 
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('table.cancel') }}</el-button> 
      </div>
    </el-dialog>
  </div>
</template>

<script> 
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽
import TableHeader from "@/components/TableHeader";  
// import { fetchSingleHistoryMore } from "@/api/rating";

export default {
  name: "DialogEditList",
  components: {TableHeader},
  directives: { elDragDialog },
  props: {
    visible: {  //当前dialog的显示标识 勿修改 
      default: () => {
        return false;
      }
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      list: [],//组件类型列表
      dataBind: {},//表单绑定对象
      listLoading:false//列表 loading 
    };
  },
  watch: {
    /**
     * @name: 这种无初始化dataBind时，需在注释处声明此组件允许接受的参数
     * @param {oCode}  记录id
     */
    params(newVal,oldVal) {    
        //1 query request
        if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
            this.getList();
        } 
    }
  }, 
  mounted() {
    this.initData();
  },
  methods: {
    initData: function() {
       
    },
    /**
    * @name: 获取组件类型列表 
    */
    getList: function() {  
      if (!this.params.oCode) {
          return;
      }
       this.listLoading = true;
      // fetchSingleHistoryMore(this.params.oCode).then(response => {
      //   this.listLoading = false;
      //   this.list=response.data;
      // }).catch(error => {
      //   this.listLoading = false;
      //   this.$notify.error({ title: "获取历史评级结果",message: error,duration: 2000 });
      // });
    },
    handleClose() {
        if (this.visible) {
            this.$emit("update:visible",false);
        } 
    }
  }
};
</script>
<style scoped>
.form-input-line {
  width: 530px;
}
.form-input-line-three {
  width: 870px;
}
</style> 


<style>
/**
 * 全局样式名，确保全局唯一，不污染其他组件样式
 */
.editDialogEditList {
  width: 800px;
}
</style>