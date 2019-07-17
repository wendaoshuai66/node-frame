import Koa from 'koa';
import render from 'koa-swig';
import server from 'koa-static';
import config from './config';
import { wrap } from 'co';
const app = new Koa();
import errorHandler from './middlewares/errorHandler';
import { createContainer, Lifetime } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa'
//必须把service 融入到容器中

const container = createContainer()
    // The `TodosService` lives in services/TodosService
container.loadModules(['services/*.js'], {
    // we want `TodosService` to be registered as `todosService`.
    formatName: 'camelCase',
    resolverOptions: {
        // We want instances to be scoped to the Koa request.
        // We need to set that up.
        lifetime: Lifetime.SCOPED
    }
})

//终极注入
app.use(scopePerRequest(container))
import { configure, getLogger } from 'log4js';
configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'logs/booklog'
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
app.use(loadControllers(__dirname + '/controllers/*.js'))
app.listen(config.port, () => {
    console.log('this server is running port is' + config.port)
});


process.on("uncaughtException", function(err) {
    // g.notifyError(a, {
    //     type: "uncaughtError"
    // }, function() {
    //     process.exit(1)
    // })
    logger.error(err)
})
process.on("unhandledRejection", function() {
    // g.notifyError(a, {
    //     type: "uncaughtError"
    // })
    logger.error(info.reason)
});

app.on("error", function(err) {
    logger.error(err)
})