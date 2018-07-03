<template>
  <div class='signout'>
    <header>
      <span @click='backs'>  <返回 </span>
      <span>设置</span>
      <span></span>
    </header>
    <section>
        <ul>
          <li>
              <span class='head'>我的头像</span>
              <img class='avatar' :src="url" alt="">
              <input @change='fileUpload' type="file" class='file-input'>
          </li>
          <li>
            <span>用户名</span><span>路飞</span>
          </li>
        </ul>
        <button @click='signouts'>退出登录</button>
        <Toast ref='toa'></Toast>
    </section>
  </div>
</template>

<script>
import {getCookie,delCookie} from '../../../utils/cookie'
export default {
  data(){
    return {
      url:'/static/img/a.jpg'
    }
  },
  methods:{
    signouts(){
      if(confirm('确定要退出吗?')){
        delCookie('token');
        this.$toastBus.$emit('toast',"您已退出,即将返回首页")
        setTimeout(()=>{
          this.$router.push('/index/home')
        },1000)
      }
    },
    backs(){
      this.$router.go(-1)
    },
    fileUpload(e){
      // console.log(e.target.files)
      let fd=new FormData();
      fd.append('img',e.target.files[0])
      this.$http.post('/api/upload',fd).then(res=>{
        console.log(res)
        this.url=res.url;
        localStorage.setItem('upimg',this.url)
      })
    }
  },
  mounted(){
    this.url=localStorage.getItem('upimg')
  }
}
</script>

<style>
.signout{
  width:100%;
  height:100%;
  font-size:.32rem;
  background:rgb(236, 234, 234);
  display:flex;
  flex-direction: column;
}
header{
  width:100%;
  height:.8rem;
  line-height:.8rem;
  display:flex;
  justify-content: space-between;
  background:#fff;
}
section{
  flex:1;
  margin-top:.2rem;
  overflow: hidden;
}
section ul{
  width:100%;
  background:#fff
}
ul li{
  width:100%;
  height:1rem;
  line-height:1rem;
  border-bottom:1px solid rgb(236, 234, 234);
  display:flex;
  justify-content: space-between;
}
button{
  width:50%;
  height:1rem;
  color:#fff;
  line-height:1rem;
  text-align:center;
  border:0;
  outline:none;
  border-radius:.5rem;
  margin-left:25%;
  background:rgb(252, 48, 48);
  margin-top:.4rem;
}
.head{
  width:30%;
}
.avatar{
  width:.8rem;
  height:.8rem;
  border-radius:50%;
  border:1px solid #ccc;
  display:block;
}
.file-input{
  width:100%;
  height:1rem;
  position:fixed;
  top:1rem;
  left:0;
  opacity: 0;
}
</style>
