import Koa from 'koa';
import render from 'koa-swig';
import server from 'koa-static';
import config from './config';
import { wrap } from 'co';
const app = new Koa();
import errorHandler from './middlewares/errorHandler';

import controllerInit from './controllers/index'

import { configure, getLogger } from 'log4js';
configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: __dirname + './logs/booklog'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
});

app.use(server(config.stcticDir))
app.context.render = wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: false, // disable, set to false
    ext: 'html',
    writeBody: false
}));

const logger = getLogger();
errorHandler.error(app, logger);
controllerInit(app);

app.listen(config.port, () => {
    console.log('this server is running port is' + config.port)
});