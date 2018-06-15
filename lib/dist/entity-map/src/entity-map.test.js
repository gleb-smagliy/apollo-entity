'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _entityMap = require('./entity-map');

var _entityMap2 = _interopRequireDefault(_entityMap);

var _entityContext = require('../../entity-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapper = function wrapper() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _enzyme.shallow)(_react2.default.createElement(_entityMap2.default, overrides));
};

test('EntityMap should be entity-context consumer', function () {
  var entity = wrapper();

  expect(entity.type()).toEqual(_entityContext.Consumer);
});

test('EntityMap should render null by default', function () {
  expect(wrapper().props().children({ entity: 123 })).toEqual(null);
});

test('EntityMap\'s default map should pass data unchanged', function () {
  var input = {};

  expect(_entityMap2.default.defaultProps.map(input)).toEqual(input);
});

test('EntityMap should call passed children with mapped by default data', function () {
  var children = jest.fn();
  var entity = 123;

  wrapper({ children: children }).props().children({ entity: entity });

  expect(children.mock.calls[0][0]).toEqual(entity);
});

test('EntityMap should call passed children with customly mapped data', function () {
  var children = jest.fn();
  var entity = { key: 'value' };
  var map = function map(e) {
    return e.key;
  };

  wrapper({ children: children, map: map }).props().children({ entity: entity });

  expect(children.mock.calls[0][0]).toEqual(entity.key);
});