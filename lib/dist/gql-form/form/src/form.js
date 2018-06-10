'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactApollo = require('react-apollo');

var _nodeNoop = require('node-noop');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pass = function pass(e) {
  return e;
};

var _React$createContext = _react2.default.createContext({ onFieldChange: _nodeNoop.noop, entity: null }),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

var FormField = function FormField(_ref) {
  var children = _ref.children,
      field = _ref.field;
  return _react2.default.createElement(
    Consumer,
    null,
    function (_ref2) {
      var onFieldChange = _ref2.onFieldChange,
          entity = _ref2.entity;
      return children(entity[field], function (event) {
        return onFieldChange(field, event.target.value);
      });
    }
  );
};

var FormMap = function FormMap(_ref3) {
  var children = _ref3.children,
      mapper = _ref3.mapper;
  return _react2.default.createElement(
    Consumer,
    null,
    function (_ref4) {
      var entity = _ref4.entity;
      return children((mapper || pass)(entity));
    }
  );
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _ref5;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref5 = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref5, [this].concat(args))), _this), _this.onFieldChange = function (field, value) {
      console.log('onFieldChange:', _defineProperty({}, field, value));

      var _this$props = _this.props,
          query = _this$props.query,
          variables = _this$props.variables,
          entity = _this$props.field,
          client = _this$props.client;


      var cacheEntity = client.readQuery({ query: query, variables: variables })[entity];

      client.writeQuery({
        query: query,
        variables: variables,
        data: _defineProperty({}, entity, _extends({}, cacheEntity, _defineProperty({}, field, value)))
      });
    }, _this.contextProvider = function (_ref6) {
      var data = _ref6.data;
      var _this$props2 = _this.props,
          field = _this$props2.field,
          loading = _this$props2.loading,
          error = _this$props2.error,
          children = _this$props2.children;


      if (data.loading) {
        return loading();
      }

      if (data.error) {
        return _this.props.error(error);
      }

      return _react2.default.createElement(
        Provider,
        { value: { onFieldChange: _this.onFieldChange, entity: data[field] } },
        children
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          query = _props.query,
          variables = _props.variables,
          field = _props.field,
          loading = _props.loading,
          error = _props.error;


      return _react2.default.createElement(
        _reactApollo.Query,
        { query: query, variables: variables },
        this.contextProvider
      );
    }
  }]);

  return Form;
}(_react2.default.Component);

var FormWithApollo = (0, _reactApollo.withApollo)(Form);

FormWithApollo.Field = FormField;
FormWithApollo.Map = FormMap;

exports.default = FormWithApollo;