import { route, GET } from 'awilix-koa'
@route('/')
class IndexController {
    constructor({ bookListServices }) {
        this.bookListServices = bookListServices;
    }
    @route('/')
    @GET()
    async actionIndex(ctx, next) {
        ctx.body = await ctx.render('booklist/pages/index')
    }
}

export default IndexController;