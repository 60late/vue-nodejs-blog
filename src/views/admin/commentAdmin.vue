<template>
    <div class="me">
        <div class="title">评论管理</div>
        <div class="content">
            <table width="100%">
                <thead>
                    <tr>
                        <th>文章名</th>
                        <th>评论者姓名</th>
                        <th>评论内容</th>
                        <th>时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(comment,index) in comments" :key="index">
                        <td>{{comment.title}}</td>
                        <td>{{comment.name}}</td>
                        <td>{{comment.content}}</td>
                        <td>{{comment.time}}</td>
                        <td>
                            <button class="del" @click="delComment(comment.id,index)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from '@/fetch/api'
export default {
    name:'commentAdmin',
    inject:['reload'],
    data(){
        return {
            comments:[],
        }
    },
    mounted(){
        this.getComments();
    },
    methods:{
        delComment(id,index){
            let r=confirm('确定删除此条评论吗？');
            if(r){
                api.delCommentBack(id).then(res=>{
                    switch(res.code){
                    case '200':
                        alert('删除成功');
                        this.reload();
                        break;
                    case '400':
                        alert('服务器炸了，待会儿再试');
                        break;
				    }
                },err=>{
                    console.log(err);
                })
            }
        },
        getComments(){
            api.allCommentsBack().then(res=>{
                switch(res.code){
                    case '200':
                        this.comments=res.data;
                        console.log(res.data);
                        break;
                    case '400':
                        console.log('服务器炸了');
                        break;
				}
            },err=>{
                console.log(err);
            })
        }
    }
}
</script>

<style lang="less" scoped>
.me{
    box-sizing: border-box;
    .title{
        height: 80px;
        line-height: 80px;
        background: white;
        padding:0 20px;
        font-size: 25px;
        box-sizing: border-box;
        border-left: 10px solid #353d47;
    }
    .content{
        padding:30px;
        box-sizing: border-box;
        background: white;
        margin-top:20px;
        .new{
                width: 70px;
                height: 30px;
                background: #337ab7;
                border:1px solid #337ab7;
                border-radius: 3px;
                color: white;
                cursor: pointer;
            }
            table{
                margin: 20px auto;
                text-align: center;
                width: 100%;
                
                tr{
                    th,td{
                        border:1px solid #ddd;
                        padding: 10px;
                        vertical-align: middle;
                    }
                    //文章名
                    th:nth-child(1),{
                        width: 20%;
                    }
                    //评论者姓名
                    th:nth-child(2){
                        width: 10%;
                    }
                    //评论内容
                    th:nth-child(3){
                        width: 40%;
                    }
                    //时间
                    th:nth-child(4){
                        width: 10%;
                    }
                    //操作
                    th:nth-child(5){
                        width: 10%;
                    }
                    td{
                        .tag{
                            display: inline-block;
                            margin-right: 10px;
                        }
                        button{
                            width: 65px;
                            height:30px;
                            margin:0 5px;
                            border:1px solid white;
                            border-radius: 5px;
                            color: white;
                            cursor: pointer;
                            outline: none;
                        }
                        .publish{
                            background: #5cb85c;
                        }
                        .save{
                            background: lightgrey;
                        }
                        .modify{
                            background: #5bc0de;
                        }
                        .del{
                            background: #d9534f;
                        }
                    }
                }
                tbody tr:hover{
                    background: #f0f0f0;
                }
            }
        
    }
}

</style>
