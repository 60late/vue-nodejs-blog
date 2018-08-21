<template>
    <div class="myApp">
        <span class="iconfont icon-shigongzhong"></span>
        <h1>施工中...</h1> 
    </div>
</template>

<script>
export default {
    name:'myApp',
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
    .myApp{
        position: absolute;
        top: 20px;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .iconfont{
            font-size: 80px;
        }
        h1{
            font-size: 40px;
        }
    }
</style>
