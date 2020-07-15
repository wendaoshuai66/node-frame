# node-frame


1.basic ----- YII 框架

2.koa2-base1-frame ----模仿YII  koa2+Vue构建SSR+CSR项目

3.koa2-base2-frame ----webpack的使用及gulp 对node清洗

3.koa2-base3-frame 服务端路由太过麻烦需要各种引用 删掉controllers下 IndexService.js 删除app.js import Controllers from "./controllers" 将models文件夹改名service 文件indexService.js

控制反转、依赖注入、面向切面

```
constructor({indexService}) {
        //AOP 构造函数 + DI 依赖注入
        this.indexService = indexService;
    }

```

awilix-koa
https://github.com/jeffijoe/awilix-koa

@babel/plugin-proposal-decorators
给gulp配置一下装饰器

修改node服务端渲染controllers中

```
class ListController {
    constructor({ bookListServices }) {
        this.bookListServices = bookListServices;
    }
    @route('/list')
    @GET()
    async actionList(ctx, next) {
        const result = await this.bookListServices.getData()
        const html = await ctx.render('booklist/pages/list', { data: result.data })
        if (ctx.request.header['x-pjax']) {
            ctx.status = 200;
            ctx.type = 'html'
            const $ = cheerio.load(html)
            let _results = "";
            $('.pjax-contant').each(function() {
                // _results += $(this).html()
                ctx.res.write($(this).html())
            })
            $('.lazyload-js').each(function() {
                // _results += `<script src="${$(this).attr('src')}" class="lazyload-js" type="module"></script>`
                ctx.res.write(`<script src="${$(this).attr('src')}" class="lazyload-js" type="module"></script>`)
            })

            ctx.body = _results;
        } else {
            function creatSSRStreamPromise() {
                return new Promise((reslove, reject) => {
                    const htmlStream = new Readable();
                    htmlStream.push(html);
                    htmlStream.push(null);
                    ctx.status = 200;
                    ctx.type = 'html'
                    htmlStream.on("error", err => reject(err)).pipe(ctx.res)
                })
            }
            await creatSSRStreamPromise()
                // ctx.body = html;
        }

    }
}

export default ListController;

```


basket.js https://github.com/addyosmani/basket.js
再将<script src="/scripts/runtime.bundle.js"></script><script src="/scripts/books-add.bundle.js"></script>
存入localstorage点击切换spa页面时，页面几乎不请求数据

使用quicklink避免掉



