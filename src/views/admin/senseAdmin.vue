<template>
    <all-article :passages="passages"  :type="type"></all-article>
</template>

<script>
import allArticle from './components/allArticle'
import api from '@/fetch/api'
export default {
    name:'senseAdmin',
    components:{
        allArticle,
    },
    data(){
        return{
            type:'感悟文章',
            passages:[
                // {title:'测试文章',time:'2018-8-1',id:1,type:'tech',tags:['javascript','html'],state:'true'},
                // {title:'测试文章',time:'2018-8-1',id:2,type:'tech',tags:['javascript','html'],state:'true'},
                // {title:'测试文章',time:'2018-8-1',id:3,type:'tech',tags:['javascript','html'],state:'true'},
                // {title:'测试文章',time:'2018-8-1',id:4,type:'tech',tags:['javascript','html'],state:'true'},
                // {title:'测试文章',time:'2018-8-1',id:5,type:'tech',tags:['javascript','html'],state:'true'},
                // {title:'测试文章',time:'2018-8-1',id:6,type:'tech',tags:['javascript','html'],state:'true'},
                // {title:'测试文章',time:'2018-8-1',id:7,type:'tech',tags:['javascript','html'],state:'true'},
            ]
        }
    },
    created(){
        this.getSenseArticle();
    },
    methods:{
        getSenseArticle(){
            let category=encodeURIComponent(this.type)
            api.categoryArticleBack(category).then(res=>{
                switch(res.code){
                    case '200':
                    // console.log(res.data);
                    //把tags由字符串转为数组以便循环
                    res.data.forEach(element => {
                        if(element.tags!=null){
                          element.tags=element.tags.split(',');  
                        }
                    });
                    this.passages=res.data;
                    break;
                    case '400':
                    console.log('获取数据错误！')
                    break;
                }
                console.log(res);
            },err=>{
                console.log(err);
            });
        },
    }
}
</script>

<style scoped lang="less">

</style>
