'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.Provider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$createContext = _react2.default.createContext({ changeField: function changeField() {
    return undefined;
  }, entity: null }),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

exports.Provider = Provider;
exports.Consumer = Consumer;