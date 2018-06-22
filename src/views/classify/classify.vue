<template>
    <div class='classify'>
        <div class='classify-box'>
            <aside class="scroller" id="leftScroller">
                <ol class="list">
                    <li  v-for="(item,ind) in list" :class='count===item.id?"active":""' :key='item.id' @click='getData(item.id)' data-id="17951827"  data-state="true">
                        <i class='icon iconfont'>&#xe649;</i>
                        <a href="javascript:;" title="热门分类">{{item.name}}</a>
                    </li>
                </ol>
            </aside>
            <div class='classify-con'>
                <div class='classify-cons'>
                    <div class='classify-dl' v-for='(val,index) in datas' :key='index'>
                      <h4>{{val.goodsTypeName}}</h4>
                      <div class='classify-img'>
                        <div class='classify-imgs' v-for='(vals,ind) in val.goodsTypeList' :key='ind'>
                          <img v-lazy="vals.goodsTypeImgUrl" alt="">
                          <span>{{vals.goodsTypeName}}</span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
        </div>
    </div>
</template>

<script>
import jsonp from "../.././utils/jsonp/jsonp.js";
import {mapState} from 'vuex';
export default {
  data() {
    return {
      list:[],
      count:"17951827"
      // url:'http://list.meilishuo.com/search?frame=1&page=1&cKey=wap-index&tag=&maxPrice=&minPrice=&fcid=&_mgjuuid=e61a3677-d308-472e-a1be-b5f71dee0444&sort=pop&_=1528851893936&callback=jsonp4'
    };
  },
  computed:{
    datas(){
      return this.data[this.count];
    },
    ...mapState(['data'])
  },
  methods:{
    getData(cid){
      // this.$http.get(`http://localhost:3000/api/classify?cid=${cid}`).then(res=>{
      //   this.con=res.secondLevelCategories;
      //   console.log(this.con)
      // })
      this.count=cid;
      this.$store.dispatch('fetchData',cid)
    }
  },
  mounted(){
      //jsonp获取数据
      // jsonp(this.url,'jsonp4').then((res)=>{
      //   this.list=res.data.list;
      //   console.log(this.list)
      // })
      this.$http.get('/static/data/list').then(list=>{
          this.list=list
      })
      // this.getData(cid)
  }
};
</script>

<style src='./classify.css'>


</style>
