import '@/assets/less/less.less'

import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import store from '@/store'
import App from '@/App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import utils from '@/../../core/utils/'
import '@/../../core/components/'


Vue.use(ElementUI);

// 路由拦截器
router.beforeEach((to, from, next) => {
  next()
})

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});



// **************** （注意：该全局变量仅用于开发环境调试） ****************
if (process.env.NODE_ENV === 'development') {
  window.Vue = Vue
  // window.XEUtils = XEUtils
  window.store = store
  window.router = router
}
// **************** （注意：该全局变量仅用于开发环境调试） ****************

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
