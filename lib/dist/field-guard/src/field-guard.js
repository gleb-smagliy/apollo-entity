'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldGuard = function (_React$PureComponent) {
  _inherits(FieldGuard, _React$PureComponent);

  function FieldGuard() {
    _classCallCheck(this, FieldGuard);

    return _possibleConstructorReturn(this, (FieldGuard.__proto__ || Object.getPrototypeOf(FieldGuard)).apply(this, arguments));
  }

  _createClass(FieldGuard, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          value = _props.value,
          onChange = _props.onChange;


      return children(value, onChange);
    }
  }]);

  return FieldGuard;
}(_react2.default.PureComponent);

FieldGuard.propTypes = {
  children: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.any,
  onChange: _propTypes2.default.func
};
FieldGuard.defaultProps = {
  value: undefined,
  onChange: undefined
};
exports.default = FieldGuard;