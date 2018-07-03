<template>
  <div class='recipient'>
    <header>
      <span @click='backs'><返回</span>
      收件人</header>
    <section>
      <div>
        <input type="text" placeholder="收件人 汉字 字母" v-model='name'>
        <input type="text" placeholder="手机号" v-model='phone'>
        <div class='select'>
          <div class="select-cle">
            <div class='select-opt'>
              <multiselect
                v-model="province"
                :options="provlist"
                placeholder="请选择省份"
                label='name'
                @select='provChange'>
              </multiselect>
            </div>
            <div class='select-opt'>
              <multiselect
                v-model="city"
                :options="citylist"
                placeholder="请选择城市"
                label='name'
                @input='cityChange'>
              </multiselect>
            </div>
          </div>
          <multiselect
            v-model="area"
            :options="arealist"
            placeholder="请选择地区">
          </multiselect>
          <input type="text" placeholder="详细地址" v-model='street'>
        </div>

      </div>

      <button class='btns' @click='save'>保存</button>
    </section>
    <Toast />
  </div>
</template>

<script>
import multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css';
import {anotherInstance} from '../../../../utils/http'
import {getCookie,bus} from '../../../../utils/cookie'
export default {
  data () {
    return {
      name:"",
      phone:'',
      street:'',
      province: [],
      city:[],
      area:'',
      provlist:[],
      citylist:[],
      arealist:[]
    }
  },
  created(){
    anotherInstance.get('/static/address/address.json').then(res=>{
      this.provlist=res.data
    })
  },
  methods:{
    provChange(a,b){
      this.citylist=a.city;
      this.city='';
      this.area='';
    },
    cityChange(a){
     this.arealist=a.area;
     this.area=''
    },
    save(){
      // console.log(this.province,this.city,this.area,this.street);
      let data={
        province:this.province.name,
        city:this.city.name,
        area:this.area,
        street:this.street,
        phone:this.phone,
        name:this.name
      }
      if(!data.province||!data.city||!data.area){
        this.$toastBus.$emit('toast','请填写完信息');
        return;
      }
      let username=/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;//只含有汉字、数字、字母、下划线不能以下划线开头和结尾
      let phoneReg=/^1[3579]\d{9}$/;
      if(!username.test(data.name)){
        this.$toastBus.$emit('toast','请填写正确用户名');
      }
      if(!phoneReg.test(data.phone)){
        this.$toastBus.$emit('toast','请填写正确手机号');
        return;
      }
      this.$http.post('/api/addrecip',{
        token:getCookie('token'),
        data
      }).then(res=>{
        if(res.code==1){
          // console.log(res.data)
          // bus.$emit('addrecip',res.data)
          this.$store.commit('updataAddrecip',res.data)
          this.$toastBus.$emit('toast',res.msg);
          setTimeout(()=>{
            this.$router.push({
              name:"address"
            });
          },1500)
        }
        if(res.code==0){
          this.$toastBus.$emit('toast',res.msg);
          setTimeout(()=>{
            this.$router.push({
              name:"login",
              query:{
                from:'recipient'
              }
            });
          },1500)
        }
      })
    },
    backs(){
      this.$router.push('/address')
    }
  },
  components: { multiselect }
}
</script>

<style>
.select{
  width:100%;
  height:5rem;
  overflow:hidden;
}
.select-cle{
  width:100%;
  display:flex;
}
.select-opt{
  flex:1;
  margin:.1rem 0;
}
.recipient{
  width:100%;
  height:100%;
  font-size:.32rem;
}
header{
  width:100%;
  height:.8rem;
  line-height:.8rem;
  text-align:center;
  font-size:.34rem;
}
.btns{
  width:50%;
  height:.8rem;
  line-height:.8rem;
  color:#fff;
  text-align:center;
  background:red;
  border:0;
  outline:none;
  border-radius:.5rem;
  margin-left:25%;
  margin-top:.2rem;
}
</style>
