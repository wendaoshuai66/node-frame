"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BookList = _interopRequireDefault(require("../models/BookList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndexController {
  constructor() {}

  async actionIndex(ctx, next) {
    ctx.body = await ctx.render('booklist/pages/index');
  }

  async actionList(ctx, next) {
    const booklist = new _BookList.default();
    const result = await booklist.getData();
    ctx.body = await ctx.render('booklist/pages/list', {
      data: result.data
    });
  }

}

var _default = IndexController;
exports.default = _default;