<template>
  <dl class='home-dl'  @click='()=>{dialog(data,data.wareId)}'>
    <dt @click='()=>{details(data)}'>
      <img v-lazy='data.imageurl' alt="">
    </dt>
    <dd class='home-dd'>
      <span class='home-name'>{{data.wname}}</span>
      <span >{{data.jdPrice}}</span>
      <i @click.stop='shopCar' class='icon iconfont'>&#xe63c;</i>
    </dd>
  </dl>
</template>

<script>
import {getCookie} from '../../utils/cookie'
export default {
  props:{
    data:{
      type:Object
    }
  },
  methods:{
    dialog(data,id){
      console.log(data,id)
      this.$router.push({
        name:'detail',
        params:{
          data:data,
          id:id
        }
      })
    },
    shopCar(){
      this.$http.post('/api/shopcar',{
        token:getCookie('token'),
        item:this.data
      }).then(res=>{
          if(res.code==1){
            console.log('添加成功')
          }else{
            this.$router.push({
              name:"login",
              query:{
                from:'shopcart'
              }
            })
          }
      })
    },
    details(data){
      this.$store.commit('updataDetail',data)
    }
  }
}
</script>

<style>

</style>
