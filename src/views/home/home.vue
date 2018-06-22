<template>
  <div @scroll='onScoll' ref='homeWrap' class='home-wrap'>
    <div class='swiper-container' ref='swiper'>
      <div class='swiper-wrapper'>
        <div class='swiper-slide'>
          <img src="../../../static/img/a.jpg" alt="">
        </div>
        <div class='swiper-slide'>
          <img src="../../../static/img/b.jpg" alt="">
        </div>
        <div class='swiper-slide'>
          <img src="../../../static/img/c.jpg" alt="">
        </div>
        <div class='swiper-slide'>
          <img src="../../../static/img/d.jpg" alt="">
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div class='home-icon' ref='homeIcon'>
      <p>
        <i class='icon iconfont'>&#xe62b;</i>
        <span>家乡味道</span>
      </p>
      <p>
        <i class='icon iconfont'>&#xe62b;</i>
        <span>进口食品</span>
      </p>
      <p>
        <i class='icon iconfont'>&#xe62b;</i>
        <span>牛奶乳品</span>
      </p>
      <p>
        <i class='icon iconfont'>&#xe62b;</i>
        <span>茶果冲饮</span>
      </p>
    </div>
    <div class='home' ref='home'>
      <homeItem v-for='(item,index) in list' :key='index' :data='item' ></homeItem>
    </div>
    <p>{{load}}</p>
  </div>
</template>

<script>
import Swiper from 'swiper'
import jsonp from '../.././utils/jsonp/jsonp.js';
import homeItem from '../homeItem/homeItem';
export default {
  data(){
    return {
      list:[],
      load:'正在加载中...',
      flag:true,
      page:1
    }
  },
  mounted(){
    new Swiper(this.$refs.swiper,{
      autoplay:true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }),
    // jsonp(this.url,'jsonp4').then((res)=>{
    //   this.list=res.data.list;
    //   console.log(this.list)
    // })
    this.$http(`http://localhost:3000/index/recommend.action?page=${this.page}`).then(res=>{
      this.list=JSON.parse(JSON.parse(res).recommend).wareInfoList;
      // console.log(this.list)
    })
  },
  methods:{
    onScoll(){
      let winH=this.$refs.homeWrap.offsetHeight;
      let docH=this.$refs.swiper.offsetHeight+this.$refs.homeIcon.offsetHeight+this.$refs.home.offsetHeight;
      let scrollH=this.$refs.homeWrap.scrollTop;
      // console.log(winH,docH,scrollH)
      if(docH-winH-scrollH<30 &&this.flag){
        this.flag=false;
        this.page++;
        if(this.page>4){
          this.load='你知道的太多了';
          return ;
        }
        this.$http(`http://localhost:3000/index/recommend.action?page=${this.page}`).then(res=>{
          if(res.code===1000){
            this.load='你知道的太多了';
          }else{
            this.list=[...this.list,...JSON.parse(JSON.parse(res).recommend).wareInfoList];
            // console.log(this.list)

          }
          this.flag=true;
        })
      }
    }
  },
  components:{
    homeItem
  }
}
</script>

<style src='./home.css'>

</style>
