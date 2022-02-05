import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'

export default new Vuex.Store({
  state: {
    count:1
  },
  mutations: {
    ADD(state){
      console.log(state,'state');
      state.count++
    }
  },
  actions: {
    add({commit}){
      console.log(commit,'commit');
      commit("ADD")
    }
  },
  modules: {
    home,
    search,
    detail,
    shopcart
  }
})
