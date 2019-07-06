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

class ConsoleLogOnBuildWebpackPlugin {
    constructor({
        isHack
    } = option) {
        this.isHack = isHack;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(pluginName, (webpackPluginData, cb) => {
                webpackPluginData.body.forEach(tag => {
                    if (tag.tagName == 'script') {
                        if (/.bundle./.test(tag.attributes.src)) {
                            delete tag.attributes.type
                            tag.attributes.nomodule = ""
                        } else {
                            tag.attributes.type = "module"
                        }
                    }
                });
                if (this.isHack) {
                    webpackPluginData.body.push({
                        tagName: "script",
                        closeTag: true,
                        innerHTML: hackCode
                    })
                }

                cb(null, webpackPluginData)
            })

            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, (webpackPluginData) => {
                webpackPluginData.html = webpackPluginData.html.replace(/\snomodule=""/g, " nomodule")
            })
        });

    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin;