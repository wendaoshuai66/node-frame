const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

const hackCode = `
(function() {
    var check = document.createElement('script')
    if (!('nomodule' in check) && 'onbeforeload' in check) {
        var support = false;
        document.addEventListener('beforeload', function(e) {
            if (e.target == check) {
                support = true;
            } else if (!e.target.hasAttribute('nomodule') || !support) {
                return
            }
            e.preventDefault()
        }, true)
    }
    check.type = 'module'
    check.src = ''
    document.head.append(check)
    check.remove()
})()
`

let assetsHelp = (data) => {
    let js = [];
    let css = [];
    let dir = {
        js: item => `<script src="${item}" type="module"></script>`,
        css: item => `<link rel="stylesheet" href="${item}">`
    }
    for (let jsitem of data.js) {
        js.push(dir.js(jsitem))
    }
    for (let cssitem of data.css) {
        css.push(dir.js(cssitem))
    }
    return {
        js,
        css
    }
}


class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            // compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(pluginName, (webpackPluginData, cb) => {
            //     webpackPluginData.body.forEach(tag => {
            //         if (tag.tagName == 'script') {
            //             if (/.bundle./.test(tag.attributes.src)) {
            //                 delete tag.attributes.type
            //                 tag.attributes.nomodule = ""
            //             } else {
            //                 tag.attributes.type = "module"
            //             }
            //         }
            //     });
            //     if (this.isHack) {
            //         webpackPluginData.body.push({
            //             tagName: "script",
            //             closeTag: true,
            //             innerHTML: hackCode
            //         })
            //     }

            //     cb(null, webpackPluginData)
            // })

            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, (webpackPluginData) => {
                console.log('🍎🍎🍎🍎🍎', webpackPluginData.assets)
                let _html = webpackPluginData.html;
                let result = assetsHelp(webpackPluginData.assets)
                _html = _html.replace(/@components/g, '../../../components');
                _html = _html.replace('<!--injectjs-->', result.js.join(''));
                _html = _html.replace('<!--injectcss-->', result.css.join(''));
                webpackPluginData.html = _html;
            })
        });

    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin;