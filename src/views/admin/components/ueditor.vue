<template>
    <script id="ue" type="text/plain"></script>
</template>

<script>
export default {
    name:'ueditor',
    props:['content'],
    data(){
        return{
            //初始化一个editor
            editor:null,
            config:{
                initialFrameWidth: null,
                initialFrameHeight: 500
            },
            defaultMsg:''
        }
    },
    mounted(){

    },
    //离开页面时销毁editor,以便下回进入时重新生成
    destroyed() {
        this.editor.destroy();
    },
    methods:{
        initEditor(){
            let that=this;
            this.editor=UE.getEditor('ue',this.config);
            // 确保UE加载完成后，放入内容。
            this.editor.addListener("ready", function () {
                //文章有内容时，放入内容
                if(that.content!=null){
                    that.editor.setContent(that.content); 
                }else{//没有内容时放入默认内容
                    that.editor.setContent(that.defaultMsg); 
                }
            });
        },
        // 获取editor中的html内容
        getUEContent() {
            return this.editor.getContent();
        }
    },

}
</script>

<style lang="less" scoped>

</style>
