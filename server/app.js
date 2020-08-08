// 引入express
const express = require('express');
// 创建web服务器
const app = express();
const bodyParser = require('body-parser');
// 引入path路径模块
const path = require('path');
// 开放静态资源文件 获取的是绝对路径
app.use(express.static(path.join(__dirname, 'public')));
// 处理post请求参数  extended是必填参数 // 拦截所有请求 对post请求参数进行解析
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const user = require('./router/user');
const right = require('./router/right');
const data = require('./router/data');

// 匹配路由
app.use('/user', user);
app.use('/right', right);
app.use('/data', data);

app.listen(3000, () => {
    console.log('连接成功');
});