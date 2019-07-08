"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = {
  "viewDir": _path.default.join(__dirname, '..', 'views'),
  "stcticDir": _path.default.join(__dirname, '..', 'assets')
};

if (process.env.NODE_ENV == 'development') {
  const localConfig = {
    "baseUrl": "http://localhost:80/phpyii/basic/web/index.php?r=",
    "port": 8081
  };

  _lodash.default.extend(config, localConfig);
}

if (process.env.NODE_ENV == 'production') {
  const proConfig = {
    "port": 8088
  };

  _lodash.default.extend(config, proConfig);
}

var _default = config;
exports.default = _default;