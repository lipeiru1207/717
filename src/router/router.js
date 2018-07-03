import Vue from 'vue'
import VueRouter from 'vue-router'
import Indexs from '../views/index/index'
import Home from '../views/home/home'
import Classify from '../views/classify/classify'
import Shopcart from '../views/shop/shopcart.vue'
import My from '../views/my/my'
import Details from '../views/details/details'
import Search from '../views/search/search'
import Login from '../views/login/login'
import Register from '../views/register/register'
import {getCookie} from '../utils/cookie'
import Order from '../views/order/order'
import All from '../views/order/all/all'
import Pendpayment from '../views/order/pendpayment/pendpayment'
import Delivered from '../views/order/delivered/delivered'
import Receivegoods from '../views/order/receivegoods/receivegoods'
import Aftersales from '../views/order/aftersales/aftersales'
import Address from '../views/my/address/address'
import Recipient from '../views/my/address/recipient/recipient'
import Signout from '../views/my/signout/signout'
Vue.use(VueRouter)
let router = new VueRouter({
  routes:[
    {
      path:"/",
      redirect:'/index/home'
    },
    {
      name:'index',
      path:'/index',
      component:Indexs,
      children:[
        {
          name:'home',
          path:'home',
          component:Home
        },
        {
          name:'classify',
          path:'classify',
          component:Classify
        },
        // {
        //   name:'shop',
        //   path:'shopcar',
        //   component:Shopcar
        // },
        {
          name:'shopcart',
          path:'shopcart',
          component:Shopcart
        },
        {
          name:'my',
          path:'my',
          component:My
        }
      ]
    },
    {
      name:'detail',
      path:'/detail',
      component:Details
    },
    {
      name:'search',
      path:'/search',
      component:Search
    },
    {
      name:'login',
      path:'/login',
      component:Login
    },
    {
      name:'register',
      path:'/register',
      component:Register
    },
    {
      name:'order',
      path:'/order',
      component:Order,
      redirect:'/order/all',
      children:[
        {
          name:'all',
          path:'all',
          component:All
        },
        {
          name:'pendpayment',
          path:'pendpayment',
          component:Pendpayment
        },
        {
          name:'delivered',
          path:'delivered',
          component:Delivered
        },
        {
          name:'receivegoods',
          path:'receivegoods',
          component:Receivegoods
        },
        {
          name:'aftersales',
          path:'aftersales',
          component:Aftersales
        }
      ]
    },
    {
      name:'address',
      path:"/address",
      component:Address
    },
    {
      name:'recipient',
      path:'/recipient',
      component:Recipient
    },
    {
      name:'signout',
      path:'/signout',
      component:Signout
    }
  ]
})
export default router
//全局守卫
router.beforeEach((to,from,next)=>{
  if(to.name==='my' || to.name ==='shopcart'){
    let token=getCookie('token');
    // console.log(token);
    if(!token){
      next({
        name:"login",
        query:{from : to.name}
      })
    }else{
      next()
    }
  }else{
    next()
  }
  // console.log(to)
})
