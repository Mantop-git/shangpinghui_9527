//search组件的小仓库
import { reqCartList } from '@/api'
const state = {
    shopCartList: []
}
const mutations = {
    GETSHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
        // console.log(state.shopCartList, 'sssssssssssssssssssssssssssssssssssss');
    }
}
const actions = {
    async getShopCartList({ commit }) {
        let res = await reqCartList()
        // console.log(res, 'sssssssssssssssssssss');
        if (res.data.code == 200) {
            let resData = res.data
            commit('GETSHOPCARTLIST', resData)
        }


    }
}
//简化数据而生，类似计算属性
const getters = {
    cartInfoList(state) {
        let cartInfoListArr = state.shopCartList.data || []
        let arr = cartInfoListArr[0] || {}
        let last = arr.cartInfoList || []
        return last || []

        // return cartInfoList || {}
        // // return cartInfoList || []
    }
}
export default {
    state, mutations, actions, getters
}