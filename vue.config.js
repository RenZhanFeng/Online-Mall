const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // 解决跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.113.249:8081/cms',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    
    // 配置快速访问路径
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("views", resolve("src/views"))
            .set("base", resolve("baseConfig"))
            .set("public", resolve("public"));
    },
}
