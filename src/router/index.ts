import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { getToken } from '@/Utils/token'

Vue.use(Router)
const token = getToken();

const router = new Router({
  routes,
  mode: 'history'
})

// 登陆页面路由 name
const LOGIN_PAGE_NAME = 'login'

// 跳转之前
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)){ // 页面需要登陆
    if(!token){ // 未登录
      next({
        path: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      next()
    }
  } else {
    next()
  }
})


// 跳转之后
router.afterEach(to => {
  //
})

export default router