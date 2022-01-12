//home组件的小仓库
import { reqCategoryList, reqGetBannerList} from '@/api'

const state = {
    categoryList:[],
    bannerList:[]
}
//类似methods
    //mutations通过调用actions的'CATEGORYLIST' 接收actions传过来的res.data 赋值给categoryList 在通过 state.categoryList=categoryLists state就收到了数据
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    //获取轮播图
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList
    }
}
//异步请求在这里
const actions = {
    //actions 将 "CATEGORYLIST" commit给mutation，将res.data作为参数传给mutations 
    async getCategoryList({ commit }){
        let res = await reqCategoryList();
        if (res.data.code==200){
            let resData=res.data;
            commit('CATEGORYLIST', resData)
        }
        console.log(res);
    },
    //获取mock中的banner数据
    async getBannerList({commit}){
        let res = await reqGetBannerList();
        if(res.data.code==200){
            commit('BANNERLIST',res.data)
        }
        console.log(res,'mockREs');
    }
}
//类似computed属性
const getters = {}
export default {
    state, mutations, actions, getters
}