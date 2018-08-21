// 引入路由
const router=require('express').Router();
//引入封装好的数据库操作
let db=require('../db.js');

//前台接口

//获取所有文章的接口
router.get('/allArticle',(req,res)=>{
    let sql=db.allArticleFront();
    console.log('前端获取所有文章');
    db.Query(sql).then(data=>{
        res.send({"code":"200","data":data});
    },err=>{
        res.send({"code":"400","err":"服务器开小差了"});
    })
});

//根据id获取单篇文章的接口
router.get('/oneArticle',(req,res)=>{
    let id=req.query.id;
    let sql=db.oneArticleFront(id);
    console.log('获取单篇文章');
    db.Query(sql).then(data=>{
        res.send({"code":"200","data":data[0]});
    },err=>{
        res.send({"code":"400","err":"服务器开小差了"});
    })
});

//获取上一篇文章的接口
router.get('/prePassage',(req,res)=>{
    let id=req.query.id;
    let sql=db.prePsgFront(id);
    console.log('获取上一篇文章');
    db.Query(sql).then(data=>{
        if(data[0]){
            res.send({"code":"200","data":data[0]}); 
        }else{
            res.send({"code":"204"})
        }
    },err=>{
        res.send({"code":"400","err":"服务器开小差了"});
    })
});

//获取下一篇文章的接口
router.get('/nextPassage',(req,res)=>{
    let id=req.query.id;
    let sql=db.nextPsgFront(id);
    console.log('获取下一篇文章');
    db.Query(sql).then(data=>{
        if(data[0]){
            res.send({"code":"200","data":data[0]}); 
        }else{
            res.send({"code":"204"})
        }
    },err=>{
        res.send({"code":"400","err":"服务器开小差了"});
    })
});

//获取分类文章的接口
router.get('/categoryArticle',(req,res)=>{
    let sql=db.categoryArticleFront(req.query.category);
    console.log('前端获取分类文章');
    db.Query(sql).then(data=>{
        res.send({"code":"200","data":data});
    },err=>{
        res.send({"code":"服务器开小差了！"});
    })
})

//获取归档文章的接口
router.get('/sortFile',(req,res)=>{
    let sql=db.sortFileFront();
    console.log('前端获取归档文章');
    db.Query(sql).then(data=>{
        res.send({"code":"200","data":data});
    },err=>{
        res.send({"code":"服务器开小差了！"});
    })
})

//获取所有标签的接口
router.get('/tags',(req,res)=>{
    let sql=db.allTagsFront();
    console.log('前端获取所有tags');
    db.Query(sql).then(data=>{
        res.send({"code":"200","data":data});
    },err=>{
        res.send({"code":"服务器开小差了！"});
    })
})

//根据标签获取文章接口
router.get('/tagPassages',(req,res)=>{
    let tag=req.query.tag;
    let sql=db.tagPassagesFront(tag);
    console.log('前端根据标签获取文章列表');
    db.Query(sql).then(data=>{
        console.log(data);
        res.send({"code":"200","data":data});
    },err=>{
        res.send({"code":"服务器开小差了！"});
    })
})

// 根据关键字获取相应文章接口（大坑，先做一个最基础最简单的）
router.get('/searchPassages',(req,res)=>{
    let str=req.query.str;
    let sql=db.searchPassageFront(str);
    console.log('前端根据关键字获取文章列表');
    db.Query(sql).then(data=>{
        console.log(data);
        res.send({"code":"200","data":data});
    },err=>{
        res.send({"code":"服务器开小差了！"});
    })
})
//发表评论
router.post('/makeComment',(req,res)=>{
    let comment=req.body;
    let sql=db.makeComment(comment);
    console.log('添加评论');

    db.Query(sql).then(data=>{
        res.send({"code":"200","data":"添加评论成功！"});
    },err=>{
        res.send({"code":"400","err":"服务器炸了"});
    })
})
//获取评论
router.get('/getComments',(req,res)=>{
    console.log(req.query);
    let id=req.query.id;
    let sql=db.getComments(id);
    console.log('获取评论');
    db.Query(sql).then(data=>{
        res.send({"code":"200","data":data});
    },err=>{
        res.send({"code":"400","err":"服务器炸了"});
    })
})

module.exports=router;