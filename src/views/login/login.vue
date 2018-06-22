<template>
  <div class='login'>
    <div class='login-header'>
      <span></span><h3>登录</h3><span @click='toRegister'>注册</span>
    </div>
    <p>
      <label for="">登录:</label>
      <input type="text" v-model='username'>
    </p>
    <p>
      <label for="">密码:</label>
      <input type="password" v-model='password'>
    </p>
    <button class='login-btn' @click='goLogin'>登录</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username:'',
      password:''
    }
  },
  methods:{
    toRegister(){
      this.$router.push('/register')
    },
    goLogin(){
      let phoneReg=/^1[3578]\d{9}$/;
      let pwdReg=/\d{6,}/;
      if(!phoneReg.test(this.username)){
        alert('请输入正确手机号')
        return;
      }
      if(!pwdReg.test(this.password)){
        alert('请输入正确格式的密码');
        return;
      }
      this.$http.post('/api/login',{
        username:this.username,
        password:this.password
      }).then(res=>{
        console.log(res);
        if(res.code==1){
          document.cookie=`token=${res.token}`;
        // console.log(this.$route.query.from)
          this.$router.push({
            name:this.$route.query.from || 'home'
          })
        }else{
          console.log(res.msg);
          this.$router.push('/register')
        }
      })
    }
  }
}
</script>

<style src='./login.css'>

</style>
