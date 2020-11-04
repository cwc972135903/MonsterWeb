<template>
  <div>
    <el-dialog :append-to-body="appendToBody" v-el-drag-dialog title="Icon选择" :close-on-click-modal="false" :visible.sync="visible" :before-close="handleClose" custom-class="iconSelect">
      <div class="icons-container">
        <p class="warn-content">
          <a href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html" target="_blank">Add and use
          </a>
        </p>
        <div class="icons-wrapper">
          <div v-for="item of iconsMap" :key="item" @click="handleClick(item)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('table.cancel') }}</el-button>
        <el-button @click="handleSave" type="primary">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import icons from './requireIcons'
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽

export default {
  name: 'IconsSelect',
  directives: { elDragDialog },
  props: {
    visible: {
      //当前dialog的显示标识 勿修改
      default: () => {
        return false;
      }
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    },
    appendToBody:{
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
      iconsMap: icons,
      iconSelected: ""
    }
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    handleClick(text) {
      this.iconSelected=text;
      this.$message({
        message: '选择成功',
        type: 'success',
        duration: 1500
      })
    },
    /**
     * @name: 关闭dialog
     */
    handleClose() {
      this.$emit("update:visible",false);
    },
    /**
     * @name: 保存
     */
    handleSave() {
      this.handleClose();
      this.$emit("save",this.iconSelected);
    },
  }
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: auto;
  height: 400px;
  width: 100%;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 15px;
    height: 60px;
    text-align: center;
    width: 60px;
    float: left;
    font-size: 15px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 12px;
    margin-top: 10px;
  }
  .disabled {
    pointer-events: none;
  }
}
 
</style>

<style>
.iconSelect {
  width: 800px;
}
</style>