# vue-nodejs-blog

Alphabet的个人博客项目  Ver0.0

在线预览地址:http://hyj.60late.com


# 前言

本项目是一个前后端分离的vue+nodejs博客项目，一路踩坑边学边用摸爬滚打终于初步上线

所有页面没有使用任何第三方ui框架，所有页面效果，页面功能均由个人独立完成

由于书写时间仓促，该博客仍有许多需要改进的地方，我会保持对该博客项目的更新

（<del>找工作和更新项目并不冲突，我会开始持续更新本项目，10月12日<del>）。

如果该博客对你有帮助，欢迎star和issue！

![a](https://i.loli.net/2018/08/21/5b7b891320be3.gif)

# 技术栈
+ 前端：vue+vue-router+vuex+axios
+ 后端：node.js+express+mysql
+ 富文本编辑器：ueditor


# 项目运行
```
前端
//安装前端依赖(在最外层文件夹中运行npm install命令)
npm install

//开启前端dev服务
npm run dev

后端
//切换到server文件夹安装后端依赖
\server>npm install

//初始化数据库内容
\server>node database.js

//运行后端服务器
\server>node app.js

```

之后浏览器打开localhost:8080 即可访问

!!!注意!!!
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
### ver 0.0 版本实现的功能（已实现）：
ver 0.0版本完成了基础的文章展示，文章搜索，登录验证，文章管理等相关功能。
+ 前台展示（文章阅读、文章评论、上一篇下一篇文章，根据标签、关键词搜索相应文章）
+ 后台登录（使用Json web token验证登录状态,axios对返回信息拦截控制路由状态）
+ 后台管理（文章发布与设为草稿，文章修改，文章删除，评论管理，修改我的信息）

### ver1.0 版本预期实现的功能（待办，短期）
+ 全面优化网站性能，增加可用性和可维护性
+ 后台由express升级为koa2
+ 分享功能（QQ、微信、知乎等）
+ 分页功能
+ 前端界面效果的全面升级

### ver2.0 版本预期实现的功能（待办，长期）
+ 项目整体进行SSR（服务器端渲染）
+ 前台添加音乐播放功能
+ 后台添加"插入音乐功能”，将其整合在富文本编辑器中
+ 添加个人应用栏目的内容，放入个人写的小demo

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
│  │  ├─user        //用户接口				
│  └─util           //后端共用方法
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

#### 文章预览页面
![](https://i.loli.net/2018/08/30/5b87d5cbed6c4.png)

#### 文章详情页
![](https://i.loli.net/2018/08/30/5b87d60846c78.png)


![](https://i.loli.net/2018/08/30/5b87d62b3878b.png)


#### 站内搜索页

![](https://i.loli.net/2018/08/21/5b7b8e415378e.png)


## 后台管理页面

#### 文章管理列表
![](https://i.loli.net/2018/08/21/5b7b8f9734c20.png)

#### 修改文章|创建新文章
![](https://i.loli.net/2018/08/30/5b87d65e8650d.png)

#### 更改我的信息

![](https://i.loli.net/2018/08/21/5b7b905c40483.png)




# 许可
MIT
