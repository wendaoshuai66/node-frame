const path = require('path')

//对错误美化的包，更好的处理错误
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

//提示错误更好一些
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

//对item标题设置
const setTitle = require('node-bash-title');
setTitle('🍻  开发环境运行');
//copy
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        hot: true,
        port: 9000,
        quiet: true,
    },
    plugins: [
        new CopyPlugin([
            { from: path.join(__dirname, '../', 'src/web/views/layouts/layouts.html'), to: '../views/layouts/layouts.html' },
        ]),
        new CopyPlugin([
            { from: path.join(__dirname, '../', 'src/web/components'), to: '../components' },
        ], { ignore: ['*.js', '*.css'] }),
        new WebpackBuildNotifierPlugin({
            title: "My Project Webpack Build",
            // logo: path.resolve("./img/favicon.png"),
            suppressSuccess: true
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:3000'],
                notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            onErrors: function(severity, errors) {
                // You can listen to errors transformed and prioritized by the plugin
                // severity can be 'error' or 'warning'
            }
        }),
    ],
}