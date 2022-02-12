import { reqAddressInfo, reqOrderInfo} from '@/api'
const state={
    userAddressList:[],
    orderInfo:{}
}
const mutations={
    GETUSERADDRESS (state, userAddressList){
        state.userAddressList = userAddressList
    },
    GETORDERINFO(state, orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions={
    async getUserAddress({commit}){
        let res = await reqAddressInfo()
        // console.log(res,'addresssssssssssssssssssssss');
        if(res.data.code==200){
            let resData=res.data.data || []
            commit('GETUSERADDRESS',resData)
        }
    },
    async getOrderInfo({commit}){
        let res = await reqOrderInfo()
        // console.log(res,'orderrrrrrr');
        if (res.data.code == 200) {
            let resData = res.data.data || {}
            commit('GETORDERINFO', resData)
        }
    }
}
const getters={

}

export default  { state, mutations, actions, getters}