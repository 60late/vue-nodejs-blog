<template>
    <all-article :passages="passages"  :type="type"></all-article>
</template>

<script>
import allArticle from './components/allArticle'
import api from '@/fetch/api'
export default {
    name:'techAdmin',
    components:{
        allArticle,
    },
    data(){
        return{
            type:'技术文章',
            passages:[
                // {title:'测试文章',time:'2018-8-1',id:1,category:'技术文章',tags:['javascript','html'],state:'发表'},
                // {title:'测试文章',time:'2018-8-1',id:2,category:'技术文章',tags:['javascript','html'],state:'草稿'},
            ]
        }
    },
    created(){
        this.getTechArticle();
    },
    methods:{
        //获取分类文章的函数
        getTechArticle(){
            //将中文名编码，传到后端后由后端再进行解码
            let category=encodeURIComponent(this.type)
            api.categoryArticleBack(category).then(res=>{
                switch(res.code){
                    case '200':
                    // console.log(res.data);
                    //把tags由字符串转为数组以便循环
                    res.data.forEach(element => {
                        //当标签不存在时就不分割
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

<style scoped lang="less" >

</style>