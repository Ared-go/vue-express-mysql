const express = require('express');
const Result = require('../models/Result.js');
const router = express.Router();
// 导出的是对象 所以需要解构
const { querySql } = require('../db/index');
const { login } = require('../service/login');
const { md5 } = require('../utils/index');
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant.js');
// 引入jsonwebtoken
const jwt = require('jsonwebtoken');

// 登录
router.post('/login', (req, res) => {
    console.log(req.body);
    let { name: username, password } = req.body;
    password = md5(`${password}${PWD_SALT}`);
    login(username, password).then(user => {
        if (!user || user.length === 0) {
            new Result(data = "登录失败").fail(res);
        } else {
            const token = jwt.sign({ username },
                PRIVATE_KEY, { expiresIn: JWT_EXPIRED }
            )
            new Result({ token }, '登录成功').success(res)
        }
    })
});
// 获取导航菜单标题
router.get('/list', (req, res) => {
    querySql("select * from list").then((data) => {
        // console.log(res);
        new Result(data, '获取数据成功').success(res)
    });
});

// 获取用户数据
router.get('/get_user', (req, res) => {
    console.log(req.query);
    const { pagesize, page, query } = req.query;
    console.log(pagesize, page, query);
    let start = (page - 1) * pagesize;
    var sql = `select count(*) from userlist; select * from userlist limit ${start},${pagesize}`;
    if (query.trim()) {
        console.log('到这了嘛');
        sql = `select count(*) from userlist where username like '%${query}%'; select * from userlist  where username like '%${query}%'`; //limit ${start},${pagesize}
    }
    querySql(sql).then((data) => {
        console.log(data);
        // 总的数据条数
        let totalNum = data[0][0]['count(*)'];
        // 总的页数
        // 能被整除的情况
        let totalPages = totalNum / pagesize;
        // 不能被整除的情况
        let stringPages = totalPages.toString();
        if (stringPages.indexOf('.') > 0) { // 如果为-1表示未找到 被整除
            totalPages = parseInt(totalNum / pagesize) + 1;
        }
        let userList = data[1];
        new Result({ totalNum, totalPages, page, userList }, '获取数据成功').success(res);
    })
})

// 增加用户
router.post('/add', (req, res) => {
    console.log(req.body);
    const { username, email, mobile } = req.body;
    console.log(username, email, mobile);
    const sql = `insert into userlist (username, email, mobile) values('${username}','${email}','${mobile}')`;
    querySql(sql).then((data) => {
        new Result('添加数据成功').success(res);
    })

})

// 根据用户id查询用户
router.get('/query_user', (req, res) => {
    console.log(req.query);
    const { id } = req.query;
    querySql(`select * from userlist where id = ${id}`).then((data) => {
        new Result(data[0], '添加数据成功').success(res);
    });
})

// 根据用户提供的id 进行修改
router.put('/editeUser', (req, res) => {
    console.log(req.query, req.body);
    const { id } = req.query;
    const { email, mobile } = req.body;
    querySql(`update userlist set email = '${email}' ,mobile = '${mobile}' where id = ${id} `).then(data => {
        new Result('修改数据成功').success(res);
    })
});

// 根据用户id删除用户
router.delete('/deleteUser', (req, res) => {
    // console.log('删除用户');
    const { id } = req.query;
    querySql(`delete from userlist where id = ${id} `).then(data => {
        new Result('删除数据成功').success(res);
    });
})
module.exports = router;