<!--
 * @Descripttion: navbar
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:18
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-05 18:10:25
 -->
<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- 全局搜索 主体 债券等等 -->
        <global-search class="right-menu-item" />
        <!-- 全局搜索 主体 债券等等 快捷键 dialog -->
        <global-search-dialog class="right-menu-item" />
        <!-- 菜单搜索 -->
        <search class="right-menu-item" />
        <!-- 日志 -->
        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <!-- 全屏 -->
        <!-- <screenfull class="right-menu-item hover-effect" /> -->

        <!-- 系统主题选择 -->
        <!-- <theme-select class="right-menu-item hover-effect"></theme-select> -->

        <!-- size选择 隐藏-->
        <!-- <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="right-menu-item hover-effect" />
        </el-tooltip> -->

        <!-- 国际化语言选择 隐藏 -->
        <!-- <lang-select class="right-menu-item hover-effect" /> -->
      </template>
      <!-- <el-button @click="test">test</el-button> -->
     <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
           <div class="avatar-wrapper">
         <!--  <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
           <img :src="avatar" class="user-avatar"> -->
         <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') + "(" + name + ")" }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/changePwd">
            <el-dropdown-item>
              {{ $t('navbar.changePwd') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'
import ThemeSelect from '@/components/ThemeSelect'
import GlobalSearch from '@/components/GlobalSearch'
import GlobalSearchDialog from '@/components/GlobalSearch/indexGlobal'
import { websocketLogout } from '@/api/websocket'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // eslint-disable-next-line vue/no-unused-components
    ErrorLog,
    // eslint-disable-next-line vue/no-unused-components
    Screenfull,
    // eslint-disable-next-line vue/no-unused-components
    SizeSelect,
    // eslint-disable-next-line vue/no-unused-components
    LangSelect,
    Search,
    // eslint-disable-next-line vue/no-unused-components
    ThemeSelect,
    GlobalSearch,
    GlobalSearchDialog
  },
  data() {
    return {
      loginType: window.env.VUE_APP_LOGIN_TYPE,// process.env.VUE_APP_LOGIN_TYPE,
      loginRedirect: window.env.VUE_APP_LOGIN_REDIRECT_FULL// process.env.VUE_APP_LOGIN_REDIRECT_FULL,
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
       if(window.env.VUE_WEBSOCKET&&window.env.VUE_WEBSOCKET.enable) {
        websocketLogout();
      }
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    test: function() {
      // eslint-disable-next-line no-debugger
      debugger
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
