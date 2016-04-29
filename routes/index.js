var express = require('express');
var models = require('../models');
var markdown = require('markdown').markdown;
//调用Router方法生成一个路由实例
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //实现文章标题和内容的搜索,要把搜索的关键字保留下来，每个页面中都能看到，利用session和中间件进行模板中keyword的渲染
  var keyword = req.query.keyword;
  var search = req.query.search;
  var pageNum = parseInt(req.query.pageNum)||1;//当前页码
  var pageSize = parseInt(req.query.pageSize)||2;//一页有多少条数据
  var queryObj = {};
  if(search){//用来区分用户是搜索提交的操作，还是页面刷新的操作
    //提交过来的，说明有新的搜索关键字了，要覆盖原来session里的
    req.session.keyword = keyword;
  }
    //不是提交过来的，直接用session里的关键字就行
    //keyword = req.session.keyword;
    var reg = new RegExp(keyword,'ig');
    queryObj = {$or:[{title:reg},{content:reg}]};
  //在首页显示文章列表
  //找到所有文章，把user字符串转成对象
  models.ArticleModel.find(queryObj).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function (error, articles) {
    articles.forEach(function (article) {
      article.content = markdown.toHTML(article.content);
    });
    //获取到一共多少条数据
    models.ArticleModel.count(queryObj, function (error, count) {
       //可以提取出来，写在中间件里
      //var user = req.session.user;
      res.render('index', {
        title: '首页',
        articles:articles,
        pageNum:pageNum,
        pageSize:pageSize,
        totalPage:Math.ceil(count/pageSize),
        keyword:keyword
        /*,user:user*/
      });
    });
  });
});

module.exports = router;
