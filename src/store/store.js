import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {instance} from '../utils/http.js'
import {getCookie} from '../utils/cookie'
import router from '../router/router'
let store=new Vuex.Store({
  state:{
    data:{},
    data1:{},
    shopItem:[],
    addrecip:[]
  },
  mutations:{
    updataData(state,payload){
      let o = { ...state.data };
      o[payload.id]=payload.data.secondLevelCategories;
      state.data=o
    },
    updataDetail(state,payload){
      state.data1=[...state.data1,...payload]
      console.log(state.data1)
    },
    updateShopItem(state,payload){
      state.shopItem=payload;
    },
    updataAddrecip(state,payload){
      state.addrecip=payload
      // console.log(state.addrecip)
    }
  },
  actions:{
    fetchData({state,commit},cid){
      if(!state.data[cid]){
        instance.get(`/api/classify?cid=${cid}`).then(res=>{
          // this.con=res.secondLevelCategories;
          commit('updataData',{
            id:cid,
            data:res
          })
        })
      }
    },
    fetchShopItem({commit}){
      instance.post('/api/shop',{
        token:getCookie('token')
      }).then(res=>{
        if(res.code==0){
          if((confirm('登录超时,重新登录'))){
            router.push({
              name:'login',
              query:{
                from:'shopcart'
              }
            })
          }
        }else{
          commit('updateShopItem',res.data)
        }
      })
    }
  },
  getters:{},
  modules:{}
})
store.subscribe(()=>{
  console.log(store.state.data)
})
export default store
