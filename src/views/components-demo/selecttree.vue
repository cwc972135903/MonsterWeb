 <!--
 * @Descripttion: 下拉树 单选 多选
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-04-04 11:27:31
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-05-27 16:27:15
 -->

<template>
  <div class="app-container">
    <code>树形下拉组件 支持v-model,单选 多选,数据源动态变化同步更新,下拉change事件等</code> 
    <div></div>单选 
      <SelectTree
      ref="selectSingleTree"
      v-model="valueId"
      :data="data"
      :props="props"
      style="width:300px"
      :renderContent="renderContent"
      @handleNodeClick="handleSelectSingleTreeClick($event,'your params')"
      @clear="handleClear('your params')"
    ></SelectTree>
    <el-button @click.native="getSelectTreeValueSingle">获取值(三种方式)</el-button>
    <el-button @click.native="setSelectTreeValueSingle">设置值(三种方式)</el-button>
    <div></div>多选
    <MultiSelectTree
      ref="selectTree" 
      v-model="valueIds"
      :data="data"
      :props="props"
      style="width:300px"
      check-on-click-node
      :renderContent="renderContent"
      @handleCheckChange="handleCheckChange($event, 'your params')"
      @handleRemoveTag="handleRemoveTag($event, 'your params')"
    ></MultiSelectTree>
    <el-button @click.native="getSelectTreeValue">获取值(三种方式)</el-button>
    <el-button @click.native="setSelectTreeValue">设置值(三种方式)</el-button>
  </div>
</template>

<script>
/* eslint-disable no-console */
import SelectTree from "@/components/SelectTree";
import MultiSelectTree from "@/components/SelectTree/multiSelectTree";

export default {
  name: "SelectTreeComponent",
  components: { SelectTree, MultiSelectTree },
  data() {
    return {
      //单选
      valueId: null, //初始值 操作中除了初始化操作，不建议直接修改其值
      //多选默认值
      valueIds: [], //初始值 操作中除了初始化操作，不建议直接修改其值
      props: {
        // props需初始化时就确定 默认为 id label children
        value: "id",
        label: "label",
        children: "children"
      },
      data: []
    };
  },
  mounted() {
    // 多选 动态获取数据后刷新组件
    this.data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ];
    this.valueIds = [5, 7];
   
    this.valueId = 5; //单选
  },
  methods: {
    //单选
    getSelectTreeValueSingle: function() { 
      console.log(this.$refs.selectSingleTree.getCurrentKey());// 方式一 
      console.log(this.$refs.selectSingleTree.getCurrentNode()); // 方式二 
      console.log(this.valueId); // 方式三 双向绑定
    },
    setSelectTreeValueSingle: function() { 
      this.$refs.selectSingleTree.setCurrentNode({// 方式一
        id: 10,
        label: "三级 1-1-2"
      }); 
      // this.$refs.selectSingleTree.setCurrentKey(7);// 方式二
      // this.valueId = 7;//方式三
    },
    // 多选
    getSelectTreeValue: function() { 
      console.log(this.$refs.selectTree.getCheckedNodes(false));//方式一 
      console.log(this.$refs.selectTree.getCheckedKeys());//方式二 
      console.log(this.valueIds); // 方式三 双向绑定
    },
    setSelectTreeValue: function() { 
      this.$refs.selectTree.setCheckedNodes([ //方式一
        {
          id: 10,
          label: "三级 1-1-2"
        }
      ]); 
      // this.$refs.selectTree.setCheckedKeys([10]);//方式二
      // this.valueIds = [10];//方式三
    },
    /**
     * @name: 监听单选下拉click事件
     * @param {$event}  子组件自带的回传参数
     * @param {params}  yourParams
     */
    handleSelectSingleTreeClick:function($event,params){
        console.log($event);
        console.log(params);
    },
    /**
     * @name: 监听单选下拉clear事件
     * @param {type}  
     */
    handleClear:function(params){ 
        console.log(params);
    },
    /**
     * @name: 监听多选下拉change事件
     * @param {$event}  子组件自带的回传参数
     * @param {params}  yourParams
     */
    handleCheckChange:function($event,params){
        console.log($event);
        console.log(params);
    },
    /**
     * @name: 监听多选handleRemoveTag事件
     * @param {$event}  子组件自带的回传参数
     * @param {params}  yourParams
     */
    handleRemoveTag:function($event,params){
        console.log($event);
        console.log(params);
    },
    /**
     * @name: renderContent 自定义显示内容
     * @param {type} 
     * @return: 
     * @other: 
     */
    renderContent(h, { node, data, store }) { 
        return (
          <span>
            <span>{node.label}</span> 
          </span>);
      }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-container {
  margin: 20px;
}
</style>
