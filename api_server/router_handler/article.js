// 文章的处理函数模块
const path=require('path')
// 导入数据库模块
const db=require('../db/index')

// 发布文章的处理函数
exports.addArticle=(req,res)=>{
    // console.log(req.body);//文本类型的数据
    // console.log('---------分割线-------');
    // console.log(req.file);//文件类型的数据

    // res.send('ok')

    // 手动判断是否上传了文章封面
    if(!req.file || req.file.fieldname!=='cover_img')
    return res.cc('文章封面是必选参数！')

    // TODO：表单数据合法
    const articleInfo={
        // 标题、内容、状态、所属的分类ID
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img:path.join('/uploads',req.file.filename),
        // 文章发布时间
        pub_date:new Date(),
        author_id:req.user.id
    }

    const sql='insert into ev_articles set ?'
    db.query(sql,articleInfo,(err,results)=>{
        // 执行SQL语句失败
        if(err) return res.cc(err);
        if(results.affectedRows!==1) return res.cc('发布文章失败！')

        // 发布文章成功
        res.cc('发布文章成功',0)
    })
}

// 获取文章
exports.getArticle = (req, res) => {
    // 定义查询分类列表数据的SQL语句
    const sql = 'select * from ev_articles '
    // 调用db.query()实习SQL语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '获取文章数据成功！',
            data: results
        })
    })
}

// 根据id删除文章
exports.deleteArticle=(req,res)=>{
    // 定义根据ID获取文章数据的SQL语句
    const sql='update ev_articles set id_delete=1 where id=?';
    // 调用db.query()来执行SQL语句
    db.query(sql,req.params.id,(err,results)=>{
        if(err) return res.cc(err);
        if(results.affectedRows!==1) return res.cc('删除文章失败！');
        res.cc('删除文章成功',0);
    })
}