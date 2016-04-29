var express = require('express');
var path = require('path');
//处理收藏夹图标
var favicon = require('serve-favicon');
//写日志的
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
//引入该模块，session就可以放在数据库里了
var MongoStore = require('connect-mongo')(session);
var config = require('./config');
var flash = require('connect-flash');
//路由的使用，根据页面功能需要去设置，把针对同一类对象的操作放在一个路由实例中
//主页路由
var routes = require('./routes/index');
//用户路由
var users = require('./routes/users');
//文章路由
var articles = require('./routes/articles');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//ejs模板默认的是.ejs文件，由于平时更喜欢用.html文件操作，则需修改一下代码，新增两行代码如下
app.set('view engine', 'html');
//指定html模板的渲染方法
app.engine('html',require('ejs').__express);
//app.set('view engine', 'ejs');

//将favicon.ico图标放在public下（利用在线制作工具制作图标）
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//处理content-type:json的请求体
app.use(bodyParser.json());
//处理content-type:urlencoded的请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'zfpx',
  resave:true,
  saveUninitialized:true,
  //指定session的存放位置
  store:new MongoStore({
    url:config.dbUrl
  })
}));
app.use(flash());
app.use(function (req, res, next) {
  //res.locals是模板渲染的那个对象,如{title:"首页"}
  res.locals.user = req.session.user;//在这个对象上新增一个user属性并把session的user给它
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  res.locals.keyword = req.session.keyword;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
//中间件使用时，看访问的url路径，如果匹配到/,就走该路由，进入到routes中
app.use('/', routes);
//中间件使用时，看访问的url路径，如果匹配到/users,就走该路由，进入到users中
app.use('/users', users);
//中间件使用时，看访问的url路径，如果匹配到/articles,就走该路由，进入到articles中
app.use('/articles', articles);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  //错误处理中间件，当前面有中间件出错时，会跳过所有中间件，直接到这个错误处理中间件里来
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// 栈：先进后出；队列：先进先出
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
