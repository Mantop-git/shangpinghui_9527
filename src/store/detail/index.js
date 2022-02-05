import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getToken } from '@/util/uuid_token.js'
const state = {
    goodsInfo: {},
    uid_token:getToken()
};
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    },
    GETSHOPCATEINFO(state, shopInfo) {
        state.shopInfo = shopInfo
    }
};
const actions = {
    async getGoodInfo({ commit }, skuId) {
        let res = await reqGoodsInfo(skuId)
        if (res.data.code == 200) {
            let resData = res.data;
            console.log(resData, 'goodsINfo');
            commit('GETGOODSINFO', resData)

        }
    },
    async getShopCateInfo({ commit }, {skuId, skuNum}   ) {
        console.log(skuId,'there are no second params');
        let res = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (res.data.code == 200) {
            // console.log('ok');
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
};
const getters = {
    categoryView(state) {
        //因为goodsInfo为异步数据当 vue渲染机制先显示初始数据，在显示带数据的数据 就是在a.b.c的时候，c还没有自然拿不到  解决方法：先赋值为{}
        let { categoryView } = state.goodsInfo.data || {}
        // console.log(categoryView, '');
        return categoryView || {}
    },
    skuInfo(state) {
        let { skuInfo } = state.goodsInfo.data || {}
        return skuInfo || {}
    },
    spuSaleAttrList(state) {
        let { spuSaleAttrList } = state.goodsInfo.data || []
        return spuSaleAttrList || []
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}