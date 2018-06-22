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
    }
  ]
})
export default router
router.beforeEach((to,from,next)=>{
  if(to.name==='my' || to.name ==='shopcart'){
    let token=getCookie('token');
    console.log(token);
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
  console.log(to)
})
