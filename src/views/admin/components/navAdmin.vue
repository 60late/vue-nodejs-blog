<template>
    <div class="nav">
        <h1>后台管理系统</h1>
        <ul>
            <router-link to="/admin/techAdmin"><li>技术文章</li></router-link>
            <router-link to="/admin/musicAdmin"><li>音乐文章</li></router-link>
            <router-link to="/admin/senseAdmin"><li>感悟文章</li></router-link>
            <router-link to="/admin/commentAdmin"><li>评论管理</li></router-link>
            <router-link to="/admin/meAdmin"><li>我的信息</li></router-link>
        </ul>
        <p class="logout" @click="logout">退出登录</p>
    </div>
</template>

<script>
import api from '@/fetch/api'
import store from '@/store/index'
    export default{
        name:'navAdmin',
        data(){
            return{
                
            }
        },
        methods:{
            logout(){
                let r=confirm('确定要退出吗？');
                if(r){
                    store.commit('logout');
                    this.$router.replace({
                        path: '/login',
                    });
                }
            }
        }
    }
</script>

<style scoped lang="less">
	.nav{
        a{
            color:white;
            text-decoration: none;
        }
        width: 300px;
        height: 100%;
        position: fixed;
        background: #353d47;
        color: white;
        h1{
            margin: 50px 0;
            font-size: 25px;
            text-align: center;

        }
        ul{
            text-align: center;
            li{
                height: 60px;
                line-height: 60px;
                font-size: 20px;
            }
            li:hover{
                background:#409eff;
            }
        }
        .logout{
            position: absolute;
            width: 100%;
            bottom: 100px;
            text-align: center;
            color: white;
            font-size: 15px;
            cursor: pointer;
        }
    }
</style>