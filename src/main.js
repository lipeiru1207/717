import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import './font/demo.css'
import 'swiper/dist/css/swiper.css'
import http from './utils/http'
import vueLazyload from 'vue-lazyload'
Vue.use(vueLazyload,{
  loading:'../static/img/loading.gif'
})
Vue.use(http)
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
