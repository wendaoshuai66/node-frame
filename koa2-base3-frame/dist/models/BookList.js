"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SafeRequest = _interopRequireDefault(require("../utils/SafeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * @fileoverview 实现Booklist数据模型
 * @author  liushuai
 */
class BookList {
  /** 
   * booklist类 获取后台有关图书管理相关数据类
   * 
   */

  /**
   * @constructor
   * @param {object} app KOA执行上下文
   */
  constructor(app) {
    this.app = app;
  }
  /**
   * 获取后台图书列表
   * @param {*} options 
   * @example
   * return new Promise
   * getData(options);
   */


  getData() {
    const safeRequest = new _SafeRequest.default('booklist%2Findex');
    return safeRequest.fetchData();
  }

}

var _default = BookList;
exports.default = _default;