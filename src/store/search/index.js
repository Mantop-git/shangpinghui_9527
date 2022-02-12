//search组件的小仓库
import { reqGetSearchInfo } from '@/api'
const state = {
    searchList: {},
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    //获取search模块数据 ={} 给默认空对象
    async getSearchList({ commit }, params = {}) {
        // debugger
        let res = await reqGetSearchInfo(params);
        if (res.data.code == 200) {
            commit('GETSEARCHLIST', res.data.data)
        }
        console.log(res, '获取search模块数据 ');
    }
}
//简化数据而生，类似计算属性
const getters = {
    searchGetter(state) {
        // console.log(a,'当前state对象');
        console.log(state, '当前getters仓库的state对象');
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
}
export default {
    state, mutations, actions, getters
}