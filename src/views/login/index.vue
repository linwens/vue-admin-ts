<template>
  <div id="login" class="tc">
    <el-form>
      <el-form-item class="w450 h50 ma">
        <el-input
          placeholder="请输入账户"
          prefix-icon="el-icon-search"
          v-model="username">
        </el-input>
      </el-form-item>
      <el-form-item class="w450 h50 ma">
        <el-input
          class="w450 h50"
          placeholder="请输入密码"
          prefix-icon="el-icon-search"
          v-model="password">
        </el-input>
      </el-form-item>
      <el-button class="w450" type="primary" plain @click="goLogin">登录</el-button>
    </el-form>
    <span class="cl-w">游客请访问：guest / 123456</span>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { doLogin } from '@/api/login'

@Component
export default class Login extends Vue {
  // data
  username = 'admin';
  password = '123456';
  //method
  goLogin (){
    doLogin({
      username: this.username,
      password: this.password
    }).then(res=>{
      console.log(res);
    })
  }
}
</script>
<style lang="less">
  #login{
    background-color: rgb(56, 47, 128);
  }
</style>


