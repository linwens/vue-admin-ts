
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vue/' : '/',
    devServer: {
        port: 8089, // 端口
        proxy:'http://localhost:3000/' // 代理
    }
}