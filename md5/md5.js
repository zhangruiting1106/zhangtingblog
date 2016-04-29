var crypto = require('crypto');//用于加密的模块
var md5= crypto.createHash('md5');//用md5算法进行加密
var result = md5.update('1').digest('hex');//hex表示以十六进制表示输出值
console.log(result);