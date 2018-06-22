<template>
  <div>
    <header class='header'>
      <img class='logo' src="../../../static/img/log.png" alt="">
      <input @click='search' type="text" placeholder='请输入您要购买的商品'>
      <i class='icon iconfont ss'>&#xe729;</i>
      <div class='header-right'>
        <p>
          <i class='icon iconfont'>&#xe618;</i>
          <span>我的店铺</span>
        </p>
        <p>
          <i class='icon iconfont'>&#xe60e;</i>
          <span>消息</span>
        </p>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  methods:{
    search(){
      this.$router.push({name:'search'})
    }
  }
}
</script>

<style src='./header.css'>

</style>
