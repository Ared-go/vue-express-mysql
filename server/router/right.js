const express = require('express');
const Result = require('../models/Result.js');
const router = express.Router();
// 引入sql方法
const { querySql } = require('../db/index');

router.get('/getRights', (req, res) => {
    // console.log('获取权限');
    querySql('select * from rightList').then(data => {
        // console.log(data);
        new Result(data, '获取数据成功').success(res)
    })
})

router.get('/divRights', (req, res) => {
    console.log('这是权限分配');
    querySql('select * from roles left join goodslist on roles.children = goodslist.id').then(data => {
        new Result(data, '获取数据成功').success(res)
    })
})

module.exports = router;