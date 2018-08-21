<template>
	<div class="file">
		<div class="timeline" v-for="passage in passages">
			<!--文章年份-->
			<div class="year">{{passage.year}}</div>
			<div class="month" v-for="month in passage.month">
				<!--文章月份-->
				<h1>{{month.month}}月</h1>
				<ul>
					<!--文章标题-->
					<li v-for="oneArticle in month.passage">
						<router-link :to="{name:'articles',params:{articleId:oneArticle.articleId}}">
							{{oneArticle.title}}
						</router-link>
					</li>
					<!--oneArticle.articleId是对应的ID-->
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/fetch/api'
	export default{
		name:'sortFile',
		data(){
			return{	
				passages:[]
			}
		},
		created(){
			//获取数据
			this.getPassages();
		},
		methods:{
			getPassages(){
				let originPassages=[];
				api.sortFileFront().then(res=>{
					switch(res.code){
						case '200':
						//获取原始抓取过来的文章，命名为originPassages
						originPassages=res.data;
						break;
					}
					//对每一篇文章赋予年、月值，方便归类
					originPassages.forEach((current)=>{
						let temp=current.time.split("-");
						current.year=temp[0];
						current.month=temp[1];
						current.day=temp[2];
					})

					console.log(originPassages);
					let firstMap=this.mapYear(originPassages);
					let secondMap=this.mapMonth(firstMap);
					console.log(secondMap);
					this.passages=secondMap;	
				},err=>{
					console.log(err);
				});

				//比较时间大小，从近到远排序,后端如果做了排序这一句就可以不要
				// originPassages.sort(function(a,b){
				// 	return (new Date(b.time)-new Date(a.time));
				// });
					
//				原始样式
//				let test=[
//					{year:2018,month:02,title:'这是标题1'},
//					{year:2018,month:02,title:'这是标题1'},
//					{year:2018,month:02,title:'这是标题1'},
//				];
//				目标样式
//				let test1=[
//					{
//						year:'2018',
//						month:[
//							{month:'01',data:[{title:'这是第一篇文章',articleId:'1'}]},
//							{month:'02',data:[{title:'这是第二篇文章',articleId:'1'}]}
//						]
//					}
//				]		
				
			},
			mapYear(arr){
				console.log(arr);
				let newArr=[];
				//循环遍历数组
				arr.forEach((currentPassage,i)=>{
					let index=-1;
					
					//alreadyExit如果为true，说明这个年份在新数组newArr中已经存在了，index存储的是年份的占位点
					let alreadyExit=newArr.some((otherPassage,j)=>{
						if(currentPassage.year==otherPassage.year){
							index=j;
							return true;
						}
					});

					let obj={};
					obj.year=currentPassage.year;
					obj.month=[{title:currentPassage.title,month:currentPassage.month,articleId:currentPassage.id}];
					
					//如果年份不存在,则赋予年份和月份
					if(!alreadyExit){
						newArr.push(obj);
					}else{//如果年份存在
						newArr[index].month.push({title:currentPassage.title,month:currentPassage.month,articleId:currentPassage.id});
					}
				})
				return newArr;
			},
			mapMonth(arr){
				arr.forEach((currentYear,i)=>{
					let newArr=[];
					//循环遍历数组
					let currentMonth=currentYear.month//currentMonth是一个arr，里面有所有月份的数据，只要再把这个月份归一下档就行了
					
					currentMonth.forEach((currentPassage,j)=>{
						let index=-1;
						//alreadyExit如果为true，说明这个年份在新数组newArr中已经存在了，index存储的是年份的占位点
						let alreadyExit=newArr.some((otherPassage,j)=>{
							if(currentPassage.month==otherPassage.month){
								index=j;
								return true;
							}
						});
						
						let obj={};
						obj.month=currentPassage.month;
						obj.passage=[{title:currentPassage.title,articleId:currentPassage.articleId}];
						
						//如果年份不存在,则赋予年份和月份
						if(!alreadyExit){
							newArr.push(obj);
						}else{//如果年份存在
							console.log('出现重复月份文章');
							newArr[index].passage.push({title:currentPassage.title,articleId:currentPassage.articleId});
						}
					})
					currentYear.month=newArr;
				})
				return arr;
			}
		},
		computed:{
		}
	}
</script>

<style scoped lang="less">
	.file{
		padding:30px;
		box-sizing: border-box;
		.timeline{
			padding: 30px;
			box-sizing: border-box;
			background: white;
			position: relative;
			.year{
				width: 50px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				border-radius: 50%;
				background: dodgerblue;
				position: absolute;
				color: white;
				z-index: 80;
				font-size: 20px;
			}
			.month{
				margin:40px 60px 0px;
				h1{
					font-size: 20px;
				}
				ul{
					li{
						max-width: 800px;
						word-wrap: break-word;
						line-height:30px;
						a{
							text-decoration: none;
							color: black;
						}
					}
					li:hover{
						background: lightgrey;
					}	
				}
				
			}
			.month:nth-child(2){
				margin-top:60px;
			}
		}
		.timeline:first-child{
			padding-top: 80px;
		}
		.timeline:last-child{
			padding-bottom: 100px;
		}
		.timeline::after{
			content: "";
			width: 1px;
			height: 100%;
			position: absolute;
			left: 53px;
			top: 0px;
			background: black;
			z-index: 0;
		}
	}
	
	@media screen and (max-width: 900px) {
		.file{
			padding: 30px 0;
		}
	}
</style>