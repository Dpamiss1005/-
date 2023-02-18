// 这是文章的路由模块
const express=require('express');
const router=express.Router();
const path=require('path');
// 导入解析 formdata格式表单数据的包
const multer=require('multer');
// 导入验证数据的中间件
const expressJoi=require('@escook/express-joi')

// 创建multer的实例对象 通过dest属性指定文件的存放路径
const upload=multer({dest:path.join(__dirname,'../uploads')})

// 导入文章的验证模块
const {add_article_schema,delete_article_schema}=require('../schema/article')

// 导入需要的处理函数模块
const article_handler=require('../router_handler/article')


// 发布文章的路由
// upload.single()是一个局部生效的中间件 用来解析FormData格式的表单数据
// 将文件类型的数据 解析并挂载到 req.file属性中
// 将文本类型的数据 解析并挂载到 req.body属性中
// 先使用multer解析表单数据 再使用expressJoi对解析的表单数据进行验证
router.post('/add',upload.single('cover_img'),expressJoi(add_article_schema),article_handler.addArticle)

// 获取文章
router.get('/list',article_handler.getArticle),
// 根据id删除文章
router.get('/delete/:id',expressJoi(delete_article_schema),article_handler.deleteArticle)


module.exports=router;