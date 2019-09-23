
// 引入express
let express = require('express');
// 引入路径处理模块
let path = require('path');
//引入处理解析中间体模块
let bodyParser = require('body-parser');
//引入editor
let ueditor=require('ueditor');
// 引入cors解决跨域
let cors = require('cors');

//引入express-jwt用来解决token的验证问题,express-jwt和jwt都要引入(jwt的加密解密方法在util里面),两者解决的问题不同（jwt用来加密，express-jwt用来验证）。
let expressJWT = require('express-jwt');

//引入路径
let frontendRouter=require('./routes/frontend');
let backendRouter = require('./routes/backend');
let usersRouter = require('./routes/users');

// 实例化
let app = express();
app.listen(8081);
console.log('后端服务已开启,现在监听8081端口...')

//使用所需中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//解析application/json
app.use(bodyParser.json({ limit: '10mb' }));
//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit:'50mb',extended: true }))


//使用expressJWT对路由进行token验证
let secretOrPrivateKey = "mykey"  //私钥 校验token时要使用
app.use(expressJWT({
    secret: secretOrPrivateKey   
}).unless({
    path: ['/api/user/login','/api/user/getInfo','/ueditor/ue']  //这里可以设置保护路由，login就不用进行token验证
}));

//token拦截器，当token失效时发出注销账号指令
app.use('/*',function(err, req, res, next) {
    console.log(err.name);
    originalUrl=req.originalUrl;
    console.log(originalUrl);
    //只对后端路由和部分user路由进行验证
    //如果请求/user或者/backend相关的内容，就进行token验证，仅访问前端内容不进行token验证
    if(originalUrl.indexOf('/api/user')>-1||originalUrl.indexOf('/api/backend')>-1){
        
        if (err.name === 'UnauthorizedError') { 
            console.log('身份认证不通过');
            //如果身份验证不通过，则发送错误信息提示，前端收到该提示后，在router拦截器里面设置相应对应办法
            res.send({"code":'401',"err":err});
        }else{
            next();   
        }
    }else{
        next();  
    }
});

//route设置,拦截器在前，route在后。这两者之间位置不能搞混。
app.use('/api/frontend',frontendRouter);
app.use('/api/backend',backendRouter);
app.use('/api/user', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));



// ueditor相关配置放到app.js中，省去麻烦
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
  //客户端上传文件设置
  var imgDir = '/img/ueditor/'
  var ActionType = req.query.action;
  console.log(ActionType);
  if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
      var file_url = imgDir;//默认图片上传地址
      /*其他上传格式的地址*/
      if (ActionType === 'uploadfile') {
          file_url = '/file/ueditor/'; //附件  
      }
      if (ActionType === 'uploadvideo') {
          file_url = '/video/ueditor/'; //视频
      }
      res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
      res.setHeader('Content-Type', 'text/html');
      console.log('上传成功')
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
      var dir_url = imgDir;
      res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
      console.log('congfig正常')
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/ueditor/nodejs/config.json');
  }
}));



module.exports = app;
