<template>
	<div class="oneArticle">
		<div class="article">
			<div class="title">
				<h1>{{passage.title}}</h1>
				<div class="time">
					<span class="iconfont icon-shijian"></span>
					<span>{{passage.time}}</span>
				</div>
			</div>
			<div class="content">
				<p v-html="passage.content"></p>
				<hr />
				<div class="bottom">
					<span class="iconfont icon-tag1"></span>
					<div class="tag" v-for="tag in passage.tags" @click="findTag(tag)" v-if="tag">
						<span>{{tag}}</span>
					</div>
					<div class="share"> 
						<span class="iconfont icon-zanzhuanhuan0101" title="该功能待开发，别使劲点了！"></span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="nav">
			<div class="pre" v-show="pre"><span @click="goPrePsg">上一篇文章</span></div>
			<div class="next" v-show="next"><span @click="goNextPsg">下一篇文章</span></div>
		</div>
		
		<div class="comment">
			<!--写评论-->
			<div class="write">
				<p>发表评论</p>
				<p>昵称</p>
				<input type="text" v-model="name" placeholder="←伱的茗字→">
				<p>评论内容</p>
				<textarea placeholder="说嘛" v-model="content"></textarea>
				<div class="finish">
					<button @click="makeComment(articleId)">发表评论</button>
				</div>
			</div>
			
			<p>评论区</p>
			<hr/>
			
			<!--看评论-->
			<div class="see" v-for="one in comments">
				<div class="person">
					<img :src="one.imgSrc"/>
					<span>{{one.name}}</span>
					<span>{{one.time}}</span>
				</div>
				<div class="personComment">
					<span>{{one.content}}</span>
				</div>
			</div>
			<div class="notice" v-if="comments.length<1">
				<span class="iconfont icon-meiyoudingdan-01"></span>暂时还没有任何评论
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../fetch/api.js'
	
	export default{
		name:'oneArticle',
		props:['articleId'],
		inject:['reload'],
		data(){
			return {
				passage:[],
				name:'',
				content:'',
				comments:[],
				pre:'',
				next:'',
			}
		},
		created(){
			//获取文章操作
			this.getOneArticle();
			this.getComments();
		},
		mounted(){
			this.testPreNext();
		},
		methods:{
			findTag(tag){
				this.$router.push({name:'searchTag',params:{tagStr:tag}});
			},
			getOneArticle(){
				api.oneArticleFront(this.articleId).then(res=>{
					switch(res.code){
						case '200':
							console.log(res.data);
							this.passage=res.data;
							//将标签分割
							this.passage.tags=this.passage.tags.split(',');
							break;
						case '400':
							console.log('服务器炸了');
							break;
					}

				},err=>{
					console.log(err);
				});
			},
			findTag(tag){
				this.$router.push({name:'searchTag',params:{tagStr:tag}});
			},
			//检查上一条或者下一条记录是否存在
			testPreNext(){
				api.prePsgFront(this.articleId).then(res=>{
					switch(res.code){
						case '200':
							this.pre=res.data.id;
							break;
						case '204':
							console.log('没有上一条了！')
							this.pre=false;
							break;
						case '400':
							console.log('服务器炸了');
							break;
					}
					console.log(res);
				},err=>{	
					console.log(err);
				});

				api.nextPsgFront(this.articleId).then(res=>{
					switch(res.code){
						case '200':
							this.next=res.data.id;
							break;
						//无内容
						case '204':
							console.log('没有下一条了！')
							this.next=false;
							break;
						case '400':
							console.log('服务器炸了');
							break;
					}
				},err=>{	
					console.log(err);
				});
			},
			goPrePsg(){
				this.$router.push({name:'articles',params:{articleId:this.pre}});
				this.reload();
			},
			goNextPsg(){
				this.$router.push({name:'articles',params:{articleId:this.next}});
				this.reload();
			},
			getComments(){
				api.getCommentsFront(this.articleId).then(res=>{
					switch(res.code){
						case '200':
							console.log(res.data);
							this.comments=res.data;
							this.comments.forEach(element=>{
								element.imgSrc=this.randomImg();
							})
							console.log(this.comments.imgSrc);
							break;
						case '400':
							console.log('服务器炸了');
							break;
					}

				},err=>{
					console.log(err);
				});
			},
			makeComment(){
				api.makeCommentFront(this.articleId,this.name,this.content).then(res=>{
					switch(res.code){
						case '200':
							console.log(res.data);
							alert('评论成功！');
							this.reload();
							break;
						case '400':
							alert('服务器炸了');
							break;
					}
				},err=>{
					console.log(err);
				});
			},
			randomImg(){
				//随机生成一张图片
				let imgSrc='/static/img/img'+Math.floor(Math.random()*10)+'.jpg';
				return imgSrc;
			}
		}
		
	}
</script>

<style scoped lang="less">

.oneArticle{
	img{
		max-width: 100%;
	}
	padding: 20px;
	/*文章区*/
	.article{
		padding: 20px;
		box-sizing: border-box;
		background: white;
		.title{
			display: flex;
			border-bottom: 1px solid;
			min-height: 50px;
			line-height: 50px;

			h1{
				flex: 5;
				font-size: 1.3rem;
			}
			.time{
				flex: 1;
				text-align: center;
				vertical-align: middle;
				span{
					vertical-align: middle;
				}
			}
		}
		.content{
			margin:20px 0 10px;
			p{
				margin-bottom: 20px;
			}
			a{
				color: orange;
				text-decoration: none;
			}
			.bottom{
				position: relative;
				margin-top: 20px;
				img{
					text-align: center;
				}
				.iconfont{
					font-size: 18px;
					vertical-align: middle;
					margin-right: 15px;
				}
				.tag{
					min-width: 30px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					background:#5bc0de;
					display: inline-block;
					vertical-align: middle;
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
				.share{
					display: inline-block;
					position: absolute;
					right: 10px;
					cursor: pointer;
				}
			}	
		}
		// 由于样式scoped了，我们又用的是less，所以对v-html里面的内容设置样式时,要用深度作用选择器 >>>。less里面 /deep/等同于其他的>>>
		/deep/ img{
			max-width: 100%;
		}
	}
	
	/*上一篇文章,下一篇文章导航区*/
	.nav{
		display: flex;
		margin:20px;
		.pre,.next{
			flex: 1;
			padding: 0 15px;
			text-decoration: none;
			span{
				cursor: pointer;
			}
			span:hover{
				color: orange;
			}
		}
		.next{
			text-align: right;
		}
	}
	
	/*评论区*/
	.comment{
		margin: 30px 0 50px;
		background: white;
		padding: 30px 20px;
		box-sizing: border-box;
		min-height: 500px;
		position: relative;
		.write{
			margin-bottom:30px;
			p{
				margin: 10px 0;
				font-size: 18px;
			}
			input{
				width: 100%;
				padding: 8px 8px;
				box-sizing: border-box;
				border:1px solid #cccccc; 
				border-radius: 5px;

			}
			textarea{
				width: 100%;
				height: 200px;
				display: inline-block;
				border-radius: 5px;
				resize: none;
				overflow: hidden;
				font-size: 18px;
				padding: 5px;
				box-sizing: border-box;
				border:1px solid #cccccc; 
			}
			.finish{
				margin-top: 10px;
				text-align: right;
			}
			.finish button{
				height: 35px;
				line-height: 35px;
				padding:0 10px;
				font-size: 15px;
				box-sizing: border-box;
				background: forestgreen;
				outline: none;
				border: 1px solid;
				border-radius: 5px;
				color: white;
				display: flex;
				flex-direction: column-reverse;
				display: inline-block;
				cursor: pointer;
			}
		}
		.see{
			border-bottom: 1px solid;
			padding: 10px;
			margin-bottom: 50px;
			.person{
				display: flex;
				align-items: center;
				img{
					width: 80px;
					height: 80px;
					border-radius: 50%;
				}
				span:nth-child(2){
					flex: 1;
					margin-left:30px ;
					text-align: left;
					font-size: 15px;
				}
				span:last-child{
					flex: 1;
					text-align: right;
					margin-right: 20px;
				}
			}
			.personComment{
				margin: 30px 5px;
				padding: 0 15px;
				box-sizing: border-box;
			}
		}
		.notice{
			min-height: 200px;
			display: flex;
			justify-content: center;
			align-items: center;
			span{
				font-size: 25px;
				margin-right: 20px;
			}
		}
		hr{
			margin-bottom: 20px;
		}
	}
}
@media screen and (max-width: 900px) {
	.oneArticle{
		padding: 0;
		.article .title{
			display: block;
			.time{
				text-align: left;
			}
		}
	}

}
</style>