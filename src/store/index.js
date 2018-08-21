import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
        token:null,
        selectItem:'', 
	},
	mutations:{
        //登录时，存入token和userid
		login:(state,data)=>{
            localStorage.token = data;
            state.token = data;
        }, 
        //登出时，清除token
        logout:(state)=>{
            localStorage.removeItem('token');
            state.token = null;
        },
        //将选中的导航栏存入sessionStorage
        saveSelect:(state,index)=>{
            sessionStorage.selectItem=index;
            state.selectItem=index;
        }
    },
    getters:{
        //获取token
        getToken:state=>{
            return state.token;
        },
        //获取选中的导航栏
        getSelect:state=>{
            if(!state.selectItem){
                state.selectItem=sessionStorage.getItem('selectItem');
            }
            return state.selectItem;
        }
    }
})
