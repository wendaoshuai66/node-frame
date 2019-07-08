"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _config = _interopRequireDefault(require("./config"));

var _co = require("co");

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _index = _interopRequireDefault(require("./controllers/index"));

var _log4js = require("log4js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default();
(0, _log4js.configure)({
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
app.use((0, _koaStatic.default)(_config.default.stcticDir));
app.context.render = (0, _co.wrap)((0, _koaSwig.default)({
  root: _config.default.viewDir,
  autoescape: true,
  cache: false,
  // disable, set to false
  ext: 'html',
  writeBody: false
}));
const logger = (0, _log4js.getLogger)();

_errorHandler.default.error(app, logger);

(0, _index.default)(app);
app.listen(_config.default.port, () => {
  console.log('this server is running port is' + _config.default.port);
});