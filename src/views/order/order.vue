<template>
  <div class='order'>
    <header >
      <i class='icon iconfont' @click='backs'>&#xe653;</i>
      <h3>我的订单</h3>
      <span>❤</span>
    </header>
    <section>
      <nav class='nav'>
        <router-link to='/order/all'>
          <span>全部</span>
        </router-link>
        <router-link to='/order/pendpayment'>
          <span>待付款</span>
        </router-link>
        <router-link to='/order/delivered'>
          <span>待发货</span>
        </router-link>
        <router-link to='/order/receivegoods'>
          <span>待收货</span>
        </router-link>
        <router-link to='/order/aftersales'>
          <span>售后</span>
        </router-link>
      </nav>
      <div class='order-sec'>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  methods:{
    backs(){
      this.$router.push('/index/shopcart')
    }
  }
}
</script>

<style>
.order{
  width:100%;
  height:100%;
  overflow:hidden;
  font-size:.32rem;
  display: flex;
  flex-direction: column;
}
header{
  flex-shrink: 0;
  width:100%;
  height:.8rem;
  line-height:.8rem;
  border-bottom:1px solid #ccc;
  display:flex;
  justify-content: space-between;
}
section{
  flex: 1;
  overflow:hidden;
  display:flex;
  flex-direction: column;
}

section .nav{
  flex-shrink: 0;
  width:100%;
  height:.7rem;
  line-height: .7rem;
  border:1px solid #ccc;
  display:flex;
}
section .nav a{
  flex:1;
  text-align:center;
  text-decoration: none;
  color:black;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
section .order-sec{
  flex: 1;
  overflow-y:scroll;
}
</style>

