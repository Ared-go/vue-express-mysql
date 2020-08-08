module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 0,
    debug: true,
    // 盐池 密钥  和密码混合后进行加密
    PWD_SALT: 'admin_ared',
    // jwt私钥
    PRIVATE_KEY: 'admin_ared_token',
    // jwt过期时间 token 失效时间 单位是s
    JWT_EXPIRED: 60 * 60
}