const crypto = require('crypto');
// const hash = crypto.createHash('md5');
// // 可任意多次调用update():
// hash.update('Hello, world!');
// hash.update('Hello, nodejs!');
// console.log(hash.digest('hex'));
function md5(s) {
    // 注意参数需要为 String类型  否则会报错
    return crypto.createHash('md5').update(String(s)).digest('hex');
}
module.exports = {
    md5
}