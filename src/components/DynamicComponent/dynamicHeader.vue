<!--
 * @Descripttion: 动态组件 配置框架查询条件动态控件
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-10-30 10:02:38
 * @LastEditors: qinwen.fu
 * @LastEditTime: 2020-09-23 16:30:05
 -->

<template>
  <div style="display:inline"> 
    <template v-for="(item, index) in fields">
      <!-- 直接导入组件，或者component，动态注册组件，感觉没必要动态注册，直接导入即可，因为数量是确定的 -->
      <!-- 这边保留input用component的形式 -->
      <!-- input textarea -->
      <component :is="item.controlCode" v-if="item.controlCode == 'elInput'" :key="index" v-model="item.value" :placeholder="item.placeholder"
        class="filter-item" :style="{width:item.controlWidth ? item.controlWidth + 'px': '150px'}" :disabled="item.disabled"
        @change="handleSelectChange($event,item)" />
      <!-- 日期选择 -->
      <el-date-picker v-if="item.controlCode == 'elDatePicker'" :key="index" v-model="item.value" type="date" :disabled="item.disabled"
        :placeholder="item.placeholder" class="filter-item" :style="{width:item.controlWidth ? item.controlWidth + 'px': '150px'}">
      </el-date-picker>
      <!-- 数字框 -->
      <el-input-number v-if="item.controlCode == 'elInputNumber'" :key="index" v-model="item.value" class="filter-item" :controls="false"
        :disabled="item.disabled" :style="{width:item.controlWidth ? item.controlWidth + 'px': '150px'}"></el-input-number>
      <!-- 百分比 -->
      <NumberPercent v-if="item.controlCode == 'NumberPercent'" :key="index" v-model="item.value" class="filter-item" :disabled="item.disabled"
        :style="{width:item.controlWidth ? item.controlWidth + 'px': '150px'}"></NumberPercent>
      <!-- 单选下拉树 -->
      <SelectTree v-else-if="item.controlCode == 'SelectTree'" :key="index" v-model="item.value"
        :data="item.isRemoteData?item.remoteDataSource:JSON.parse(item.localDataSource)" :placeholder="item.placeholder" class="filter-item"
        :style="{width:item.controlWidth ? item.controlWidth + 'px': '150px'}" :disabled="item.disabled"
        @handleNodeClick="handleSelectChange($event,item)" @clear="handleSelectChange($event,item)"></SelectTree>
      <!-- 多选下拉树 -->
      <MultiSelectTree v-else-if="item.controlCode == 'MultiSelectTree'" :key="index" v-model="item.value"
        :data="item.isRemoteData?item.remoteDataSource:JSON.parse(item.localDataSource)" :placeholder="item.placeholder" class="filter-item"
        :style="{width:item.controlWidth ? item.controlWidth + 'px': '150px'}" :disabled="item.disabled"
        @handleCheckChange="handleSelectChange($event,item)" @handleRemoveTag="handleSelectChange($event,item)">
      </MultiSelectTree>
      <!-- 单选下拉、多选下拉、是否开启远程搜索 -->
      <el-select v-else-if="item.controlCode == 'elSelect' || item.controlCode == 'elMultiSelect'" :key="index" v-model="item.value" collapse-tags
        clearable filterable :multiple="item.controlCode == 'elSelect'?false:true" :remote="item.isRemoteFilter"
        :remote-method="item.isRemoteFilter?remoteMethod:null" :loading="remoteLoading" :placeholder="item.placeholder" class="filter-item"
        :style="{width:item.controlWidth ? item.controlWidth + 'px': '150px'}" :disabled="item.disabled" @focus="handleCurrentFocus(item)"
        @change="handleSelectChange($event,item)" @clear="handleSelectChange($event,item)">
        <el-option v-for="option in item.isRemoteData?item.remoteDataSource:JSON.parse(item.localDataSource)" :key="option.value"
          :label="option.label" :value="option.value">
        </el-option>
      </el-select>
    </template>
  </div>
</template>

<script> 
import waves from "@/directive/waves"; // Waves directive
//自定义组件直接引入
import SelectTree from "@/components/SelectTree";
import MultiSelectTree from "@/components/SelectTree/multiSelectTree";
import NumberPercent from '@/components/NumberPercent/index';

export default {
  name: "DynamicHeader",
  components: { SelectTree,MultiSelectTree,NumberPercent },
  directives: { waves },
  props: {
    /**
     * @name: fields for header
     */
    fields: {
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      currentFocusTarget: {},//当前focus的fieldItem 
      remoteLoading: false,//远程搜索的loading  
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {
 
  },
  updated() {

  },
  methods: {
    /**
     * @name: 处理elSelect、SelectTree、MultiSelectTree、elInput等change事件
     * @param {type}
     */
    handleSelectChange: function($event,fieldInfo) {
      if(fieldInfo.onchangePath) {
        if(fieldInfo.selectChangeModule) {
          //module 已加载
          fieldInfo.selectChangeModule($event,fieldInfo,this);
        } else {
          //初次加载
          import(`@/views/layout/event/change${fieldInfo.onchangePath}`).then(
            module => {
              const moduleObj=module[fieldInfo.onchangeModule];
              fieldInfo.selectChangeModule=moduleObj;
              if(moduleObj) {
                moduleObj($event,fieldInfo,this);
              }
            }
          );
        }
      }
    },
    /**
    * @name: 记录当前操作的dom
    * @param {type} 
    * @return: 
    * @other: 
    */
    handleCurrentFocus: function(item) {
      this.currentFocusTarget=item;
    },
    /**
     * @name: 开启远程搜索时绑定的方法
     * @param {type} 
     * @return: 
     * @other: 
     */
    remoteMethod: function(query) {
      let f=this.currentFocusTarget;
      f.query=query;//模糊查询文本
      if(query!=='') {
        this.remoteLoading=true;
        setTimeout(() => {
          this.remoteLoading=false;
          if(f.isRemoteData) {
            f.moduleObj(f,this).then(dataSource => {
              f.remoteDataSource=dataSource;
            });
          }
        },300);
      } else {
        f.remoteDataSource=[];
      }
    },
    handleFilter: function(){
      this.$emit("change");
    },
    test:function(){
      debugger
    }
  }
};
</script>

