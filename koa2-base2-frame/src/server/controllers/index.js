import router from 'koa-simple-router';
import IndexController from './indexController';
const indexController = new IndexController();

export default (app) => {
    app.use(router(_ => {
        _.get('/', indexController.actionIndex)
        _.get('/index.html', indexController.actionIndex)
        _.get('/booklist', indexController.actionList)
    }))
}