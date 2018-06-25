<template>
  <div class='shopcart'>
    <header class='shopcart-header'>
      <i class='icon iconfont'>&#xe653;</i>
      <span>购物车</span>
      <p>
        <span @click='edits'>{{edit}}</span>
        <i class='icon iconfont'>&#xe730;</i>
      </p>
    </header>
    <div class='sec'>
      <div class='list' v-show='$store.state.shopItem.length==0'>
          你的购物车为空!
      </div>
        <ul>
            <li v-for="(item,ind) in $store.state.shopItem" :key='ind'>
                <shopcarItem v-on:update='fetchList' :data='item'></shopcarItem>
            </li>
        </ul>
    </div>
    <div class='shopcar-footer'>
      <div class='allcheck'>
        <span class='uncheck' :class='checkClass' @click='checkAll'></span><span>全选</span>
      </div>
      <b>合计:{{total}}</b>
      <p class='shopcart-p' @click='clearing'>{{type}}</p>
    </div>
    <Toast ref='toa'></Toast>
  </div>
</template>

<script>
import shopcarItem from '../../components/shopcarItem/shopcarItem.vue'
import {getCookie,bus }from '../../utils/cookie.js'
import {mapMutations,mapState} from 'vuex'
export default {
  data(){
    return {
      data:[],
      list:[],
      total:0,
      type:'结算',
      edit:'编辑',
      flag:false
    }
  },
  computed:{
    checkClass(){
      return this.flag?'check':'uncheck'
    }
  },
  created(){
    this.$store.dispatch('fetchShopItem')
    // this.fetchList();
    // bus.$on('updates',()=>{
    //   console.log('update')
    //   this.fetchList();
    // })
  },
  mounted(){
    // this.fetchList()
    bus.$on('checkItem',(data)=>{
      this.list[data.name]=data.price;
      this.sum()
    })
  },
  methods:{
    fetchList(){
      this.$http.post('/api/shop',{
        token:getCookie('token')
      }).then(res=>{
        if(res.code==0){
          this.$router.push({
            name:'login',
            query:{
              from:'shopcart'
            }
          })
        }else{
          this.data=res.data
        }
      })
    },
    sum(){
      this.total=Object.values(this.list).reduce((init,item)=>{
        // console.log(init,item);
        return init+item
      },0)
    },
    checkAll(){
      this.flag=!this.flag;
      bus.$emit('checkAll',this.flag)
    },
    edits(){
      if(this.edit=='编辑'){
        this.type='删除';
        this.edit='完成'
        this.$refs.toa.active('删除')
      }else{
        this.type='结算';
        this.edit='编辑'
      }
    },
    clearing(){
      if(this.type=='结算'){
        //跳页面
      }else{
        this.$http.post('/api/shopcar/delate',{
          token:getCookie('token')
        }).then(res=>{
            console.log(res)
        })
      }
    }
  },
  components:{
    shopcarItem
  }
}
</script>

<style scoped>
.shopcart{
  width:100%;
  height:100%;
  position:relative;
}
.shopcart-header{
  width:100%;
  height:8%;
  display:flex;
  align-items: center;
  justify-content: space-between;
}
.shopcar-footer{
  width:100%;
  height:9%;
  position:absolute;
  bottom:0;
  left:0;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.allcheck{
  width:16%;
  display:flex;
}
.shopcart-p{
  width:16%;
  background:red;
  color:#fff;
  text-align:center;
}
 .sec {
    width: 100%;
    height: 80%;
    overflow:hidden;
}

ul {
    width: 100%;
    height: 100%;
    overflow-y:scroll;
}

ul li {
    width: 100%;
    height: 3rem;
    margin: 10px 0;
}

.uncheck{
  width:.3rem;
  height:.3rem;
  border:1px solid #ccc;
  border-radius:50%;
  display:block;
}
.check{
  width:.3rem;
  height:.3rem;
  background:red;
  border-radius:50%;
  display:block;
  border:1px solid #ccc;
}
.check::after{
  content:'';
  height:.16rem;
  width:.24rem;
  border-left:2px solid #fff;
  border-bottom:2px solid #fff;
  transform:rotate(-45deg);
  display:block;
  color:#fff;
  font-size:.34rem;
}
</style>
