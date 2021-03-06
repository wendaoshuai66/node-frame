"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseurl = _config.default.baseUrl;
  }

  fetchData() {
    return new Promise((reslove, reject) => {
      let fetchRequest = (0, _nodeFetch.default)(this.baseurl + this.url);
      let result = {
        code: 0,
        message: "",
        data: [] // fetchRequest.then(res=>{
        //     res.json()
        // }).then(json=>{
        //     result.data = json;
        //     reslove(result)
        // }).cath(error=>{
        //     result.msg = "node-fetch 请求失败";
        //     reject(result)
        // })

      };
      fetchRequest.then(res => res.json()).then(json => {
        result.code = 1, result.message = 'ok', result.data = json;
        reslove(result);
      }) //对接口的容错
      .catch(error => {
        result.code = 1;
        result.message = '与后端接口异常', reject(result);
      });
    }).catch(error => {
      error;
    });
  }

}

var _default = SafeRequest;
exports.default = _default;