const HtmlWebpackPlugin = require('html-webpack-plugin')

const glop = require('glob');
const ConsoleLogOnBuildWebpackPlugin = require('./config/htmlAfterPlugin')
const argv = require("yargs-parser")(process.argv.slice(2))
const _model = argv.model || "development"
const { join } = require('path');
// const _module = argv.modules || "nomodule"

const _mergeConfig = require(`./config/webpack.${_model}.js`)

// const _mergeModuleConfig = require(`./config/webpack.${_module}.js`)
const merge = require('webpack-merge');

const files = glop.sync('./src/web/views/**/*.entry.js');
let _entry = {};
let _plugins = [];
for (let item of files) {
    // {
    //     index: "./src/web/views/booklist/book-index.entry.js",
    //     list: "./src/web/views/booklist/book-list.entry.js"
    // }
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.+entry\.js$)/g.test(item) == true) {
        let entryKey = RegExp.$1;
        _entry[entryKey] = item
        let [dist, template] = entryKey.split('-')
        _plugins.push(new HtmlWebpackPlugin({ // Also generate a test.html
            filename: `../views/${dist}/pages/${template}.html`,
            template: `./src/web/views/${dist}/pages/${template}.html`,
            inject: false,
            chunks: [entryKey]

        }))
        console.log(RegExp.$1)
    }
}


const webpackConfig = {
    entry: _entry,
    output: {
        publicPath: '/',
        path: join(__dirname, './dist/assets'),
        filename: 'scripts/[name].bundle.js',
    },
    module: {
        rules: [{
            test: /\.?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        ..._plugins,
        new ConsoleLogOnBuildWebpackPlugin()
    ]
}
module.exports = merge(webpackConfig, _mergeConfig);