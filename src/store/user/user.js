//
import { reqGetCode, reqRegister, reqUserInfo } from '@/api'
const state = {
    Code: '',
    userInfo:{}
}
const mutations = {
    GETCODEDATA(state, Code) {
        state.Code = Code
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo 
    }
}
const actions = {
    //获取验证吗
    async getCode({ commit }, phone) {
        let res = await reqGetCode(phone)
        console.log(res);
        if (res.data.code == 200) {
            let resData = res.data.data
            commit('GETCODEDATA', resData)
        }
    },
    //注册账户
    async userRegister({ commit }, userData) {
        console.log(userData,'注册账户');
        let res = await reqRegister(userData)
        console.log(res,'注册账号的数据');
        if (res.data.code == 200) {
            return 'ok'
        } else if (res.data.code == 223) {
            return '账户以及被注册'
        } else {
            return 'fail'
        }
    },
    //通过token获取用户信息
    async getUserInfo({ commit }){
        let res = await reqUserInfo()
        console.log(res,'通过token获取用户信息');
        if(res.data.code==200){
            commit('GETUSERINFO',res.data.data || {})
        }
    }
}
//简化数据而生，类似计算属性
const getters = {
    
}
export default {
    state, mutations, actions, getters
}