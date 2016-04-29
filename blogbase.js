//1.打开cmd --> npm install -g express-generator,安装express命令行工具，使用它初始化一个express项目
//2.生成项目，-e表示ejs模板   express -e zhangtingblog
//3.进入项目并安装依赖   cd zhangtingblog && npm install
//4.设置环境变量并启动服务器   SET DEBUG=zhangtingblog:* & npm start
//5.访问localhost:3000，看是否启动成功
//6.在文件夹中新建.gitignore文件，忽略node_modules .idea lib
//7.将建好的文件初始化为本地仓库  git init
//8.将仓库放到历史区  git add -A  git commit -m"初始化博客仓库"
//9.在gitHub上创建远程空仓库
//10.将本地仓库推送到远程仓库
    // git remote add origin https://github.com/zhangruiting1106/zhangtingblog.git
    // git push -u origin master
//11.安装bower  npm install -g bower ，是前端的包管理器
//12.安装某个包  bower install bootstrap
//13.默认安装的包在bower_components文件夹中，可以新建一个.bowerrc文件，写入
    // {"directory":"./public/lib"}，改变默认安装位置
//14.项目文件介绍
    // bin/www 入口文件，就是执行npm start时实际执行的文件，启动服务时就是启动该文件
    // app.js  express的主配置文件
//15.进行页面分析，做好路由（都放在router文件夹里），模板（都放在views文件夹里），把公用的html部分单独写在另外的模板文件中(include文件夹，里面有header,footer两个模板文件)，需要动态变化的部分单独写在模板文件中，每个模板做一件事情，不要写在一起(用户相关的写在user文件夹里，文章相关的写在article文件夹里)
//16.把数据库放在models文件夹里，建立index.js文件，所有对数据库的操作都在这里进行，要用mongoose,mongodb,要注意把mongoose安装在本地，npm install mongoose --save，这样就会保存在package.json中了，还要启动mongodb,在mongodb的安装目录bin下新建data文件夹，cmd中执行mongod dbpath=./data,成功后监听27017端口,打开mongodb客户端，还是在启动服务的那个目录下cmd,执行mongo，进入后可以进行数据库内容的增删改查，注意操作时，如果是user的集合，要用users复数来查看
//17.md5算法的使用：引入crypto模块，是node中用来加密的模块,进行密码的加密
//18.会话支持模块：npm install express-session --save, npm install connect-mongo --save,这两个模块用于实现把会话信息保存到数据库,安装并引入两个模块
// var session = require("express-session");
// var MongoStore = require('connect-mongo')(session);
 /* 在使用中间件时，要指定session的存放位置，用store来实现
 app.use(session({
 secret:'zfpx',
    resave:true,
    saveUninitialized:true,
    //指定session的存放位置
    store:new MongoStore({
    url:config.dbUrl //数据库的地址
})
}));
*/
//在数据库中查看session时，db.sessions.find()，查看所有集合时，show collections
//19.在项目中的公用逻辑，可以写在中间件里
//20.利用flash去实现消息在不同的请求中可以显示，通常结合重定向使用,调用一次后会立刻被清除。npm install connect-flash --save
//21.注意每个中间件的使用是有顺序的，如果一个中间件要依赖另一个中间件，则要放在它后面
//22.有些页面的访问需要先登录，所以要进行权限控制，用中间件的方式去做，在middleware文件夹中的auth.js里分别写出登录前和登录后才有权限访问的业务逻辑,配合在路由中加载使用
//23.头像的制作：在cn.gravatar.com网站（全球通用头像）
//24.让博客中的文章支持markdown, npm instarll markdown --save,文章发表后，在相应路由中进行操作
//25.向服务器上传图片时，表单的enctype:multipart/form-data，且input type="file",后台接收请求体时，要用中间件multer,npm install multer --save,安装后引入，用multer.diskStorage({})方法指定文件保存目录和文件名，一般放在public/uploads里,最后还要把图片的路径保存到服务器端数据库里
//26.查看文件是否保存在数据库了，用mongoVUE
//27.做分页功能，要知道访问的参数：当前页码，每页条数，在模板中要知道的参数：一共的页数，当前页码，每页条数，当前页的数据，然后用.skip().limit()









