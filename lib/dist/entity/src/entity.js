'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactApollo = require('react-apollo');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _entityContext = require('../../entity-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = exports.Entity = function (_React$Component) {
  _inherits(Entity, _React$Component);

  function Entity() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Entity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Entity.__proto__ || Object.getPrototypeOf(Entity)).call.apply(_ref, [this].concat(args))), _this), _this.changeField = function (field, value) {
      var _this$props = _this.props,
          query = _this$props.query,
          variables = _this$props.variables,
          name = _this$props.name,
          client = _this$props.client;


      var cacheEntity = client.readQuery({ query: query, variables: variables })[name];

      if ((typeof cacheEntity === 'undefined' ? 'undefined' : _typeof(cacheEntity)) !== 'object') {
        return;
      }

      client.writeQuery({
        query: query,
        variables: variables,
        data: _defineProperty({}, name, _extends({}, cacheEntity, _defineProperty({}, field, value)))
      });
    }, _this.handleQuery = function (renderPropArgs) {
      var data = renderPropArgs.data,
          loading = renderPropArgs.loading,
          error = renderPropArgs.error;
      var _this$props2 = _this.props,
          name = _this$props2.name,
          loadingHandler = _this$props2.loading,
          errorHandler = _this$props2.error,
          children = _this$props2.children;


      if (loading || !data) {
        return loadingHandler(renderPropArgs);
      }

      if (error) {
        return errorHandler(renderPropArgs);
      }

      return _react2.default.createElement(
        _entityContext.Provider,
        { value: { changeField: _this.changeField, entity: data[name] } },
        children
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Entity, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          query = _props.query,
          variables = _props.variables,
          name = _props.name,
          loading = _props.loading,
          error = _props.error,
          children = _props.children,
          queryProps = _objectWithoutProperties(_props, ['query', 'variables', 'name', 'loading', 'error', 'children']);

      return _react2.default.createElement(
        _reactApollo.Query,
        _extends({
          query: query,
          variables: variables
        }, queryProps),
        this.handleQuery
      );
    }
  }]);

  return Entity;
}(_react2.default.Component);

Entity.propTypes = {
  query: _propTypes2.default.object.isRequired,
  variables: _propTypes2.default.object.isRequired,
  name: _propTypes2.default.string.isRequired,
  loading: _propTypes2.default.func.isRequired,
  error: _propTypes2.default.func.isRequired
};
Entity.defaultProps = {
  children: null,
  loading: function loading() {
    return null;
  },
  error: function error() {
    return null;
  }
};
exports.default = (0, _reactApollo.withApollo)(Entity);