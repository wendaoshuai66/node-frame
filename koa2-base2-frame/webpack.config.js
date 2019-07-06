const HtmlWebpackPlugin = require('html-webpack-plugin')
const ConsoleLogOnBuildWebpackPlugin = require('./config/htmlAfterPlugin')
const argv = require("yargs-parser")(process.argv.slice(2))
const _model = argv.model || "development"

const _module = argv.modules || "nomodule"

const _mergeConfig = require(`./config/webpack.${_model}.js`)

const _mergeModuleConfig = require(`./config/webpack.${_module}.js`)
const merge = require('webpack-merge');
const webpackConfig = {
    plugins: [
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: 'index.html',
            template: _module == "nomodule" ? 'src/index.html' : 'dist/index.html'

        }),
        new ConsoleLogOnBuildWebpackPlugin({
            isHack: true
        })
    ]
}
module.exports = merge(webpackConfig, _mergeConfig, _mergeModuleConfig);