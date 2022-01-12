import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/pages/Home'
import Login from '@/pages/Login'
// import search from '@/pages/search'
import Register from '@/pages/Register'
import Search from '@/pages/search'
const routes = [
  {
    path: '*',
    redirect: '/home',
    meta: {
      isShow: true
    }
  },

  {
    path: '/home',
    component: Home,
    meta: {
      isShow: true
    }
    // component: () => import('@/pages/Home')
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isShow: false
    }
  },

  {
    path: '/register',
    component: Register,
    meta: {
      isShow: false
    }
  },
  {
    path:'/search:keyWords',
    component:Search,
    meta:{
      isShow:true
    },
    name:'Search'
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
