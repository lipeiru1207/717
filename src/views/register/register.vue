<template>
  <div class='register'>
      <h3>注册</h3>
      <div class='register-form'>
        <p>
          <label for="">用户名</label><input v-model='username' type="phone"><br/>
        </p>
        <p>
          <label for="">密码</label><input v-model='password' type="password"><br/>
        </p>
        <p>
          <label for="">确认密码</label><input v-model='passwords' type="password"><br/>
        </p>
      </div>
      <button class='register-btn' @click='goRegister'>注册</button>

  </div>
</template>

<script>
export default {
  data(){
    return {
      username:'',
      password:'',
      passwords:''
    }
  },
  methods:{
    goRegister(){
      let phoneReg=/^1[3578]\d{9}$/;
      let pwdReg=/\d{6,9}/;
      if(!phoneReg.test(this.username)){
        alert('请输入正确的手机号')
        return
      }
      if(!pwdReg.test(this.password)){
        alert('请输入正确的密码')
        return
      }
      if(this.password!==this.passwords){
        alert('密码输入不一致')
        return
      }
      if(!this.username||!this.password||!this.passwords){
        alert('请填写所有信息')
        return
      }
      this.$http.post('/api/register',{
        username:this.username,
        password:this.password
      }).then(res=>{
        console.log(res)
        if(res.code==1001){
          alert('用户已存在,请重新输入')
        }else if(res.code==1002){
          console.log(this.$router)
          this.$router.push({name:'login'})
        }
      })
    }
  }
}
</script>

<style src='./register.css'>

</style>
