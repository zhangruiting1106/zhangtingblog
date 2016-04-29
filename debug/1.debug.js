// debug是日志记录器，用于向控制台输出日志
var debug = require('debug');
//SET DEBUG=zhangtingblog:* 这里已经设置了环境变量中DEBUG的值为zhangtingblog:*,也就是以下两行代码匹配设置的内容，所以会输出以下两行代码的日志
var server_debug = debug('zhangtingblog:server');
var client_debug = debug('zhangtingblog:client');
server_debug("server");//执行后，在命令行输出server相关日志
client_debug("client");//执行后，在命令行输出client相关日志


