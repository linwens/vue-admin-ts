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
    <test />
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { dispatchLogin } from '@/store/dispatchs/user';
import { Route } from 'vue-router';
import Test from '@/components/test.vue'

@Component({
  components: {
    Test,
  }
})
export default class Login extends Vue {
  // props
  @Prop(Number) private readonly propA!: number
  // data
  private username = 'admin';
  private password = '123456';
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
  private created() {}
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
    background-color: rgb(56, 47, 128);
  }
</style>


