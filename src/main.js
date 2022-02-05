import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//在全局引入TypeNav组件
import TypeNav from './components/TypeNav'
Vue.component('TypeNav',TypeNav)

//引入全局组件Swiper
import Carousel from './components/Carousel';
Vue.component('Carousel', Carousel)

//引入全局组件Pagination
import Pagination from './components/Pagination'
Vue.component('Pagination', Pagination)

//引入mock模块
import '@/mock/mockServer.js';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  //全局事件总线$bus /任何组件通信
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
