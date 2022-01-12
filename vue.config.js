module.exports = {
    //关闭eslint
    lintOnSave: false,
    devServer: {
        port: 9527,
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        },
        disableHostCheck: true, // 这是由于新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname 不是配置内的，将中断访问。
    },
}