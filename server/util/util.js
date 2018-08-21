//放一些公用方法的文件

//引入文件上传模块
const  multer=require('multer');
//引入token验证模块
const jwt = require("jsonwebtoken");
//引入加密模块
const crypto=require('crypto');

//文件上传方法
    let storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
            //和ueditor的图片上传路径分开一下
            cb(null, './public/img/user')
        },
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            let fileFormat = (file.originalname).split(".");
            //命名：采用了原本名字+时间的形式，可以有效避免重名文件的问题
            cb(null, fileFormat[0] + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    });
    //添加配置文件到multer对象。
    let upload = multer({
        storage: storage
    });

//用户密码加盐加密验证
function encrypt(str){
    let salt='this is salt';
    let obj=crypto.createHash('md5');
    obj.update(str+salt);
    let password=obj.digest('hex');
    return password;
}

//jsonwebtoken加密token
function encodeJwt(){
    let content ={msg:"this is info"}; // 要生成token的主题信息
    let secretOrPrivateKey="mykey" ;// 这是加密的key（密钥） 
    let token = jwt.sign(content, secretOrPrivateKey, {
                        expiresIn: 60*60  // 24小时过期 60*60*24,可以设置为10秒来测试JWT是否生效
                    });
    // console.log("token ：" +token );
    return token;
}



// 解密token，验证的方法。由于使用了express-jwt来验证，所以这里可以不用自己写
// function decodeJwt(token){
//     let result=jwt.verify(token, 'I am a goog man!', function(err, decoded) {
//         if (err) {
//             console.log(err.message);
//             return err.message;
//         }
//         console.log(decoded.msg) // bar
//         return decoded.msg;
//     });
//     return result;
// }


module.exports={
    upload,
    encodeJwt,
    encrypt
}