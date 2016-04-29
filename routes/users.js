var express = require('express');
var models = require('../models');
var util = require('../util');
var auth = require('../middleware/auth');
var router = express.Router();

//以下为用户相关路由的配置，因为app.js文件中已经走到了users，所以以下路由/就表示已经到了users
//注册页面
//在路由里第二个参数是一个中间件，表示先执行该函数，如果成立，则next(),再执行回调，不成立，则不执行回调
router.get('/reg', auth.checkNotLogin,function(req, res, next) {
  res.render("user/reg",{title:"注册"});
});
//向注册页面提交注册信息，数据保存到服务器端(数据库中)
router.post('/reg', auth.checkNotLogin,function (req, res,next) {
  //接收注册时提交的内容，在form中默认是urlencoded
  var user = req.body;
  //判断注册时的密码与确认密码是否一致
  if(user.password != user.repassword){
    res.redirect("back");
  }else{
    //密码进行加密
     req.body.password = util.md5(req.body.password);
    //增加用户头像
    req.body.avatar = 'https://secure.gravatar.com/avatar/'+util.md5(req.body.email)+'?s=48';
    models.UserModel.create(user, function (error, doc) {
      if(error){
        req.flash('error','用户注册失败');
      }else{
        req.flash('success','用户注册成功');
        res.redirect('/users/login');
      }
    });
  }
});
//登录页面
router.get("/login", auth.checkNotLogin,function (req, res, next) {
  res.render("user/login",{title:"登录"});
});
//登录页面并将登录信息发给服务器端
router.post('/login', auth.checkNotLogin,function (req, res, next) {
  //当发过来的信息与数据库中各项信息吻合，则说明登录成功
  req.body.password = util.md5(req.body.password);
  models.UserModel.findOne({username:req.body.username,password:req.body.password}, function (error, doc) {
    if(error){//出错则重新登录
      req.flash('error','用户登录失败');
      res.redirect('back');
    }else{
      if(doc){//登录成功，跳转到首页
        req.session.user = doc;
        req.flash('success','用户登录成功');
        res.redirect('/');
      }else{//跳转到登录页面
        req.flash('error','用户登录失败');
        res.redirect('back');
      }
    }
  });
});
//退出页面
router.get("/logout", auth.checkLogin,function (req, res, next) {
  //删除登录信息
  req.session.user = null;
  req.flash('success','用户退出成功');
  res.redirect('/');
});
module.exports = router;
