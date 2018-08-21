// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import "../static/css/reset.css";
import axios from 'axios'

//引入ueditor相关的配置
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.js'

// 引入mock文件
// require('./mock/mock')

Vue.config.productionTip = false
Vue.prototype.$axios=axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})

