const mysql = require('mysql');

const config = require('./config');
// const con = mysql.createConnection(config);
// const { debug } = require('../utils/constant');
// 创建连接池
const pool = mysql.createPool(config);

function querySql(sql) {
    return new Promise((resolve, reject) => {
        // 获取连接
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('连接失败');
                reject(err);
                return;
            }
            // 事件驱动回调
            conn.query(sql, (err, res) => {
                if (err) {
                    console.log('查询数据库失败');
                    reject(err);
                }
                resolve(res);
            });
            // 释放连接
            conn.release();
        })
    })

    // return new Promise((resolve, reject) => {
    //     try {
    //         con.connect();
    //         con.query(sql, (err, result) => {
    //             if (err) {
    //                 debug && console.log('查询失败' + JSON.stringify(err));
    //                 reject(err);
    //             }
    //             debug && console.log('查询成功' + JSON.stringify(result));
    //             resolve(result)
    //         })
    //     } catch (e) {
    //         reject(e);
    //     } finally {
    //         // 关闭连接   end()方法会在回调完成后关闭连接
    //         con.end(() => {
    //             console.log('关闭成功')
    //         });
    //     }
    // })
}

module.exports = {
    querySql
}