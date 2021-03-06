import BookList from '../models/BookList';
class IndexController {
    constructor() {

    }
    async actionIndex(ctx, next) {
        ctx.body = await ctx.render('booklist/index')
    }
    async actionList(ctx, next) {
        const booklist = new BookList();
        const result = await booklist.getData();
        ctx.body = await ctx.render('booklist/list', { data: result.data })
    }
}

export default IndexController;