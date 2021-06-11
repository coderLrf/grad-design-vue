import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import store from './vuex/store'

import App from './App.vue'
import router from './router'
// 引入axios
import axios from 'axios'
// 挂载axios
Vue.prototype.$axios = axios
// 设置访问根路径
// axios.defaults.baseURL = "http://localhost:9527"

Vue.prototype.$ = $

Vue.config.productionTip = false

// vue的全局模板挂载模板
Vue.prototype.$store = store

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
