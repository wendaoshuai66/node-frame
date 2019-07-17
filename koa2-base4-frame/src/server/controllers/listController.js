import cheerio from 'cheerio';
import { route, GET } from 'awilix-koa'
import { Readable } from 'stream'
@route('/books')
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
    @route('/add')
    @GET()
    async actionAdd(ctx, next) {
        ctx.body = await ctx.render('booklist/pages/add')
    }
}

export default ListController;