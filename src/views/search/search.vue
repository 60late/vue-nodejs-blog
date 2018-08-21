<template>
	<div class="search">
		<div class="head">
			<p>站内搜索</p>
		</div>
		
		<!--文字搜索框区域-->
		<div class="words">
			<span>关键字搜索</span>
			<input type="text" v-model="search" placeholder="想找点撒子？" @keyup.enter="changeSearch(search)"/>
			<span class="iconfont icon-chazhao1" @click="changeSearch(search)"></span>
		</div>
		
		<!--标签搜索框区域-->
		<div class="tags">
			<div class="tagTitle">
				<span>标签搜索</span>
				<div class="switch" @click="switchState" :style="{background:state=='on'?'green':'#ccc'}">
					<div :class="[state=='on'?onClass:offClass]"></div>
				</div>
			</div>
			<transition name="tagArea">
				<div class="tagArea" v-show="state=='on'">
					<div class="tag" v-for="tag in tags"  v-show="tag" @click="getTagPsg(tag)">
						<span >{{tag}}</span>
					</div>
				</div>
			</transition>
		</div>
		<!--搜索结果呈现区域-->
		<div class="result">
			<p><span>{{searchType}}</span>的搜索结果</p>
			<div class="passage" v-for="(passage,index) in passages">
				<p>
					<router-link class="title" :to="{name:'articles',params:{articleId:passage.id}}"><span>{{index+1}}：{{passage.title}}</span></router-link>
					<span class="time">{{passage.time}}</span>
				</p>
				<p v-html="passage.summary"></p>
				
				<span class="more">
					<router-link :to="{name:'articles',params:{articleId:passage.id}}">(查看更多)</router-link>
				</span>
				
				<div class="tagType">
					<span class="iconfont icon-tag1"> </span>
					<div class="tag" v-for="tag in passage.tags" v-show="tag"  @click="getTagPsg(tag)">
						<span >{{tag}}</span>
					</div>
					<span class="iconfont icon-wenjianjia"></span>
					<span>{{passage.category}}</span>
				</div>
			</div>
			<div class="err" v-if="passages.length<1">
				<span class="iconfont icon-meiyoudingdan-01"></span>没有搜索到任何结果!
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/fetch/api'
	
	export default{
		name:'search',
		data (){
			return {
				passages:[],
				tags:[],
				search:'',
				searchType:'关键词 ',
				state:'off',
				onClass:'btnActive',
				offClass:'switchBtn',
				
			}
		},
		props:['searchStr','tagStr'],
		created (){
			this.getAllTags();
			//判断是由关键词还是由标签进入的搜索页
			if(this.searchStr){
				this.getSearchPsg(this.searchStr);
			}else if(this.tagStr){
				this.getTagPsg(this.tagStr);
				this.switchState();
			}
		},
		methods:{
			//获取搜索的文章
			getSearchPsg(search){
				api.searchPassageFront(search).then(res=>{
					switch(res.code){
						case '200':
							this.passages=res.data;
							this.passages.forEach(element=>{
								element.tags=element.tags.split(',');
							});
							//将文章间接限制到80个字
							this.shortBreif();
							this.searchType='关键字:  '+search+' ';
							console.log(this.passages);
							break;
						case '400':
							console.log('服务器开小差了');		
					}	
				},err=>{
					console.log(err);
				});	
			},
			//点击标签后出现文章
			getTagPsg(tag){
				this.$router.push({name:'searchTag',params:{tagStr:tag}});
				api.tagPassagesFront(tag).then(res=>{
					switch(res.code){
						case '200':
							this.passages=res.data;
							console.log(res.data);
							this.passages.forEach(element=>{
								element.tags=element.tags.split(',');
							});
							this.shortBreif();
							this.searchType='标签:  '+tag+' ';
							console.log(this.passages);
							break;
						case '400':
							console.log('服务器开小差了');
							break;
					}		
				},err=>{
					console.log(err);
				})
			},
			//改变文字搜索内容时，利用监控url重新调用页面
			changeSearch(search){
				if(search!=''){
					this.$router.push({name:'searchWord',params:{searchStr:search}});
				}
			},
			//缩小breif的文字数量
			shortBreif(){
				this.passages.forEach((psg)=>{
					if(psg.summary.length>80){//大于80字的介绍就省略
						psg.breif=psg.summary.slice(0,80)+'…';
					}
				})		
			},
			//获取所有标签
			getAllTags(){
				api.tagsFront().then(res=>{
					switch(res.code){
						case '200':
						console.log(res.data);
						let temp=res.data;

						//标签转化到一个数组中，并且去重
						temp.forEach(element => {
							element=element.tags.split(',');
							element.forEach(tag=>{
								this.tags.push(tag);
							})
						});
						this.tags= Array.from(new Set(this.tags));
						console.log(this.tags)
						break;
						case '400':
						console.log('服务器炸了');
						break;
					}
				},err=>{
					console.log(err);
				})
			},
			//切换标签栏
			switchState(){
				this.state=this.state=='off'?'on':'off';			
			},
		},
		watch:{
			//在更换关键词时才进行搜索时，监控url地址栏
			'$route':function(newSearch){
				console.log(newSearch);
				if(newSearch.params.searchStr){
					this.getSearchPsg(newSearch.params.searchStr);
					this.search=newSearch.params.searchStr;
				}
			}
		},
	}
</script>

<style scoped lang="less">
	.search{
		padding: 20px;
		box-sizing: border-box; 
		.head{
			height: 100px;
			line-height: 100px;
			border-left:10px solid  #353d47;
			background: white;
			font-size: 30px;
			font-weight: bold;
			padding: 0 10px;
			margin: 20px 0;	
		}
		.words{
			height: 70px;
			line-height: 70px;
			background: white;
			margin: 20px 0;
			padding:0 20px;
			font-size: 18px;
			display: flex;
			align-items: center;
			span:first-child{
				width: 150px;
			}
			input{
				flex: 1;
				height: 35px;
				font-size: 18px;
				padding: 0 20px;
				border: 1px solid gray;
				border-radius: 20px;
				outline: none;
			}
			.iconfont{
				font-size: 25px;
				margin:0 20px 0 50px;
				cursor: pointer;
			}
		}
		
		.tags{
			background: white;
			margin: 20px 0;
			padding: 20px;
			box-sizing: border-box;
			.tagTitle{
				display: flex;
				span{
					flex: 2;
					font-size: 18px;
					line-height: 30px;
				}
				.switch{
					width: 60px;
					height: 26px;
					margin: auto 10px;
					text-align: right;
					border-radius: 15px;
					border:1px solid gray;
					box-sizing: border-box;
					background: #ccc;
					cursor: pointer;
					position: relative;
					transition: all 0.5s ease;
					.switchBtn{
						width:20px;
						height: 20px;
						border:1px solid white;
						border-radius: 50%;
						background: white;
						position: absolute;
						left: 2px;
						top: 1px;
						transition: all 0.5s ease;
					}
					.btnActive{
						width:20px;
						height: 20px;
						border:1px solid white;
						border-radius: 50%;
						background: white;
						position: absolute;
						left: 100%;
						top: 1px;
						margin-left: -22px;
						transition: all 0.5s ease;
					}
				}

			}
			.tagArea{
				margin:20px 0;
				padding: 10px;
				box-sizing: border-box;
				min-height: 100px;
				border: 1px solid gray;
				border-radius: 5px;
			}
			.tagArea-enter-active,.tagArea-leave-active{
				transition: all 0.5s ease;
			}
			.tagArea-enter,.tagArea-leave-to{
				opacity: 0;
			}
		}
		
		
		.result{
			min-height: 400px;
			background: white;
			margin: 20px 0;
			padding:20px ;
			box-sizing: border-box;
			p:first-child{
				font-size: 18px;
			}
			.passage{
				border-bottom: 1px solid black;
				margin:15px 0;
				p:first-child{
					margin-bottom: 10px;
					display: flex;
					span{
						flex: 1;	
					}
					span:last-child{
						text-align: right;
					}
				}
				p:nth-child(2){
					margin:10px 0;
					display: inline;
				}
				.more>a{
					color: orange;
					cursor: pointer;
				}	
				a{
					text-decoration: none;
					color: black;
				}
				a:hover{
					color: orange;
				}
				.tagType{
					margin:10px 0;
				}
			}
			.err{
				height: 300px;
				line-height: 300px;
				text-align: center;
				.iconfont{
					font-size: 30px;
					vertical-align: middle;
					margin-right: 10px;
				}
			}
		}
		.tag{
			min-width: 30px;
			height: 20px;
			line-height: 20px;
			background: #5bc0de;
			display: inline-block;
			margin:5px 12px;
			position: relative;
			border-radius: 0 2px 2px 0;
			color: white;
			padding:0 5px;
			font-size: 13px;
			cursor: pointer;
		}
		.tag::after{
			width: 0;
			height: 0;
			content: "";
			position: absolute;
			left: -20px;
			border-right: 10px solid #5bc0de;
			border-left: 10px solid transparent;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
		}
	}
	
	@media screen and (max-width: 900px) {
		.search{
			padding: 20px 0;
			.words{
				span:first-child{
					width:180px;
					font-size: 1rem;
				}
				input{
					max-width: 135px;
					
				}
				.iconfont{
					margin: 0 1.2rem; 
				}
			}
			.tags .tagTitle span{
				font-size: 1rem;
			}
			
			.result p:first-child{
				font-size: 1rem;
				span{
					font-weight: bold;
				}
			}
			
			.result .passage{
				p:first-child{
					display:block;
					text-align: left;
					a span{
						text-align: left;
						display: block;
					}
					span{
						display: block;
					}
					span:last-child{
						text-align: left;
					}
				}	
			}
		}
	}
</style>