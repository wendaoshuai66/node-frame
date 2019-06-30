const Koa = require('koa');
const render = require('koa-swig');
const server = require('koa-static');
const config = require('./config')
const co = require('co');
const app = new Koa();
const errorHandler = require('./middlewares/errorHandler');

const log4js = require('log4js');
log4js.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: './logs/booklog'
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
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: false, // disable, set to false
  ext: 'html',
  writeBody: false
}));

const logger = log4js.getLogger();
errorHandler.error(app, logger);
require('./controllers/index')(app);

app.listen(config.port, () => {
  console.log('this server is running port is' + config.port)
});