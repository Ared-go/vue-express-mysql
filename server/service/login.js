const { querySql } = require("../db/index");

function login(username, password) {
    // 数据库的设计是字符串
    const sql = `select * from userinfo where username = '${username}' and password = '${password}'`;
    return querySql(sql);
}

module.exports = {
    login
}