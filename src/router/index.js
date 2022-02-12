import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
Vue.use(VueRouter)

// import Home from '@/pages/Home'
const Home = () => import('@/pages/Home')
// import Login from '@/pages/Login'
const Login = () => import('@/pages/Login')
// import search from '@/pages/search'
const Register = () => import('@/pages/Register')
// import Register from '@/pages/Register'
const Search = () => import('@/pages/Search')
// import Search from '@/pages/Search'
const Detail = () => import('@/pages/Detail')
// import Detail from '@/pages/Detail'
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
// import AddCartSuccess from '@/pages/AddCartSuccess'
const ShopCart = () => import('@/pages/ShopCart')
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import GroupOrder from '@/pages/Center/groupOrder'
import MyOrder from '@/pages/Center/myOrder'
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
    name: 'AddCartSuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: {
      isShow: true
    }
  },
  {
    name: 'ShopCart',
    path: '/shopcart',
    component: ShopCart,
    meta: {
      isShow: true
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    meta: {
      isShow: false
    }
  },
  {
    name: 'Trade',
    path: '/trade',
    component: () => import('@/pages/Trade'), //;路由懒加载
    meta: {
      isShow: true
    },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false) //停留在当前
      }
    }
  },
  {
    name: 'Pay',
    path: '/pay',
    component: Pay,
    meta: {
      isShow: true
    }
  },
  {
    name: 'PaySuccess',
    path: '/paysuccess',
    component: PaySuccess,
    meta: {
      isShow: true
    },

  },
  {
    name: 'Center',
    path: '/center',
    component: Center,
    meta: {
      isShow: true
    },
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'grouporder',
        component: GroupOrder,
      },
      {
        path: '/center',
        redirect: '/center/myorder',
      },

    ],

  }

]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) { //路由跳转滚动条位置
    return { y: 0 } //y不能为负数
  }
})

router.beforeEach(async (to, from, next) => {   
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
  let token = sessionStorage.getItem('token')
  let name = store.state.user.userInfo.name
  console.log(name, '如果在其他组件上不存在name就调用方法重新渲染');
  // console.log(token,to,'ssssssssssssssssss');
  if (token && to.path == '/login') {
    next('/home')
  }
  if (name) {
    next()
  } else {
    await store.dispatch('getUserInfo')
  }

  if (!token && to.path == '/pay' | to.path == '/paysuccess' | to.path =='/center/myorder') {
        // console.log(to,from,'toto');
    next('/login?redirect='+to.path)
  }
  if (!token && to.path =='/addcartsuccess'){
    next('/detail')
  }


})

export default router
