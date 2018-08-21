<template>
	<div class="search">
		<input type="text" v-model="keywords"  placeholder="站内搜索" @keyup.enter="search"/>
		<span class="iconfont icon-chazhao1" @click="search"></span>
	</div> 
</template>

<script>
	export default{
		name:'search',
		data(){
			return{
				keywords:'',
				
			}
		},
		methods:{
			search(){
				if(!this.keywords==''){
					this.$router.push({name:'searchWord',params:{searchStr:this.keywords}});
				}
			}
		},
		watch:{
			'$route':function(newSearch){
				if(newSearch.params.searchStr){
					this.keywords=newSearch.params.searchStr;
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.search{
		width: 200px;
		height: 25px;
		margin: 10px auto;
		background: white;
		text-align: left;
		border-radius: 10px;
		input{
			width: 150px;
			margin-left: 10px;
			border: none;
			outline: none;
		}
		.iconfont{
			margin-left: 13px;
			vertical-align: middle;
			font-size: 18px;
			cursor: pointer;
		}
		a{
			text-decoration: none;
		}
	}
</style>