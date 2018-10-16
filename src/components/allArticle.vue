<template>
	<div class="allArticle">
		<div class="head">
			<p>{{type.title}}</p>
			<p>{{type.describe}}</p>
		</div>
		
		<div class="article" v-for="passage in passages">
			<div class="title">
				<h1><router-link :to="{name:'articles',params:{articleId:passage.id}}">{{passage.title}}</router-link></h1>
				<div class="time">
					<span class="iconfont icon-shijian"></span>
					<span>{{passage.time}}</span>
				</div>
			</div>
			<div class="content">
				<p v-html="passage.summary"></p>
				<!--	target="_blank"-->
				<span><router-link :to="{name:'articles',params:{articleId:passage.id}}">更多>></router-link></span>
				<hr />
				<div class="bottom">
					<div class="bottomTag">
						<span class="iconfont icon-tag1"></span>
						<div class="tag" v-for="tag in passage.tags" v-if="tag" @click="findTag(tag)">
							<span>{{tag}}</span>
						</div>
					</div>
					
					<div class="bottomType">
						<span class="iconfont icon-wenjianjia"></span>
						<span>{{passage.category}}</span>
					</div>
					
					<div class="more">
						<router-link :to="{name:'articles',params:{articleId:passage.id}}">查看全文</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import util from '@/util/util'
	export default{
		name:'allArticle',
		props:['passages','type'],
		data(){
			return{
				lazyLoad:'',
			}
		},
		created(){
			console.log(this.passages)
		},
		mounted(){
			this.lazyLoad=util.throttle(this.handleLoad,200,300);
			// //添加懒加载滚动监听
			window.addEventListener('scroll',this.lazyLoad);
		},
		beforeDestroy(){
			//移除懒加载监听
			window.removeEventListener('scroll',this.lazyLoad);
		},
		methods:{
			findTag(tag){
				this.$router.push({name:'searchTag',params:{tagStr:tag}});
			},
			handleLoad(){
				let list=document.getElementsByClassName('rightContent')[0].getElementsByTagName('img');
				for(let i=0,len=list.length;i<len;i++){
					if(this.isInsight(list[i])){
						list[i].src=list[i].getAttribute("data-src");
					}
				}
				console.log(list);
			},
			isInsight(el){
				let bound = el.getBoundingClientRect();
				let clientHeight = window.innerHeight;
				//只考虑向下滚动加载，当离视窗底部还有100距离时，就进行资源的加载
				return bound.top <= clientHeight+100;
			},
		},
		watch:{
			//监听passages的值是否发生了变化，发生了变化则执行懒加载函数
			passages:function(){
				console.log('change')
				this.$nextTick(() => {
					this.handleLoad();
				})
			}
		}
	}
</script>

<style scoped lang="less"> 
.allArticle{
	padding: 20px;
	/*padding: 20px 20px 15px;
	box-sizing: border-box;*/
	.head{
		height: 100px;
		padding:5px 20px;
		background: white;
		border-left: 10px solid #353d47;
		p:first-child{
			margin-top: 8px;
			font-size: 30px;
			font-weight: bold;
		}
		p:last-child{
			margin-top: 15px;
			font-size: 16px;
		}
	}
	/*文章样式*/
	.article{
		margin:20px 0;
		padding: 20px 20px 15px;
		box-sizing: border-box;
		background: white;
		.title{
			display: flex;
			border-bottom: 1px solid;
			min-height: 50px;
			line-height: 50px;
			h1{
				flex: 4;
				font-size: 1.3rem;
				a{
					text-decoration: none;
					color: black;
					transition: all 0.5s;
				}
			}
			.time{
				flex: 1;
				text-align: right;
				vertical-align: middle;
				span{
					vertical-align: middle;
				}
			}
		}
		.title:hover a{
			margin-left: 15px;
			color: orange;
		}
		.content{
			margin:20px 0 0;
			p{
				margin-bottom: 30px;
			}
			a{
				color: orange;
				text-decoration: none;
			}
			hr{
				margin: 15px 0;
			}
			/deep/ img{
				max-width: 100%;
			}
			.bottom{
				min-height: 30px;
				line-height: 30px;
				position: relative;
				.iconfont{
					font-size: 18px;
					margin-right: 5px;
					vertical-align: middle;
				}
				.bottomTag{
					display: inline-block;
					margin-right: 10px;
					.tag{
						min-width: 30px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						background:#5bc0de;
						display: inline-block;
						margin:0 10px;
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
				.bottomType{
					display: inline-block;
				}
				.more{
					height: 30px;
					line-height: 30px;
					padding: 0 10px;
					border-radius: 3px;
					display: inline-block;
					background:#5cb85c;
					position: absolute;
					right: 10px;
					a{
						color: white;
					}
				}
			}
		}
	}
}

@media screen and (max-width: 900px) {
	.allArticle{
		padding: 20px 0;
		.article .title{
			display: block;
			.time{
				text-align: left;
			}
		}
		.article .content .bottom{	
			display: flex;
			.bottomTag{
				flex: 5;
				.tag{
					margin:0 8px;
				}
			}
			
			.bottomType{
				flex: 2;
			}
			.more{
				display: none;
			}
			
		}
	}
	
}
</style>