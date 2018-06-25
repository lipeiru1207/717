<template>
  <div class='all'>
    <div class='details' v-for='(item,index) in data' :key='index'>
      <dl>
        <dt>
              <img v-lazy="item.imageurl">
          </dt>
          <dd>
              <p>{{item.wname}}</p>
              <span>
                  {{item.jdPrice}}
              </span>
          </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import {getCookie} from '../../../utils/cookie'
export default {
  data(){
    return{
      data:[]
    }
  },
  mounted(){
    this.$http.post('/api/shop',{
      token:getCookie('token')
    }).then(res=>{
      this.data=res.data
    })
  }
}
</script>

<style>
.all{
  width:100%;
  height:100%;
  /* overflow-y:auto; */
}
.details{
  width:100%;
  height:3rem;
}
.details dl{
  width:100%;
  height:3rem;
  display:flex;
}
.details dl img{
  width:2.5rem;
  height:2.5rem;
}
</style>
