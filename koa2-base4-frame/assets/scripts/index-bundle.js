System.register([], function (_export, _context) {
  "use strict";

  var Test;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [],
    execute: function () {
      Test =
      /*#__PURE__*/
      function () {
        function Test() {
          _classCallCheck(this, Test);

          this.name = 'zhangsan';
        }

        _createClass(Test, [{
          key: "action",
          value: function action() {
            console.log(this.name);
          }
        }]);

        return Test;
      }();

      _export("default", Test);
    }
  };
});
