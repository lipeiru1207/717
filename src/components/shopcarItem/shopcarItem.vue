<template>
    <div class='shopcarItem'>
      <span class='uncheck' :class='checkClass' @click='flag=!flag'></span>
      <dl>
          <dt>
              <img v-lazy="data.imageurl">
          </dt>
          <dd>
              <p>{{data.wname}}</p>
              <span>
                  {{data.jdPrice}}
              </span>
              <div>
                <span @click="addClick">+</span>
                <span>{{data.count}}</span>
                <span @click="delClick">-</span>
              </div>
          </dd>
      </dl>
    </div>
</template>

<script>
import {getCookie,bus} from '../../utils/cookie'
export default {
    props: ['data'],
    data(){
        return {
          flag:false
        }
    },
    computed:{
      checkClass(){
        return this.flag?'check':'uncheck'
      }
    },
    watch:{
      flag(n,o){
        bus.$emit('checkItem',{
          name:this.data.wname,
          price:n?this.data.count*this.data.jdPrice:0
        })
      },
      data(n,o){
        bus.$emit('checkItem',{
          name:this.data.wname,
          price:this.flag?this.data.count*this.data.jdPrice:0
        })
      }
    },
    mounted(){
      bus.$on('checkAll',(check)=>{
        this.flag=check;
      })
    },
    methods: {
        orders(){

        },
        addClick() {
          console.log(this.data)
            let count=this.data.count;
            if(count+1>=10){
              return;
            }
            this.$http.post('/api/shopcar/count', {
                token:getCookie('token'),
                count:count+1,
                goodsname:this.data.wname
            }).then(res=>{
                if(res.code==1){
                  // bus.$emit('updates');
                  this.$store.dispatch('fetchShopItem')
                }
            })
        },
        delClick() {
            let count=this.data.count;
            if(count-1<=0){
              return;
            }
            this.$http.post('/api/shopcar/count', {
                token:getCookie('token'),
                count:count-1,
                goodsname:this.data.wname
            }).then(res=>{
                if(res.code==1){
                  // bus.$emit('updates');
                  this.$store.dispatch('fetchShopItem')
                }
            })
        }
    }
}
</script>

<style scoped>
.shopcarItem {
    width: 100%;
    height: auto;
    display:flex;
}
.uncheck{
  width:.3rem;
  height:.3rem;
  border:1px solid #ccc;
  border-radius:50%;
  display:block;
  margin-top:10%;
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
/* div input {
    width: 30px;
    height: 20px;
} */
dl {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}

dl dt {
    width: 40%;
    height: 100%;
    flex-shrink: 0;
}

dl dd {
    width: 50%;
    height: 100%;
    flex-shrink: 0;
}

dl dt img {
    width: 100%;
    height: auto;
}

dl dd p {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
