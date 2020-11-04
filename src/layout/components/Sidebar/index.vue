<!--
 * @Descripttion: 侧边栏
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-18 15:06:42
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-04-17 09:23:32
 -->
<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="menuBg"
        :text-color="menuText"
        :active-text-color="menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <span v-show="false">{{ customTheme.menuText }}</span>
    </el-scrollbar>
  </div>
</template>

<script>
/* eslint-disable vue/no-async-in-computed-properties */
/* eslint-disable vue/no-side-effects-in-computed-properties */

import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
// import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      menuBg: "#239194",
      menuText:"",
      menuActiveText:""
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    }, 
    isCollapse() {
      return !this.sidebar.opened
    },
    /**
     * @name: 当前选中theme
     * @param {type} 
     * @return: 
     * @other: 
     */
    async customTheme() {
      let customTheme = this.$store.getters.customTheme;  
      let path = customTheme +"/variables.js";                              
      let themeData = await import(`@/styles/theme/${path}`);
      this.menuBg = themeData.default.menuBg;
      this.menuText = themeData.default.menuText;
      this.menuActiveText = themeData.default.menuActiveText;
      return themeData; 
    }
  },  
  created () {
   
  },
}
</script>
