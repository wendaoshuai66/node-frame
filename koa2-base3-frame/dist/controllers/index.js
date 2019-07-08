"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaSimpleRouter = _interopRequireDefault(require("koa-simple-router"));

var _indexController = _interopRequireDefault(require("./indexController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexController = new _indexController.default();

var _default = app => {
  app.use((0, _koaSimpleRouter.default)(_ => {
    _.get('/', indexController.actionIndex);

    _.get('/index.html', indexController.actionIndex);

    _.get('/booklist', indexController.actionList);
  }));
};

exports.default = _default;