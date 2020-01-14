// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store'
import './pul/jquery-3.2.1.min.js'
import './pul/jquery.cookie.js'
import './pul/cors.js'
import './pul/exk'
//5:引入axios模块
import axios from "axios"
//6:配置服务器基础路径
axios.defaults.baseURL='https://192.168.0.105:7443/';
//8:axios 注册vue
Vue.prototype.axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  store
})
