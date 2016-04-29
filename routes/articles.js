var express = require("express");
var auth = require('../middleware/auth');
var models = require('../models/index');
var multer = require('multer');
var markdown = require('markdown').markdown;
//指定图片存储目录和文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'../public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"."+file.mimetype.slice(file.mimetype.indexOf('/')+1))
    }
});
//中间件函数,路由中可以使用
var upload = multer({storage:storage});
var router = express.Router();
//发表文章
router.get('/add', auth.checkLogin,function (req, res, next) {
    res.render('article/add',{title:"发表文章"});
});
//接收发表文章
//upload.single('poster')负责把上传的图片放到指定的目录里，poster是文件的name,form里定下的
router.post('/add',auth.checkLogin, upload.single('poster'),function (req, res, next) {
    var article = req.body;
    var _id = article._id;
    if(_id){//有值，说明是编辑的，要更新
        var updateObj = {title:article.title,content:article.content};
        if(req.file){
            updateObj.poster = '/uploads/'+req.file.filename;
        }
        models.ArticleModel.update({_id:_id},{$set:updateObj}, function (error, result) {
            if(error){
                req.flash('error','文章更新失败');
            }else{
                req.flash('success','文章更新成功');
                res.redirect('/');
            }
        });
    }else{//没有值，说明是新提交上来的
        //当上传图片到服务器时，不能再用req.body去处理了，要用中间件multer
        if(req.file){
            article.poster = '/uploads/'+req.file.filename;
        }
        article.user = req.session.user._id;
        models.ArticleModel.create(article, function (error,doc) {
            if(error){
                req.flash('error','文章发表失败');
            }else{
                req.flash('success','文章发表成功');
                res.redirect('/');
            }
        });
    }
});
//文章详情页
router.get('/detail/:_id', function (req, res,next) {
    var _id = req.params._id;
    models.ArticleModel.findById(_id, function (error, article) {
        article.content = markdown.toHTML(article.content);
        res.render('article/detail',{title:"文章详情",article:article});
    });
});
//删除文章
router.get('/delete/:_id', function (req, res, next) {
    var _id = req.params._id;
    models.ArticleModel.remove({_id:_id}, function (error,result) {
        res.redirect('/');
    });
});
//编辑文章
router.get('/edit/:_id', function (req, res, next) {
    var _id = req.params._id;
    models.ArticleModel.findById(_id, function (error, article) {
        res.render('article/add',{title:'编辑文章',article:article});
    });
});
module.exports = router;






