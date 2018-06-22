<template>
  <div>
    <header>
      <span @click='backs'>返回</span>
      <input @input='search' type="text" v-model='keywords'>
    </header>
    <div v-html='data'>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      keywords:'',
      data:''
    }
  },
  methods:{
    search(){
      this.$http.get(`https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr=${this.keywords}&dotime=1528960226000`).then(res=>{
        this.data=res
      })
    },
    backs(){
      this.$router.push({name:'home'})
    }
  }
}
</script>

<style>

</style>
