import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as API from '@/api'


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

//引入elementjs 
import './plugins/element.js'

//引入表单校验
import './plugins/validate.js'

//引入图片懒加载
import VueLazyload from 'vue-lazyload'

// import atm from '@/assets/1.gif'


Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: require('@/assets/1.gif'),
  attempt: 1
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
  //全局事件总线$bus /任何组件通信
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  }
}).$mount('#app')
