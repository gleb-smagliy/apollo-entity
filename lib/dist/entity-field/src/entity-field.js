'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fieldGuard = require('../../field-guard');

var _fieldGuard2 = _interopRequireDefault(_fieldGuard);

var _entityContext = require('../../entity-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityField = function (_React$Component) {
  _inherits(EntityField, _React$Component);

  function EntityField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EntityField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EntityField.__proto__ || Object.getPrototypeOf(EntityField)).call.apply(_ref, [this].concat(args))), _this), _this.changeValue = function (changeField) {
      return function (value) {
        if (!_this.props.allow(value)) {
          return;
        }

        changeField(_this.props.name, value);
      };
    }, _this.consumeContext = function (_ref2) {
      var entity = _ref2.entity,
          changeField = _ref2.changeField;

      var value = entity[_this.props.name] || _this.props.defaultValue;

      return _react2.default.createElement(
        _fieldGuard2.default,
        { value: value, onChange: _this.changeValue(changeField) },
        _this.props.children
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EntityField, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _entityContext.Consumer,
        null,
        this.consumeContext
      );
    }
  }]);

  return EntityField;
}(_react2.default.Component);

EntityField.propTypes = {
  allow: _propTypes2.default.func,
  children: _propTypes2.default.func.isRequired,
  name: _propTypes2.default.string.isRequired,
  defaultValue: _propTypes2.default.any
};
EntityField.defaultProps = {
  allow: function allow() {
    return true;
  },
  defaultValue: undefined
};
exports.default = EntityField;