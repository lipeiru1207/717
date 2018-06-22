<template>
  <div>
    <div>
      <h3 @click='back'>返回</h3>
      <img :src="data.imageurl" alt="">
      <p>{{data.wname}}</p>
      <span>{{data.jdPrice}}</span>
    </div>
    <!-- {{this.$route.params.data}} -->
  </div>
</template>

<script>
export default {
  data(){
    return {
      data:this.$route.params.data||this.$store.state.data1,
      page:this.$route.params.page
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  },
  // computed:{
  //   console.log(this.$store.state.data1)
  // },
  mounted(){

    // this.$http(`http://localhost:3000/index/recommend.action?page=${this.page}`).then(res=>{
    //   console.log(this.list)
    // })
  }
}
</script>

<style>

</style>
