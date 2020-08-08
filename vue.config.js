module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: "http://localhost:3000", // 要访问的接口域名
                // ws: true, // 是否启动websockets 如果要代理websockets,配置这个参数
                secure: false, // 如果是https接口,需要配置这个参数
                changeOrigin: true, // 开启代理，在本地会创建一个虚拟服务端,然后发送请求的数据,
                pathRewrite: {
                    '^/api': '' // 把/api替换为空 
                }
            }

        }
    }
}