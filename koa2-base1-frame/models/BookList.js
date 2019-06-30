/** 
 * @fileoverview 实现Booklist数据模型
 * @author  liushuai
*/

const SafeRequest = require('../utils/SafeRequest');
class BookList{
    /** 
     * booklist类 获取后台有关图书管理相关数据类
     * 
    */
   /**
    * @constructor
    * @param {object} app KOA执行上下文
    */
    constructor(app){
        this.app = app;
    }
    /**
     * 获取后台图书列表
     * @param {*} options 
     * @example
     * return new Promise
     * getData(options);
     */
    getData(){
        const safeRequest=new SafeRequest('booklist%2Findex');
        return safeRequest.fetchData();
    }
}
module.exports = BookList;