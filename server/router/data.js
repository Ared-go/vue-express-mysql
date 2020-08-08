const express = require('express');
const Result = require('../models/Result.js');
const router = express.Router();
// 引入sql方法
const { querySql } = require('../db/index');





// 导出商品路由
module.exports = router;