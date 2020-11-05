<!--
 * @Descripttion: 菜单编辑
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-06-25 17:00:33
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-11-04 18:02:15
 -->
<!--
<template>
  <div class="app-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" title="菜单详情" :visible.sync="visible" :before-close="handleClose" custom-class="editDialogMenuEdit">
      <el-form ref="dataForm" :inline="inline" :rules="rules" :model="dataBind" label-width="120px" label-position="right" size="small">
        <el-form-item label="菜单类型" prop="type">
          <el-select v-model="dataBind.type" placeholder="菜单类型" class="form-input-item" @change="typeChange">
            <el-option v-for="item in menuTypeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父菜单" prop="pk_menu_pid">
          <SelectTree ref="selectSingleTree" v-model="dataBind.pk_menu_pid" :data="parentMenuOption" class="form-input-item" :renderContent="renderContent" :filterNode="filterNode" :filterable="false" placeholder="顶级目录则设置为空"></SelectTree>
        </el-form-item>
        <el-form-item v-if="dataBind.type != '2'" label="菜单路由" prop="path">
          <el-input v-model="dataBind.path" class="form-input-item" placeholder="一级目录以/开头 如/demo 其他单词" />
        </el-form-item>
        <el-form-item v-if="dataBind.type == '0'" label="重定向" prop="redirect">
          <el-input v-model="dataBind.redirect" class="form-input-item" placeholder="路由重定向 如/demo/normal" />
        </el-form-item>
        <el-form-item v-if="dataBind.type == '0'" label="alwaysShow" prop="always_show">
          <el-tooltip class="item" effect="light" content="目录只有一个菜单时，是否保留父子结构" placement="bottom">
            <el-select v-model="dataBind.always_show" class="form-input-item" clearable>
              <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>
        <el-form-item v-if="dataBind.type == '0'" label="默认布局" prop="is_layout">
          <el-select v-model="dataBind.is_layout" class="form-input-item">
            <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dataBind.type != '2'" label="组件路径" prop="component_path">
          <el-tooltip class="item" effect="light" content="组件路径一级目录为/layout，二级目录参考路由嵌套demo" placement="bottom">
            <el-input v-model="dataBind.component_path" class="form-input-item" placeholder="/开头 如/layout" />
          </el-tooltip>
        </el-form-item>
        <el-form-item v-if="dataBind.type == '1'" label="组件名称" prop="name">
          <el-tooltip class="item" effect="light" content="子路由组件路径对应的组件Name,需唯一" placement="bottom">
            <el-input v-model="dataBind.name" class="form-input-item" placeholder="子路由组件路径对应的组件Name" />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="菜单名称" prop="meta_title">
          <el-tooltip class="item" effect="light" :content="$te(`route.${dataBind.meta_title}`)? '国际化:'+ $t(`route.${dataBind.meta_title}`):'当前key未入国际化字典'" placement="bottom">
            <el-input v-model="dataBind.meta_title" class="form-input-item" />
          </el-tooltip>
        </el-form-item>
        <el-form-item v-if="dataBind.type != '2'" label="菜单图标" prop="meta_icon">
          <el-input v-model="dataBind.meta_icon" placeholder="请选择菜单icon" class="form-input-item">
            <svg-icon slot="append" :icon-class="dataBind.meta_icon || ''" @click="handleSymbol" />
          </el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="meta_code">
          <el-input v-model="dataBind.meta_code" class="form-input-item" />
        </el-form-item>
        <el-form-item v-if="dataBind.type != '2'" label="非菜单入口" prop="hidden">
          <el-select v-model="dataBind.hidden" class="form-input-item" clearable>
            <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dataBind.type == '1'" label="配置化菜单">
          <el-select v-model="isIndividualMenu" class="form-input-item" @change="individualMenuChange">
            <el-option v-for="item in configMenuOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dataBind.type == '1' && isIndividualMenu != '0'" prop="meta_component_code">
          <span slot="label">
            <el-tooltip class="item" effect="light" content="配置(组件/页面)编码" placement="left">
              <span>配置编码</span>
            </el-tooltip>
          </span>
          <el-tooltip class="item" effect="light" content="componentCode|account" placement="left"> 
            <!-- 报表模板 --><!--
            <template v-if="isIndividualMenu == '4'">
              <el-select v-model="dataBind.meta_component_code" class="form-input-item">
                <el-option v-for="item in reportOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-else>
                <el-input v-model="dataBind.meta_component_code" class="form-input-item" />
            </template>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="排序" prop="sortindex">
          <el-input-number v-model="dataBind.sortindex" :controls="false" class="form-input-item" :min="0">
          </el-input-number>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataBind.remark" type="textarea" class="form-input-line" maxlength="250" show-word-limit />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="loadingSave" @click="handleSave">{{ $t('table.confirm') }}</el-button>
      </div>
      <!-- Icon选择dialog -->
      <IconsSelect :visible.sync="iconSelectObj.visible" @save="iconSelectCallback" />
    </el-dialog>
  </div>
</template>

<script>
import { deepCopy } from "@/utils/arrayHelper";
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui 用于可拖拽
import IconsSelect from '@/views/svg-icons/iconSelect';
import SelectTree from "@/components/SelectTree";
import { menuTypeList,configMenuOptions } from "@/utils/enum";
import { fetchMenuForList,saveOrUpdateMenu } from "@/api/sys";
// import { fetchReportModelAll } from "@/api/report";

export default {
  name: "MenuEdit",
  components: { SelectTree,IconsSelect },
  directives: { elDragDialog },
  props: {
    visible: {  //当前dialog的显示标识 勿修改 
      default: () => {
        return false;
      }
    },
    params: {//表单参数 
      type: Object,
      default: () => {
        return {};
      }
    },
    inline: {
      default: () => {
        return true;
      }
    }
  },
  data() {
    const validatePId=(rule,value,callback) => {
      if(!value) {
        if(this.dataBind.type=="2") {
          callback(new Error("类型为按钮时，必须选父菜单"));
        }
      } else {
        let parentItem=this.$refs.selectSingleTree.getCurrentNode(); 
        if (!parentItem) {
          callback();
        }else{
          switch(this.dataBind.type) {
            case "0": //目录 只能选目录
              if(parentItem.type!="0") {
                callback(new Error("类型为目录时，父菜单类型只能是目录"));
              }
              break;
            case "1": //菜单 只能选目录
              if(parentItem.type!="0") {
                callback(new Error("类型为菜单时，父菜单类型只能是目录"));
              }
              break;
            case "2": //按钮 只能选菜单
              if(parentItem.type!="1") {
                callback(new Error("类型为按钮时，父菜单类型只能是菜单"));
              }
              break;
          }
        } 
      }
      callback();
    };

    return {
      dataBind: {},//表单绑定对象
      menuTypeList: menuTypeList,
      loadingSave: false,//保存 loading
      parentMenuOption: [],//父菜单列表 
      reportOptions:[],//报表模板--下拉options
      isIndividualMenu: "0",//是否为配置化菜单 包括配置组件菜单 配置页面菜单
      yesNoOptions: [{
        value: "1",
        label: "是"
      },{
        value: "0",
        label: "否"
      }],
      configMenuOptions,
      rules: {
        type: [
          { required: true,message: "菜单类型不能为空",trigger: "change" }
        ],
        pk_menu_pid: [
          { required: true,validator: validatePId,trigger: "change" }
        ],
        meta_component_code: [
          { required: true,message: "配置(组件/页面)编码不能为空",trigger: "blur" }
        ],
        meta_title: [
          { required: true,message: "菜单名称不能为空",trigger: "blur" }
        ],
        path: [
          { required: true,message: "菜单路径不能为空",trigger: "blur" }
        ],
        component_path: [
          { required: true,message: "组件路径不得为空",trigger: "blur" }
        ],
        redirect: [
          { required: true,message: "若不跳转设置为:noredirect",trigger: "blur" }
        ],
        name: [
          { required: true,message: "子路由组件路径对应的组件Name",trigger: "blur" }
        ],
        is_layout: [
          { required: true,message: "默认布局一般用于一级目录",trigger: "change" }
        ]
      },
      //========================================icon select dialog=================================
      iconSelectObj: {
        visible: false, //新增编辑组件 visible
      }
    };
  },
  computed: {
  },
  watch: {
    params(newVal,oldVal) {
      let copy={
        always_show: "1",
        component_path: "/layout",
        hidden: "",
        is_layout: "1",
        meta_code: "",
        meta_component_code: "",
        meta_icon: "edit",
        meta_title: "",
        name: "",
        path: "",
        pk_menu_id: "",
        pk_menu_pid: "",
        redirect: "noredirect",
        remark: "",
        sortindex: "0",
        type: "0"
      };
      //1 deep copy
      if(newVal&&JSON.stringify(newVal)!="{}") {
        copy=deepCopy(Object.assign({},copy,newVal));
      }
      //2 set attr from copy obj 
      this.dataBind=Object.assign({},this.dataBind,copy);
 
      if(this.dataBind.meta_component_code) {
        let option = this.configMenuOptions.find(c=>c.path == this.dataBind.component_path); 
        this.isIndividualMenu=option.value;
      } else {
        this.isIndividualMenu="0";
      }

      //3 clear validate 
      if(this.$refs["dataForm"]) {
        this.$refs["dataForm"].clearValidate();
      }
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData: function() {
      this.getParentMenuList();
    },
    /**
     * @name: 获取父菜单列表
     * @param {type} 
     * @return: 
     * @other: 
     */
    getParentMenuList: function() {
      fetchMenuForList().then(response => {
        this.parentMenuOption=response.data;
        this.$nextTick(() => {
          if(this.dataBind.type) {
            this.$refs.selectSingleTree.filter(this.dataBind.type);
          }
        })
      }).catch(error => {
        this.$notify.error({ title: "获取父菜单",message: error,duration: 2000 });
      });
    },
    /**
     * @name: 父菜单节点过滤
     * @param {type} 
     * @return: 
     * @other: 
     */
    filterNode(type,data) {
      if(!type)
        return true;
      else {
        if(type=="2") {//按钮
          return data.type=="1"; //父节点只给菜单
        } else {//目录或菜单
          return data.type=="0"; //父节点只给目录
        }
      }
    },
    /**
     * @name: 菜单类型下拉change 
     */
    typeChange: function(type) {
      this.dataBind.pk_menu_pid="";
      this.$refs.selectSingleTree.filter(type);
      if (type == "1") {
        //选中类型为菜单时 清空组件路径值 防止忘记修改组件路径
        this.dataBind.component_path = "";
      }
    },
    /**
     * @name: 配置化菜单 change
     */
    individualMenuChange:function(val){
        let option = this.configMenuOptions.find(c=>c.value == val);
        if (option) {
          this.dataBind.component_path = option.path;
        }else{
          this.dataBind.component_path = "";
        }

        if (val == "4" && this.reportOptions.length == 0) {//报表模板
          this.getReportOptions();//获取报表下拉
        } 
    },
    /**
     * @name: 自定义tree label显示内容 这里是为了国际化
     * @param {type} 
     * @return: 
     * @other: 
     */
    renderContent(h,{ node,data,store }) {
      return (
        <span>
          <span>{this.$te(`route.${node.label}`)? this.$t(`route.${node.label}`):node.label}</span>
          <span>-</span>
          <span>{this.menuTypeList.find(c => c.value==data.type).label}</span>
        </span>);
    },
    /**
     * @name: 选择icon
     * @param {type} 
     * @return:  
     */
    handleSymbol: function() {
      this.iconSelectObj.visible=true;
    },
    /**
     * @name: 选择icon callback
     * @param {newIcon} new iconName (like table)
     * @return: 
     * @other: 
     */
    iconSelectCallback: function(newIcon) {
      if(newIcon) {
        this.dataBind.meta_icon=newIcon
      }
    },
    /**
     * @name: 配置化菜单为报表模板时，显示的报表下拉
     * @param {type} 
     * @return: 
     * @other: 
     */
    getReportOptions:function(){
        // fetchReportModelAll().then(response=>{
        //   if (response.data && response.data.length > 0) {
        //       this.reportOptions = response.data;
        //   }
        // }).catch(error=>{
        //     this.$notify.error({ title: "获取报表下拉",message: error,duration: 2000 }); 
        // });
    },
    handleClose() {
      if(this.visible) {
        this.$emit("update:visible",false);
      }
    },
    test: function() {
      // eslint-disable-next-line no-console
      console.log(this.$t('table.confirm'));
    },
    /**
     * @name: 处理保存参数
     * @param {type} 
     * @return: 
     * @other: 
     */
    hanldeParams: function() {
      let result={};
      let form=this.dataBind;
      switch(form.type) {
        case "0":
          result={
            type: form.type,
            pk_menu_pid: form.pk_menu_pid,
            meta_title: form.meta_title,
            meta_icon: form.meta_icon,
            meta_code: form.meta_code,
            path: form.path,
            component_path: form.component_path,
            redirect: form.redirect,
            always_show: form.always_show,
            is_layout: form.is_layout,
            hidden: form.hidden,
            sortindex: form.sortindex,
            remark: form.remark
          };
          break;
        case "1":
          result={
            type: form.type,
            pk_menu_pid: form.pk_menu_pid,
            meta_title: form.meta_title,
            meta_icon: form.meta_icon,
            meta_code: form.meta_code,
            path: form.path,
            component_path: form.component_path,
            name: form.name,
            hidden: form.hidden,
            sortindex: form.sortindex,
            remark: form.remark
          };
          let option = this.configMenuOptions.find(c=>c.value == this.isIndividualMenu);
          if (option && option.path) {
              result["meta_component_code"]=form.meta_component_code
          }else{
            result["meta_component_code"]=""
          } 
          break;
        case "2":
          result={
            type: form.type,
            pk_menu_pid: form.pk_menu_pid,
            meta_title: form.meta_title,
            meta_code: form.meta_code,
            sortindex: form.sortindex,
            remark: form.remark
          };
          break;
        default:
          break;
      }

      return { ...result,pk_menu_id: form.pk_menu_id };
    },
    handleSave() {
      this.$refs["dataForm"].validate(valid => {
        if(valid) {
          let saveParams=this.hanldeParams();
          this.loadingSave=true;
          saveOrUpdateMenu(saveParams).then(response => {
            this.loadingSave=false;
            this.$notify({ title: '成功',message: "操作成功",type: 'success',duration: 2000 })
            this.handleClose();
            this.$emit("save",response.data);
          }).catch(error => {
            this.loadingSave=false;
            this.$notify.error({ title: "保存菜单",message: error,duration: 2000 });
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.form-input-line {
  width: 530px;
}
</style>

<style>
.editDialogMenuEdit {
  width: 800px;
}
</style>