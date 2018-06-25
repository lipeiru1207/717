<template>
    <div class="box">
        <header>
            <a @click="goback"><</a>
            <a>设置</a>
            <a></a>
        </header>
    </div>
</template>
<script>
    export default{
        name:'set',
        methods:{
            goback(){
                this.$router.push({
                    name:"myself"
                })
            }
        }
    }
</script>
<style scoped>
header a:nth-child(1){
    padding-left: .1rem;
    font-size: .2rem
}
</style>
