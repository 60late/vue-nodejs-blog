<template>
    <div class="admin">
        <nav-admin></nav-admin>
        <div class="content">
            <router-view  v-if="isRouterAlive"></router-view>  
        </div>
    </div>
</template>

<script>
import navAdmin from './components/navAdmin'
export default {
    name:'admin',
    components:{
        navAdmin,
    },
    mounted(){
        
    },
    data(){
        return{
            isRouterAlive:true,
        }
    },
    provide(){
        return{
            reload:this.reload
        }
    },
    methods:{
        reload(){
            this.isRouterAlive=false;
            this.$nextTick(function(){
                this.isRouterAlive=true;
            })
        },
    }
}
</script>

<style scoped lang="less">
    .admin{
        height: 100%;
        width: 100%;

        .content{
            padding:20px;
            box-sizing: border-box;
            background: lightgray;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 300px;
            right: 0;
            overflow: auto;
        }
    }
</style>
