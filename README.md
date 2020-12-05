# vue-nodejs-blog

Alphabet的个人博客项目  Ver0.0

# 前言

本项目是一个前后端分离的vue+nodejs博客项目，一路踩坑边学边用摸爬滚打终于初步上线

所有页面没有使用任何第三方ui框架，所有页面效果，页面功能均由个人独立完成

如果该博客对你有帮助，欢迎star和issue！

![a](https://i.loli.net/2018/08/21/5b7b891320be3.gif)

# 后记

 该项目始于2018年，技术栈是vue2.x，是作者初学vue时的作品。  
 现在过了两年回头再看本项目，确有诸多不足，但项目中用到的一些工具和方法今日来看依然没有过时，作为入门的项目仍然尚可。  
 vue 3.0 今年已经面世，本项目今后不会再进行功能性的更新，但会偶尔解决一些依赖的问题 （至少能保证项目能跑起来）  
 祝好  
 60late

# 技术栈

+ 前端：vue+vue-router+vuex+axios
+ 后端：node.js+express+mysql
+ 富文本编辑器：ueditor

# 项目运行

```
// 安装前后端依赖
npm run init

// 开启前端服务
npm run dev

// 开启后端服务
cd server
node app.js

```

之后浏览器打开localhost:8080 即可访问，如果依赖安装部分出现了问题，可以使用以下命令手动处理：

```
// 安装前端依赖
npm run install

// 安装后端依赖
cd server
npm run install

// 初始化数据库
cd server
node database.js
```

!!!注意
----

你的电脑上必须安装了mysql，并且mysql的相关配置如下才能进行正常运行。

```
    host:'localhost',
    user:'root',
    password:'',
```

如果上面的配置和你电脑上的配置不同，那么你可以修改server/db.js 和server/database.js 里面的相应内容之后，再按照上述步骤启动项目

后台管理页面的测试账号和密码都是:admin

# 实现功能

### ver 0.0 版本实现的功能（已实现）

ver 0.0版本完成了基础的文章展示，文章搜索，登录验证，文章管理等相关功能。

+ 前台展示（文章阅读、文章评论、上一篇下一篇文章，根据标签、关键词搜索相应文章）
+ 后台登录（使用Json web token验证登录状态,axios对返回信息拦截控制路由状态）
+ 后台管理（文章发布与设为草稿，文章修改，文章删除，评论管理，修改我的信息）

# 项目结构

```
主要目录结构如下：

│
├─server            //后端目录
│  ├─app.js         //后端入口
│  ├─database.js    //数据库初始化文件
│  ├─db.js          //封装数据库操作文件
│  ├─public         //后台静态目录
│  │  ├─file
│  │  ├─img
│  │  ├─file
│  │  ├─img
│  │  ├─stylesheets
│  │  ├─ueditor     //ueditor相关的配置文件
│  │  └─video
│  ├─routes
│  │  ├─frontend    //前端接口
│  │  ├─backend     //后端接口
│  │  ├─user        //用户登陆信息接口
│  └─util           //后端公用方法
├─src               //前端目录
│  ├─assets
│  ├─components     //全局公用组件
│  ├─fetch          //封装axios请求  
│  ├─mock           //mock.js生成模拟数据（用于前后端分离调试接口阶段）
│  ├─router         //vue-router路由控制
│  ├─store          //vuex 状态管理
│  ├─util           //全局共用方法
│  └─views
│      ├─aboutMe  
│      ├─admin      //后台view层
│      ├─file
│      ├─home
│      ├─music
│      ├─myApp
│      ├─nav        //导航栏
│      ├─search
│      ├─sense
│      └─tech
└─static            //静态文件
    ├─css
    ├─img
    └─UE

```

# 项目预览

## 前台页面

地址： <http://localhost:8080/#/>

#### 文章预览页面

![](https://i.loli.net/2018/08/30/5b87d5cbed6c4.png)

#### 文章详情页

![](https://i.loli.net/2018/08/30/5b87d60846c78.png)

![](https://i.loli.net/2018/08/30/5b87d62b3878b.png)

#### 站内搜索页

![](https://i.loli.net/2018/08/21/5b7b8e415378e.png)

## 后台管理页面

地址： <http://localhost:8080/#/admin>
账号密码都是 admin

#### 文章管理列表

![](https://i.loli.net/2018/08/21/5b7b8f9734c20.png)

#### 修改文章|创建新文章

![](https://i.loli.net/2018/08/30/5b87d65e8650d.png)

#### 更改我的信息

![](https://i.loli.net/2018/08/21/5b7b905c40483.png)

# 许可

MIT
