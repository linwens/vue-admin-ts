import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/common.less'
import Icon from 'vue-awesome/components/Icon.vue'

// 全局注册（在 `main .js` 文件中）
Vue.component('v-icon', Icon)
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
