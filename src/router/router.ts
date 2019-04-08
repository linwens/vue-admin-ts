// import Home from './views/Home.vue';
/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 * @param {boolen} auth 是否要登陆
 */
import Home from '@/views/Home.vue';
export default [
    {
      path: '/',
      name: 'home',
      // component: Home,
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: {
        icon: '',
        keepAlive: true,
        title: 'login'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      meta: {
        icon: '',
        keepAlive: true,
        title: 'about',
        auth: false
      }
    },
    {
      path: '/articles',
      component: Home,
      name: 'articles',
      redirect: '/articles/list',
      meta: {
        auth: false
      },
      children:[
        {
          path: 'list',
          name: 'List',
          component: () => import(/* webpackChunkName: "table" */ '@/views/articles/list.vue'),
          meta: { 
            title: 'articlesList', 
            icon: '' 
          },
        },
        {
          path: 'edit',
          name: 'Edit',
          component: () => import(/* webpackChunkName: "table" */ '@/views/articles/edit.vue'),
          meta: { 
            title: 'articlesEdit', 
            icon: '' 
          },
        },
      ]
    },
  ];