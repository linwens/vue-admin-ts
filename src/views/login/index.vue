<template>
  <div id="login" class="pos-a df s-jcc s-aic bg-darkblue">
    <div>
      <h2 class="tc mb20 fs32 cl-w">vue-admin-typescript</h2>
      <el-form>
        <el-form-item class="login-fi df w430 ma mb20 bd br5">
          <el-input
            class="w430"
            placeholder="请输入账户"
            v-model="username">
            <v-icon slot="prefix" name="user" style="color: #c0c4cc;"></v-icon>
          </el-input>
        </el-form-item>
        <el-form-item class="login-fi df w430 ma mb20 bd br5">
          <el-input
            show-password
            class="w430"
            placeholder="请输入密码"
            v-model="password">
            <v-icon slot="prefix" name="lock" style="color: #c0c4cc;"></v-icon>
          </el-input>
        </el-form-item>
        <el-button class="w450 h62 fs18 mb10" type="primary" plain @click="goLogin">登录</el-button>
      </el-form>
      <p class="cl-w mb10">游客请访问：guest / 123456</p>
      <test />
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { dispatchLogin } from '@/store/dispatchs/user';
import { Route } from 'vue-router';
import Test from '@/components/test.vue'
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/lock'
import {State, namespace} from 'vuex-class'

const UserState = namespace('user', State);
@Component({
  components: {
    Test,
  }
})
export default class Login extends Vue {
  //store
  @UserState('uid') userUid
  // props
  @Prop(Number) private readonly propA!: number
  // data
  private username = 'koa';
  private password = '';
  private redirect: string | undefined = undefined;
  // computed
  get calc() {
    return ''
  }
  // watch
  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as string" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    this.redirect = route.query && route.query.redirect as string;
  }
  // 钩子函数
  private created() {
    console.log(this.$store.state.User.uid);
    console.log(`测试vuex-class-----> `);
    console.log(this.userUid);
  }
  // method
  private goLogin() {
    dispatchLogin({
      username: this.username,
      password: this.password,
    }).then( () => {
      this.$router.push({ path: this.redirect || '/' })
    })
  }
}
</script>
<style lang="less">
  #login{
    height: 100%;
    width: 100%;
    .login-fi{
      padding: 10px;
      background: rgba(0,0,0,0.27);

    }
    .el-input__inner{
      width: 100%;
      border: none;
      background: rgba(0,0,0,0);
      color: rgb(192, 196, 204);
    }
  }
</style>


