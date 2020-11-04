<!--
 * @Descripttion: 用户密码修改
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-11-01 16:14:29
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-04 17:51:43
 --> 
 <!--
<template>
  <div class="app-container">
    <el-form :inline="false" ref="dataForm" :rules="rules" :model="dataBind" label-width="120px" label-position="right" size="small">
      <el-form-item label="原始密码" prop="password">
        <el-input v-model="dataBind.password" class="form-input-item" type="password" />
      </el-form-item>
      <el-form-item label="新设密码" prop="newPassword">
        <el-input v-model="dataBind.newPassword" class="form-input-item" type="password" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="newPasswordRepeat">
        <el-input v-model="dataBind.newPasswordRepeat" class="form-input-item" type="password"  />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-left:50px">
      <el-button @click="handleSave" type="primary" :loading="loadingSave">{{ $t('table.confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
import { deepCopy } from "@/utils/arrayHelper";
import { ruleCommonValidator } from '@/utils/ruleValidator';
import { changePwd } from "@/api/user";

export default {
  name: "UserChangePwd",
  components: {},
  directives: {},
  props: {
  },
  watch: {
  },
  data() {
    const validNewPwd=(rule,value,callback) => {
      if(!this.dataBind.newPassword) {
        callback(new Error('新密码不能为空'));
      }
      if(this.dataBind.newPassword.length < 8) {
        callback(new Error('密码长度至少需8位'));
      }
      callback();
    };
    const validNewPwdRepeat=(rule,value,callback) => {
      if(!this.dataBind.newPasswordRepeat) {
        callback(new Error('确认密码不能为空'));
      }
      if(this.dataBind.newPasswordRepeat.length < 8) {
        callback(new Error('密码长度至少需8位'));
      }
      if (this.dataBind.newPassword != this.dataBind.newPasswordRepeat) {
        callback(new Error('两次输入的密码需一致'));
      }
      callback();
    };
    return {
      dataBind: {
        //放置与参数传递无关的默认参数
        password: "",
        newPassword: "",
        newPasswordRepeat: ""
      },//表单绑定对象
      loadingSave: false,//保存 loading
      rules: {
        password: [
          { required: true,message: "密码不能为空",trigger: "blur" }
        ],
        newPassword: [
          { validator: validNewPwd,trigger: "blur" }
        ],
        newPasswordRepeat: [
          { validator: validNewPwdRepeat,trigger: "blur" }
        ]
      },
      loginType: window.env.VUE_APP_LOGIN_TYPE,// process.env.VUE_APP_LOGIN_TYPE,
      loginRedirect: window.env.VUE_APP_LOGIN_REDIRECT_FULL// process.env.VUE_APP_LOGIN_REDIRECT_FULL,
    };
  },
  mounted() {
    this.initData();

  },
  methods: {
    initData: function() {
    }, 
    async logout() {
      await this.$store.dispatch('user/logout')
      if(this.loginType&&this.loginType==="SPDB") {
        window.location.href=this.loginRedirect;// `?redirect=${this.$route.fullPath}`; 
      } else {
        //默认衡泰
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    },
    handleSave() {
      this.$refs["dataForm"].validate(valid => {
        if(valid) {
         let data = {
             password: this.dataBind.password,
             newPassword:  this.dataBind.newPassword
         };
          this.loadingSave=true;
          changePwd(data).then(response => {
            this.loadingSave=false;
            this.$notify({ title: '成功',message: "密码修改成功,请重新登录",type: 'success',duration: 2000 })
            this.logout();
          }).catch(error => {
            this.loadingSave=false;
            this.$notify.error({ title: "密码修改",message: error,duration: 2000 });
          });
        }
      });
    },
  }
};
</script>
<style scoped>
.form-input-line {
  width: 530px;
}
.form-input-line-three {
  width: 870px;
}
</style> 


<style>
/**
 * 全局样式名，确保全局唯一，不污染其他组件样式
 * 若不改动其默认值800px，不改样式名也可以
 */
.editDialog {
  width: 800px;
}
</style>
 --> 


