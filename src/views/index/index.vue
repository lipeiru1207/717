<template>
  <div class='wrap'>
    <Header />
    <section>
      <router-view></router-view>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
export default {
  name: 'app',
  components:{
    Header,
    Footer
  }
}
</script>

<style src='./index.css'>

</style>
