<!--
 * @Descripttion: 桌面父组件
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-06-26 15:08:49
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-08-19 11:31:21
 -->
<!--
<template>
  <div>
    <layoutPage v-if="has_Init" editType="add" :params="{type:'desktop',account:account,...query}"></layoutPage>
  </div> 
</template>

<script>      
import layoutPage from "@/views/layout/layoutSetting/layoutPage";

export default {
  name: 'DeskTop',
  components: { layoutPage },
  directives: {},
  filters: {

  },
  data() {
    return {
        query:{
            //default params for this type
        },
        account:"",
        has_Init:false
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData: function() {  
        this.query = {...this.$route.query,...this.query};
        this.account = this.$router.app._route.meta.componentCode;
        this.has_Init = true;
    },
  }
}
</script>
 
