import axios from 'axios'
import qs from 'qs';
import store from '../store/'
import router from '../router/'
// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data;boundary=----WebKitFormBoundaryeOOd9EoQVo6B4Tgb';
//    /api这个位置在config/index.js里面设置了代理，指向 localhost:8081/api这个后台地址
axios.defaults.baseURL = 'http://localhost:8081/api';

// http request 拦截器
axios.interceptors.request.use(
    config => {
		if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Authorization = `Bearer ${store.state.token}`;
		}
		console.log(config);
        return config;
    },
    err => {
        return Promise.reject(err);
    });

//http response 拦截器,路由失效时重新跳转到登录界面
axios.interceptors.response.use(
    response => {
		let data=response.data;
		console.log(data);
		switch(data.code){
			case '401':
			store.commit('logout');
			router.replace({
				path: '/login',
				query: {redirect: router.currentRoute.fullPath}
			});
			break;
		}
		return response;
    }
);

export function fetchPost(url, params,config) {
    console.log(params)
    return new Promise((resolve, reject) => {
        axios.post(url, params,config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}
export function fetchGet(url, paramObj) {
    return new Promise((resolve, reject) => {
         let param={params:paramObj}
           axios.get(url, param)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {

//后台接口
	//后台获取一篇文章的接口(完成)
	oneArticleBack(articleId){
		let params={
			articleId,
		};
		return fetchGet('/backend/getOneArticle',params);
	},

	//后台根据分类获取文章的接口(完成)
	categoryArticleBack(category){
		let params={
			category,
		}
		return fetchGet('/backend/getCategoryArticle',params);
	},
	//后台保存文章的接口(完成)
	saveArticleBack(id,passage){
		let params={
			id,
			passage
		};
		return fetchPost('/backend/saveArticle',params)
	},
	//后台改变文章状态的接口（完成）
	changeStateBack(id,state){
		let params={
			id,
			state
		}
		return fetchPost('/backend/changeState',params)
	},
	//后台删除文章的接口（完成）
	delArticleBack(id){
		let params={
			id,
		}
		return fetchPost('/backend/delArticle',params);
	},
	//后天获取所有评论的接口
	allCommentsBack(){
		return fetchGet('/backend/allComments')
	},
	//后台删除单挑评论的接口
	delCommentBack(id){
		let params={
			id,
		}
		return fetchPost('/backend/delComment',params)
	},
	

// 用户接口（部分前后台共用，所以单独出来）

	//获取个人信息的接口
	getMyInfo(){
		return fetchGet('/user/getInfo');
	},
	//后台登录接口
	login(account,password){
		let params={
			account,
			password
		};
		return fetchPost('/user/login',params);
	},
	//更改个人信息的接口(更改信息这里比较特殊)
	changeMyInfo(formData){
		console.log(formData);
		let data=formData;
		return fetchPost('/user/changeInfo',data);
	},


//前台接口
	
	//所有文章的接口
	allArticleFront(){
		let params={
		};
		return fetchGet('/frontend/allArticle',params);
	},
	// 前台根据分类获取文章接口（由于前台和后台获取分类文章还是有一些不同的，所以分开写）
	categoryArticleFront(category){
		let params={
			category,
		}
		return fetchGet('/frontend/categoryArticle',params);
	},
	// 获取单篇文章接口
	oneArticleFront(id){
		let params={
			id,
		}
		return fetchGet('/frontend/oneArticle',params);
	},
	//上一篇接口
	prePsgFront(id){
		let params={
			id,
		}
		return fetchGet('/frontend/prePassage',params);
	},
	//下一篇接口
	nextPsgFront(id){
		let params={
			id,
		}
		return fetchGet('/frontend/nextPassage',params);
	},
	//评论接口(文章id,评论者姓名,评论内容)
	makeCommentFront(id,name,content){
		let params={
			id,
			name,
			content
		}
		console.log(params);
		return fetchPost('/frontend/makeComment',params);
	},
	getCommentsFront(id){
		let params={
			id,
		}
		return fetchGet('/frontend/getComments',params);
	},
	// 归档的接口 
	sortFileFront(){
		let params={
		};
		return fetchGet('/frontend/sortFile',params);
	},


	//搜索文章（sideBar中输入关键字搜索）
	searchPassageFront(str){
		let params={
			str
		};
		return fetchGet('/frontend/searchPassages',params)
	},
	//获取所有标签
	tagsFront(){
		let params={
		};
		return fetchGet('/frontend/tags',params)
	},
	//点击标签获取相应文章
	tagPassagesFront(tag){
		let params={
			tag,
		};
		return fetchGet('/frontend/tagPassages',params)
	},

}
