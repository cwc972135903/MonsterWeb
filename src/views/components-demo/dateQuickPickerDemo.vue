<!--
 * @Descripttion: 日期范围快速选择组件 demo
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-04-22 10:05:39
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-04-22 15:19:14
 -->

<template>
  <div>
    <code>支持v-model, 支持options扩展，<span style="color:red;">双击清空选择</span></code>
    <div class="dateQuickTab">  
      <DateQuickPicker v-model="value1" /> 
      <code>默认使用 v-model 绑定 value.type = Array. value:{{ value1 }}</code>
    </div>
    <div class="dateQuickTab"> 
      <DateQuickPicker v-model="value2" /> 
      <code>带默认值 value:{{ value2 }}</code>
    </div>
    <div class="dateQuickTab"> 
      <DateQuickPicker v-model="value3" /> 
      <code>带默认值 任意时间 value:{{ value3 }}</code>
    </div>
    <div class="dateQuickTab"> 
      <DateQuickPicker v-model="value4" :options="options" /> 
      <code>自定义options value:{{ value4 }}</code>
    </div>
  </div>
</template>
<script>
import DateQuickPicker from "@/components/DateQuickPicker"
import { getRecentNDate } from '@/utils/dateHelper';

const nowYear=getRecentNDate(0);
const threeYear=[getRecentNDate(3),nowYear];
const fiveYear=[getRecentNDate(5),nowYear];
const tenYear=[getRecentNDate(10),nowYear];

export default {
  name: 'DateQuickPickerDemo',
  components: { DateQuickPicker },
  data() {
    return {
      value1: [],
      value2: threeYear,
      value3: ["2019-05-05","2020-05-05"],
      value4: ["上市以来"],
      options: [
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
        },
        {
          label: "上市以来",
          value: ["上市以来"],
          type: "custom"
        },
      ]
    }
  },
  methods: {
    test: function() {
      // eslint-disable-next-line no-debugger
      debugger
    }
  }
}
</script>
<style scoped>
.dateQuickTab{
    margin:10px;
}
</style>


