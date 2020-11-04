<!--
 * @Descripttion: 日期范围快速选择组件
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-04-22 09:28:15
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-04-22 15:16:28
 -->

<template>
  <!-- <el-button @click="test">test</el-button> -->
  <el-radio-group v-model="radio" size="mini" @change="radioChange">
    <template v-for="item in options">
      <el-tooltip v-if="item.type == 'normal'" :key="item.label" :content="item.value[0]+'~'+item.value[1]" placement="bottom" effect="light">
        <el-radio-button :label="item.label" @dblclick.native="clearSelect"></el-radio-button>
      </el-tooltip>
      <el-radio-button v-else :key="item.label" :label="item.label" @dblclick.native="clearSelect"></el-radio-button>
    </template>
    <el-popover v-model="randomDateObj.visible" placement="bottom" width="400" trigger="manual">
      <el-date-picker 
        v-model="randomDateVal" 
        type="daterange" 
        range-separator="至" 
        start-placeholder="开始日期" 
        end-placeholder="结束日期" 
        :default-time="['00:00:00', '23:59:59']"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      <div style="text-align: right; margin-right: 20px;margin-top: 10px;">
        <el-button type="primary" size="mini" @click="randomDateObj.visible = !randomDateObj.visible">确定</el-button>
      </div>
      <el-tooltip slot="reference" :content="randomDateVal? randomDateVal[0]+'~'+randomDateVal[1]:'尚未选择时间'" placement="bottom" effect="light">
        <el-radio-button label="任意时间" @click.native="randomDateObj.visible = true" @dblclick.native="clearSelect"></el-radio-button>
      </el-tooltip>
    </el-popover>
  </el-radio-group>
</template>
<script>
import { getRecentNDate } from '@/utils/dateHelper';

const nowYear=getRecentNDate(0);
const threeYear=[getRecentNDate(3),nowYear];
const fiveYear=[getRecentNDate(5),nowYear];
const tenYear=[getRecentNDate(10),nowYear];

export default {
  name: 'DateQuickPicker',
  components: {},
  /**
   * @name: 用于数据绑定v-model对应的prop跟event。默认是value跟input
   */
  model: {
    prop: "value",
    event: "returnBack"
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    options: {
      default() {
        return [
          {
            label: "3年",
            value: threeYear,
            type: "normal"
          },
          {
            label: "5年",
            value: fiveYear,
            type: "normal"
          },
          {
            label: "10年",
            value: tenYear,
            type: "normal"
          }
        ];
      }
    }
  },
  data() {
    return {
      radio: "",//默认选中radio item 
      randomDateObj: {
        params: {},
        visible: false
      },
    }
  },
  computed: {
    /**
     * @name: 任意时间val
     * @param {type} 
     * @return: 
     * @other: 
     */
    randomDateVal: {
      get: function() {
        if(this.value&&this.value.length>1) {
          return this.value;
        }
        return "";
      },
      set: function(newVal) {
        this.$emit("returnBack",newVal);
      }
    },
  },
  watch: {
    value:{
      immediate:true,//开启首次赋值监听
      handler(newVal,oldVal) {
        if(this.value&&this.value.length>0) {
          for(let index=0;index<this.options.length;index++) {
            const item=this.options[index];
            if(JSON.stringify(item.value)==JSON.stringify(newVal)) {
              this.radio=item.label;
              return;
            }
          }
          this.radio="任意时间"; 
        }else{
          this.radio="";
        }
      },
    } 
  },
  methods: {
    /**
     * @name: radio group change event
     * @param {type} 
     * @return: 
     * @other: 
     */
    radioChange: function(val) {
      if(val!="任意时间") {
        this.randomDateObj.visible=false;
        let item=this.options.find(c => c.label==val);
        this.$emit("returnBack",item.value);
      }
    },
    /**
     * @name: 双击清空选择
     * @param {type} 
     * @return: 
     * @other: 
     */
    clearSelect:function(){
      this.$emit("returnBack",[]);
      this.randomDateObj.visible=false;
    },
    test: function() {
      // eslint-disable-next-line no-debugger
      debugger
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

