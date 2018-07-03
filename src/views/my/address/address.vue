<template>
    <div class='address'>
      <header>
        <span @click='back'> 返回</span>
        <h3>收货地址</h3>
        <span></span>
      </header>
      <section>
        <div class='add-sec'>
          <div class='list' v-show='data.length==0'>
              请添加收货地址!!!
          </div>
          <ul class='addul'>
            <li class='addli' v-for='(item,index) in data' :key='index'>
              <p class='addperson'>
                <span>收货人: {{item.name}}</span>
                <span>{{item.phone}}</span>
              </p>
              <span class='addresss'>收货地址: {{item.province}}{{item.city}}{{item.area}}{{item.street}}</span>
              <div class='addDeault'>
                <span>默认</span>
                <div>
                  <span @click='edit'>编辑</span>
                  <span @click="()=>{deletes(item)}">删除</span>
                </div>
              </div>
            </li>
          </ul>
          <button class='btn' @click='newAddress'>新增地址</button>
        </div>
      </section>
    </div>
</template>
<script>
import {getCookie,bus} from '../../../utils/cookie'
import {mapMutations,mapActions} from 'vuex'
    export default{
      data(){
        return {
          data:[],
          lists:[]
        }
      },
      created(){
        // bus.$on('addrecip',(data)=>{
        //   this.data=data

        // })
        this.$http.post('/api/addrecips',{
          token:getCookie('token')
        }).then(res=>{
          if(res.code==1){
              this.data=res.data
              console.log(this.data)
          }else{
            this.$router.push({
              name:"login",
              query:{
                from:'address'
              }
            })
          }
        })
        if(!this.$store.state.addrecip.length==0){
            this.data=this.$store.state.addrecip;
        }
      },
      methods:{
        edit(){
            console.log(1111)
        },
        deletes(item){
          this.$http.post('/api/addDelete',{
            token:getCookie('token'),
            data:item
          }).then(res=>{
            console.log(res)
            this.$http.post('/api/addrecips',{
              token:getCookie('token')
            }).then(res=>{
              if(res.code==1){
                  this.data=res.data
                  console.log(this.data)
              }else{
                this.$router.push({
                  name:"login",
                  query:{
                    from:'address'
                  }
                })
              }
            })
          })
        },
        back(){
          //  console.log(this.data)
          this.$router.push('/index/my')
        },
        newAddress(){
          console.log(222)
          this.$router.push('/recipient')
        },
        ...mapMutations(['updataAddrecip'])
      }
    }
</script>
<style>
.address{
  width:100%;
  height:100%;
  font-size:.32rem;
  display:flex;
  flex-direction: column;
}
header{
  width:100%;
  height:.6rem;
  text-align:center;
  line-height:.6rem;
  display:flex;
  justify-content: space-between;
  border-bottom:2px solid #ccc;
}
section{
  flex:1;
  overflow:hidden;
}
.add-sec{
  width:100%;
  height:100%;
  overflow-y:scroll
}
.adds{
  display:flex;
  justify-content: space-between;
}
.btn{
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
  margin-top:.3rem;
}

.addli{
  height:2.5rem;
  padding:.1rem .2rem;
  border-bottom:2px solid rgb(218, 216, 216);
}
.addperson{
  height:.6rem;
  margin-top:.1rem;
  display:flex;
  justify-content: space-between;
}
.addresss{
  height:1.1rem;
  margin-top:.1rem;
  display:block;
}
.addDeault{
  height:.6rem;
  line-height:.6rem;
  display:flex;
  border-top:1px solid #ccc;
  justify-content: space-between;
  /* margin-top:.2rem; */
}
</style>
