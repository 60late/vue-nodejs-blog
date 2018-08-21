// //引入mock
// let Mock=require('mockjs');

// //定义不同接口和返回的数据的格式

// //获取所有文章
// const allArticle=Mock.mock({
// 	'passages|2-20':[
// 		{
// 			'title':'@ctitle(5,30)',//标题，1到8个字的标题
// 			'time':'201@integer(3,8)-@integer(1,12)-@integer(1,31)',//时间
// 			'articleId|+1':1,//文章的id，从1开始递增
// 			'breif|1-3':`@cparagraph(10,20)<p style="text-align:center;margin:10px 0;"><img style="max-width:100%" style="" src="@dataImage()" /></p>`,//文章简介，10到20个句子
// //			'content':'@cparagraph(30,50)',//文章内容
// 			'tag|1-3':['@ctitle(2,5)'],
// 			'type':'@ctitle(2)'
// 		}
// 	]
// });

// export default{
// 	allArticle,
// }

// Mock.mock('/api/all','post',allArticle);

// //获取单个文章
// Mock.mock('/api/one','post',{
// 	'passage':
// 		{
// 			'title':'@ctitle(5,30)',//标题，1到8个字的标题
// 			'time':'201@integer(3,8)-@integer(1,12)-@integer(1,31)',//时间
// 			'articleId|+1':1,//文章的id，从1开始递增
// 			'breif|1-3':`@cparagraph(10,20)<div style="text-align:center;margin:10px 0;"><img style="max-width:100%" src="@dataImage()" /></div>`,//文章简介，10到20个句子
// 			'content|1-5':'@cparagraph(30,50)<div style="text-align:center;margin:10px 0;"><img style="max-width:100%" src="@dataImage()" /></div>',//文章内容
// 			'tag|1-3':['@ctitle(2,5)'],
// 			'comment|1-10':[{'name':'@ctitle(2,4)','time':'201@integer(3,8)-@integer(1,12)-@integer(1,31)','img':'@dataImage','content':'@cparagraph(2,20)'}],
// 		}
// });


// //获取技术文章
// const techArticle=Mock.mock({
// 	'passages|2-20':[
// 		{
// 			'title':'@ctitle(5,30)',//标题，1到8个字的标题
// 			'time':'201@integer(3,8)-@integer(1,12)-@integer(1,31)',//时间
// 			'articleId|+1':1,//文章的id，从1开始递增
// 			'breif|1-5':`@cparagraph(10,20)<div style="text-align:center;margin:10px 0;"><img  style="max-width:100%" src="@dataImage()" /></div>`,//文章简介，10到20个句子
// 			'content':'@cparagraph(30,50)',//文章内容
// 			'tag|1-3':['@ctitle(2,5)'],
// 			'type':'@ctitle(2)'
// 		}
// 	]
// })

// Mock.mock('/api/tech','post',techArticle);


// //获取音乐文章
// const musicArticle=Mock.mock({
// 	'passages|2-20':[
// 		{
// 			'title':'@ctitle(5,30)',//标题，1到8个字的标题
// 			'time':'201@integer(3,8)-@integer(1,12)-@integer(1,31)',//时间
// 			'articleId|+1':1,//文章的id，从1开始递增
// 			'breif|1-5':`@cparagraph(10,20)<div style="text-align:center;margin:10px 0;"><img style="max-width:100%" src="@dataImage()" /></div>`,//文章简介，10到20个句子
// 			'content':'@cparagraph(30,50)',//文章内容
// 			'tag|1-3':['@ctitle(2,5)'],
// 			'type':'@ctitle(2)'
// 		}
// 	]
// })

// Mock.mock('/api/music','post',musicArticle);


// //获取感悟文章
// const senseArticle=Mock.mock({
// 	'passages|2-20':[
// 		{
// 			'title':'@ctitle(5,30)',//标题，1到8个字的标题
// 			'time':'201@integer(3,8)-@integer(1,12)-@integer(1,31)',//时间
// 			'articleId|+1':1,//文章的id，从1开始递增
// 			'breif|1-5':`@cparagraph(10,20)<div style="text-align:center;margin:10px 0;"><img style="max-width:100%" src="@dataImage()" /></div>`,//文章简介，10到20个句子
// 			'content':'@cparagraph(30,50)',//文章内容
// 			'tag|1-3':['@ctitle(2,5)'],
// 			'type':'@ctitle(2)'
// 		}
// 	]
// })

// Mock.mock('/api/sense','post',senseArticle);

// ////获取归档中的文章
// //const sortFile=Mock.mock({
// //	'passages|2-20':[
// //		{
// //			'title':'@ctitle(5,20)',//标题，1到8个字的标题
// //			'time':'@date',//时间
// //			'articleId|+1':1,//文章的id，从1开始递增
// //		}
// //	]
// //})
// //
// //Mock.mock('/api/sortFile','post',sortFile);

// //获取搜索文章
// Mock.mock('/api/searchPassages','post',{
// 	'passages|2-20':[
// 		{
// 			'title':'@ctitle(5,30)',//标题，1到8个字的标题
// 			'time':'201@integer(3,8)-@integer(1,12)-@integer(1,31)',//时间
// 			'articleId|+1':1,//文章的id，从1开始递增
// 			'breif':`@cparagraph(5,10)`,//文章简介，10到20个句子
// 			'tag|1-3':['@ctitle(2,5)'],
// 			'type':'@ctitle(2)'
// 		}
// 	]
// });

// //获取所有tag
// const tags=Mock.mock({
// 	'tags|2-20':['@ctitle(1,5)']
// })

// Mock.mock('/api/tags','post',tags);


// //点击不同tag后获取相应文章
// Mock.mock('/api/tagPassages','post',{
// 	'passages|2-20':[
// 		{
// 			'title':'@ctitle(5,30)',//标题，1到8个字的标题
// 			'time':'201@integer(3,8)-@integer(1,12)-@integer(1,31)',//时间
// 			'articleId|+1':1,//文章的id，从1开始递增
// 			'breif':`@cparagraph(5,10)`,//文章简介，10到20个句子
// 			'tag|1-3':['@ctitle(2,5)'],
// 			'type':'@ctitle(2)'
// 		}
// 	]
// });