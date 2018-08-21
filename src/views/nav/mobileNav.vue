<template>
	<div class="mobileNav">
		<img src="@/assets/img/myImg.jpg"/>
		<p>“ {{myInfo.signature}} ”</p>
		<a href="https://github.com/60late" target="_blank"><span class="iconfont icon-github"></span></a>
		<a href="http://www.cnblogs.com/60late/" target="_blank"><span class="iconfont icon-bokeyuan "></span></a>
		<nav-search></nav-search>
		
		<div class="triger" :class="[scrollOver==true?'scrollOver':'']">
			<span>{{myInfo.name}}的个人博客</span>
			<div class="icon" id="icon">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
			
		<transition name="toggle">
			<div class="tools" v-show="toolState">
				<ul @click="jumpTo">
					<router-link to="/index"><li>首页</li></router-link>
					<router-link to="/tech"><li>技术</li></router-link>
					<router-link to="/music"><li>音乐</li></router-link>
					<router-link to="/sense"><li>感悟</li></router-link>
					<router-link to="/file"><li>归档</li></router-link>
					<router-link to="/aboutMe"><li>关于</li></router-link>
					<router-link to="/myApp"><li>应用</li></router-link>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>
	import navSearch from "./components/navSearch"
	
	export default{
		name:'mobileNav',
		props:['myInfo'],
		components:{
			navSearch,
		},
		data (){
			return{
				scrollOver:false,//是够向下滑动超过了导航栏底部
				toolState:false, //手机导航栏关闭的状态，
				jump:false,
			}
		},
		inject:['reload'],
		mounted(){
			//监听滚动条的位置
			window.addEventListener('scroll',this.throttle(this.handleScroll,200,300));
			
			//给小图标导航栏添加点击事件
			document.getElementById('icon');
			icon.onclick=this.handleToggle();
			
		},
		methods:{
			//监听滚动条位置，使用了闭包的写法封装了节流函数，实现了滚动条、点击事件的节流,优化了网页性能
			//method:传入调用的方法名。mustRun:两者之间的间隔大于多少则必定执行.delay:如果点击过快，那么就设置一个定时器来触发函数。
			throttle (method,mustRun,delay){
				//scroll方法中当间隔时间大于2s，do somthing执行一次
			    let timer;//使用闭包，缓存startTime
			    let startTime = new Date();
			    
			    return function(){
			        let curTime = new Date();
			        if(curTime - startTime >= mustRun){//如果前后两次操作相隔时间超过mustRun,那么就会执行一次
//			        	console.log('立即执行了函数');
			        	method();
			            startTime = curTime;//重置startTime
			        }else{//操作间隔没有超过,那么久排队delay秒后执行一次
			        	clearTimeout(timer);
			        	timer=setTimeout(function(){
//			        		console.log('延时执行了函数')
			        		method();
			        	},delay);
			        }
			    }
			},
			
			//滚动时为导航条添加样式的函数
			handleScroll(){
				let scrollTop=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop>150&&this.scrollOver==false){//距离顶部大于150px时添加class	
					this.scrollOver=true;
//					console.log('添加了样式');
                }else if(scrollTop<150&&this.toolState==false&&this.scrollOver==true){//在顶部收起导航条时（即toolState==false时，需要把block的样式去除）
            		this.scrollOver=false;	
//              	console.log('去除了样式');
                }
			},
			
			//打开手机导航栏
			handleToggle(){
				let that=this;
				let toggleTimer;
				
				return function(){
					that.toolState=!that.toolState;
					let scrollTop=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
					clearTimeout(toggleTimer);
//					console.log('计数器正在清除')
					if(that.toolState==false&&scrollTop<250){//工具栏被收起来了，并且在导航栏下方时才隐藏标题栏
						toggleTimer=setTimeout(function(){
//							console.log('文字收起来了正在执行');
							that.scrollOver=false;
						},600)
//						console.log('收起了');
					}else{
//						console.log('展开了')
						that.scrollOver=true;
					}	
				}
			},
			jumpTo(){
				//调用了home.vue中的reload方法，使得在点击导航栏进行页面跳转时，顶部导航栏可以消失
				this.reload();
			}
		}
	}
</script>

<style scoped lang="less">
	.mobileNav{
		display: none;
		width: 100%;
		height: 300px;
		background: #353d47;
		text-align: center;
		padding:20px 0;
		box-sizing: border-box;
		a{
			text-decoration: none;
		}
		.iconfont{
			font-size: 2.2rem;
			color: white;
			margin:0 10px 10px;
		}
		img{
			width: 130px;
			height:130px;
			border-radius: 50%;
		}
		p{
			margin:10px 3px;
			font-size: 1.4rem;
			color: white;
		}
		.triger{
			width: 100%;
			height: 50px;
			line-height: 50px;
			position: fixed;
			top: 0;
			z-index: 100;
			cursor: pointer;
			text-align: left;
			padding-left: 20px;
			box-sizing: border-box;	
			span{
				color: white;
				font-size: 20px;
				display:none;
				
			}
			.icon{
				position: absolute;
				top: 15px;
				right: 15px;
				span{
					display: block;
					width: 20px;
					height: 2px;
					background: white;
					margin-bottom: 5px;
				}
			}
		}
		
		.scrollOver{
			background:#353d47;
			border-bottom: 1px solid gray;
			span{
				display: inline;
			}
		}
		
		.tools{
			width: 100%;
			height: 250px;
			position: fixed;
			top: 50px;
			z-index: 99;
			background:#353d47;
			overflow: hidden;
			border-bottom: 1px solid white;
			li{
				text-align: center;
				height: 35px;
				line-height: 35px;
				font-size: 18px;
			}
			a{
				color: white;
				text-decoration: none;
			}
		}
		.toggle-enter,.toggle-leave-to{
			height: 0px;
		}
		
		.toggle-enter-active,.toggle-leave-active{
			transition: all 0.5s ease;
		}
		
	}

	@media screen and (max-width: 900px){
		.mobileNav{
			display: block;
		}
	}
	
</style>
