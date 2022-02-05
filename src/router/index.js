import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/pages/Home'
import Login from '@/pages/Login'
// import search from '@/pages/search'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
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
    path: '/detail/:skuId',
    component: Detail,
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
    name: 'Search',
    path: '/search/:keyword?',
    component: Search,
    meta: {
      isShow: true
    },

  },
  {
    name:'AddCartSuccess',
    path:'/addcartsuccess',
    component: AddCartSuccess,
    meta: {
      isShow: true
    }
  },
  {
    name: 'ShopCart',
    path:'/shopcart',
    component: ShopCart,
    meta: {
      isShow: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) { //路由跳转滚动条位置
    return { y: 0 } //y不能为负数
  }
})

export default router
