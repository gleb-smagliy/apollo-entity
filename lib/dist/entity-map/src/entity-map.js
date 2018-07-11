'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fieldGuard = require('../../field-guard');

var _fieldGuard2 = _interopRequireDefault(_fieldGuard);

var _entityContext = require('../../entity-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntityMap = function EntityMap(_ref) {
  var map = _ref.map,
      children = _ref.children;
  return _react2.default.createElement(
    _entityContext.Consumer,
    null,
    function (_ref2) {
      var entity = _ref2.entity;
      return _react2.default.createElement(
        _fieldGuard2.default,
        { value: map(entity) },
        children
      );
    }
  );
};

EntityMap.propTypes = {
  children: _propTypes2.default.func,
  map: _propTypes2.default.func
};

EntityMap.defaultProps = {
  children: function children() {
    return null;
  },
  map: function map(data) {
    return data;
  }
};

exports.default = EntityMap;