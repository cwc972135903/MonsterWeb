<!--
 * @Descripttion: 全局搜索 主体 债券 等等
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-06-15 10:40:00
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-11-04 17:44:46
-->  
<template>
  <div :class="{'show':true}" class="header-search">
    <el-select ref="headerGlobalSelect" v-model="selected" :remote-method="querySearch" filterable remote placeholder="全局搜索"
      class="header-search-select" :popper-append-to-body="false" clearable @change="change" @visible-change="visibleChange">
      <el-option value label style="height:350px;padding:10px;padding-top:0px;">
        <el-tabs v-model="activeName" @click.native="handleClick($event)">
          <el-tab-pane v-for="item in optionTypeList" :key="item.label" :label="item.label" :name="item.type">
            <div style="height:300px;overflow-y:auto;font-weight:400">
              <el-button v-show="loading" type="text" :loading="loading">数据加载中</el-button>
              <!-- 全部 -->
              <template v-if="item.type == 'ALL'">
                <el-option-group v-for="group in options" :key="group.type" :label="group.label" style="padding-bottom: 18px;">
                  <el-option v-for="gItem in group.options" :key="gItem.value" :label="gItem.baseName" :value="gItem.baseCode"
                    :style="{height:group.type=='TCORP_CODE' && gItem.oRegno ?'41px':'34px'}">
                    <!-- 主体 -->
                    <template v-if="group.type=='TCORP_CODE'">
                      <div>
                        <span v-html="hightLightLabel(gItem.baseName)"></span>
                        <div style="font-size: 8px;color: rgb(132, 146, 166);height: 25px;margin-top: -15px;margin-left: 10px;">
                          {{ gItem.oRegno }}
                        </div>
                      </div>
                    </template>
                    <!-- 债券 -->
                    <template v-if="group.type=='TBND_CODE'">
                      <span style="float: left">{{ gItem.bondCode }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px" v-html="hightLightLabel(gItem.baseName.split(';')[0])"></span>
                    </template>
                    <!-- ABS -->
                    <template v-if="group.type == 'TABS_CODE'"> 
                      <span v-html="hightLightLabel(gItem.baseName)"></span>
                    </template>
                    <!-- 债权 信托 -->
                    <template v-if="group.type == 'TIPLAN_CODE' || group.type == 'TTRUST_CODE'">
                      <span v-html="hightLightLabel(gItem.baseName)"></span>
                    </template>
                  </el-option>
                </el-option-group>
              </template>
              <!-- 主体 -->
              <template v-if="item.type == 'TCORP_CODE'">
                <el-option-group v-for="group in optionsFilter(item.type)" :key="group.type" :label="group.label" style="padding-bottom: 18px;">
                  <el-option v-for="gItem in group.options" :key="gItem.value" :label="gItem.baseName" :value="gItem.baseCode"
                    :style="{height: gItem.oRegno ?'41px':'34px'}">
                    <span v-html="hightLightLabel(gItem.baseName)"></span>
                    <div style="font-size: 8px;color: rgb(132, 146, 166);height: 25px;margin-top: -15px;margin-left: 10px;">
                      {{ gItem.oRegno }}
                    </div>
                  </el-option>
                </el-option-group>
              </template>
              <!-- 债券-->
              <template v-if="item.type == 'TBND_CODE'">
                <el-option-group v-for="group in optionsFilter(item.type)" :key="group.type" :label="group.label">
                  <el-option v-for="gItem in group.options" :key="gItem.value" :label="gItem.baseName" :value="gItem.baseCode">
                    <span style="float: left">{{ gItem.bondCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px" v-html="hightLightLabel(gItem.baseName.split(';')[0])"></span>
                  </el-option>
                </el-option-group>
              </template>
              <!-- ABS -->
              <template v-if="item.type == 'TABS_CODE'">
                <el-option-group v-for="group in optionsFilter(item.type)" :key="group.type" :label="group.label">
                  <el-option v-for="gItem in group.options" :key="gItem.value" :label="gItem.baseName" :value="gItem.baseCode"> 
                    <span v-html="hightLightLabel(gItem.baseName)"></span>
                  </el-option>
                </el-option-group>
              </template>
              <!-- 债权 信托 -->
              <template v-if="item.type == 'TIPLAN_CODE' || item.type == 'TTRUST_CODE'">
                <el-option-group v-for="group in optionsFilter(item.type)" :key="group.type" :label="group.label">
                  <el-option v-for="gItem in group.options" :key="gItem.value" :label="gItem.baseName" :value="gItem.baseCode">
                    <span v-html="hightLightLabel(gItem.baseName)"></span>
                  </el-option>
                </el-option-group>
              </template>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-option>
    </el-select>
  </div>
</template>

<script>
// import { remoteGlobalObjList } from "@/api/corpManage";

/**
 * @name: 主体 债券等等
 * @param {type} 
 * @return: 
 * @other: 
 */
const optionTypeList=[
  {
    type: "ALL",
    label: "全部",
    options: []
  },
  {
    type: "TCORP_CODE",
    label: "主体",
    options: []
  },
  {
    type: "TBND_CODE",
    label: "债券",
    options: []
  },
  {
    type: "TIPLAN_CODE",
    label: "债权",
    options: []
  },
  {
    type: "TTRUST_CODE",
    label: "信托",
    options: []
  },
  {
    type: "TABS_CODE",
    label: "ABS",
    options: []
  }
];

export default {
  name: 'GlobalSearch', 
  data() {
    return {
      activeName: "ALL",
      optionTypeList,
      selected: "",
      search: '',//搜索关键字
      loading: false,
      timer: null,
      options: optionTypeList.filter(c => c.type!="ALL")
    }
  },
  computed: {
    /**
      * @name: 通用computed options
      * @param {type} optionType
      * @return: 
      * @other: 
      */
    optionsFilter() {
      return function(type) {
        return this.options.filter(c => c.type==type);
      }
    }
  },
  watch: {
  },
  mounted() { 
  },
  methods: { 
    handleClick: function(e) {
      e.stopPropagation();//阻止了事件冒泡 防止 headerGlobalSelect blur
    },
    change(val) {
      if(!val){
        this.search = '';
        this.options=this.optionTypeList;
      }else{
        let switchCode=this.activeName;
        if(this.activeName=="ALL") {
          for(let index=0;index<this.options.length;index++) {
            const element=this.options[index];
            if(element.options&&element.options.length>0) {
              const target=element.options.find(c => c.baseCode==val);
              if(target!=null) {
                switchCode=element.type;
                break;
              }
            }
          }
        }
  
        const optionsFilter=this.optionsFilter(switchCode);
        let row={};
        if(optionsFilter&&optionsFilter.length>0&&optionsFilter[0].options&&optionsFilter[0].options.length>0) {
          row=optionsFilter[0].options.find(c => c.baseCode==val);
        } else {
          return;
        }
        this.visible=false;
        switch(switchCode) {
          case "TCORP_CODE": {
            this.$router.push(`/rating/object/manage/dataManageLayoutIndex/${val}?treeType=TCORP&titleName=${row.baseName}&O_CODE=${val}&ISS_CODE=${val}&O_TYPE=1`)
            break;
          }
          case "TBND_CODE": {
            this.$router.push(`/rating/object/manage/dataManageLayoutIndex/${val}?treeType=TBND&titleName=${row.baseName.split(";")[0]}&O_CODE=${val}&ISS_CODE=${val}&P_CODE=${val}&I_CODE=${row.iCode}&O_TYPE=0`)
            break;
          }
          case "TIPLAN_CODE": {
            this.$router.push(`/rating/object/manage/dataManageLayoutIndex/${val}?treeType=TIPLAN&titleName=${row.baseName}&O_CODE=${val}&O_TYPE=26`)
            break;
          }
          case "TTRUST_CODE": {
            this.$router.push(`/rating/object/manage/dataManageLayoutIndex/${val}?treeType=TTRUST&titleName=${row.baseName}&O_CODE=${val}&O_TYPE=28`)
            break;
          }
          case "TABS_CODE": {
            this.$router.push(`/rating/object/manage/dataManageLayoutIndex/${val}?treeType=TABS&titleName=${row.baseName}&DEAL_ID=${val}&M_TYPE=${row.mType?row.mType:''}&O_TYPE=29`)
            break;
          }
          default:
            this.visible=true;
            break;
        }
      }
    },
    hightLightLabel: function(label) {
      return this.search? label.replace(this.search,`<font color="#4f99f7">${this.search}</font>`):label;
    },
    querySearch(query) {
      this.search=query;
      if(query!=='') {
        if(this.timer) {
          clearTimeout(this.timer);//clear previous timer
        }
        this.timer=setTimeout(() => {
          this.loading=true;
          // remoteGlobalObjList(query,this.optionTypeList.map(c => c.type)).then(response => {
          //   this.loading=false;
          //   this.options=response.data;
          // }).catch(error => {
          //   this.loading=false;
          // });
        },100);
      }
      else { 
        this.options=this.optionTypeList;
      }
    },
    visibleChange(val){
      if(!val){
        var that = this;
        var value = this.search;
        setTimeout(() => {
          that.$refs.headerGlobalSelect.blur();
          if(!this.selected){
            that.$refs.headerGlobalSelect.$children[0].$refs.input.value = value;
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
// 下拉框max-height覆盖
.header-search .el-select-dropdown__wrap {
  max-height: 400px;
}
</style>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 250px;
      margin-left: 10px;
    }
  }
}
</style> 