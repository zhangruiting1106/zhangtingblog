var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.connect(config.dbUrl);
db.connection.on('error', function (error) {
    console.log(error);
});
db.connection.on('open', function () {
    console.log('ok');
});
var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
var UserModel = db.model('user',UserSchema);

var ArticleSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:String,
    content:String,
    poster:String, //上传图片的字段
    createAt:{type:Date,default:Date.now()}
});
var ArticleModel = db.model('article',ArticleSchema);

module.exports.UserModel = UserModel;
module.exports.ArticleModel = ArticleModel;
