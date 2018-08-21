
let express = require('express');
const router = express.Router();
//引入工具文件
let util=require('../util/util.js');
let upload=util.upload.single('file');

//引入封装好的数据库操作
let db=require('../db.js');

//登录路由
router.post('/login',(req,res)=>{
  let account=req.body.account;
  //对密码进行加密验证
  let password=util.encrypt(req.body.password);
  console.log(password);
  //生成一个token
  let token=util.encodeJwt();
  let sql=db.login(account,password);
  //生成以一个token
  db.Query(sql).then(data=>{
    //在数据控能够查找到结果时，将token发送给前台
    if(data.length){
      console.log('用户登录成功！');
      res.send({"code":"200","sucess":"登录成功！","token":token,});
    }else{
      res.send({"code":"401","error":"账号或者密码错误，登录失败！"});
    }
    },err=>{
    res.send({"code":"401","error":"账号或者密码错误，登录失败！"});
  })
});


// 获取个人信息
router.get('/getInfo',(req,res)=>{
  let sql=db.getInfo();
  db.Query(sql).then(data=>{
    console.log('获取个人信息成功！');
    res.send({"code":"200","data":data[0]});
  },err=>{
    console.log(err);
    res.send({"code":"400","error":"服务器开小差了"});
  });
});


//更改个人信息
router.post('/changeInfo',upload, (req, res)=> {
  //如果有传了图片，才
    let url;
    let params=req.body;
    let id=1;
    //如果有图片，那么就获取图片
    if(req.file){
      //拼接文件上传后的路径，由于之前用了express.static，所以这里不用写public，直接写/img/
      url ='http://localhost:8081/img/user/'+req.file.filename;
    }

    let sql=db.changeInfo(id,params,url);
    db.Query(sql).then(data=>{
      console.log('图片上传成功');
      res.send({"code":"200"});
    },err=>{
      console.log(err);
      res.send({"code":"400"});
    });
  
});

module.exports = router;
