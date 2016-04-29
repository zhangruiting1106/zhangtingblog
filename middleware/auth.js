//只有登录后才能访问
module.exports.checkLogin = function (req, res, next) {
  if(req.session.user){
      next();
  }else{
      req.flash('error','登录后才可以访问');
      res.redirect('/users/login');
  }
};
//登录前可以访问
module.exports.checkNotLogin = function (req, res, next) {
    if(req.session.user){
        req.flash('error','登录前才可以访问');
        res.redirect('/');
    }else{
        next();
    }
}