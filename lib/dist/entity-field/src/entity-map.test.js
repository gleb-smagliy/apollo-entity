'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _entityField = require('./entity-field');

var _entityField2 = _interopRequireDefault(_entityField);

var _entityContext = require('../../entity-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var entity = {
  type: 'cat'
};

var fakeProps = {
  name: 'type'
};

var wrapper = function wrapper() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _enzyme.shallow)(_react2.default.createElement(_entityField2.default, _extends({}, fakeProps, overrides)));
};

afterEach(function () {
  return jest.restoreAllMocks();
});

test('EntityField\'s default allow should always return true', function () {
  expect(_entityField2.default.defaultProps.allow(123)).toEqual(true);
});

test('EntityField should be entity-context consumer', function () {
  var entityField = wrapper();

  expect(entityField.type()).toEqual(_entityContext.Consumer);
});

test('EntityField should pass consumeContext method as a render prop to context', function () {
  var entityField = wrapper();

  expect(entityField.props().children).toEqual(entityField.instance().consumeContext);
});

test('changeValue should call changeField with field name when allowance check passes', function () {
  var allow = function allow() {
    return true;
  };
  var name = 'test_name';
  var value = 'test_value';
  var changeField = jest.fn();
  var changeValue = wrapper({ name: name, allow: allow }).instance().changeValue(changeField);

  changeValue(value);

  expect(changeField).toBeCalledWith(name, value);
});

test('changeValue should not call changeField when allowance check doest not pass', function () {
  var allow = function allow() {
    return false;
  };
  var name = 'test_name';
  var value = 'test_value';
  var changeField = jest.fn();
  var changeValue = wrapper({ name: name, allow: allow }).instance().changeValue(changeField);

  changeValue(value);

  expect(changeField).not.toBeCalled();
});

test('consumeContext should pass entity\'s field to children', function () {
  var children = jest.fn();
  var entity = { field: 'value' };
  var changeField = 123;
  var instance = wrapper({ children: children, name: 'field' }).instance();

  var changeValue = jest.spyOn(instance, 'changeValue').mockImplementation(function () {
    return '123';
  });
  instance.consumeContext({ entity: entity, changeField: changeField });

  expect(children).toBeCalledWith(entity.field, '123');
  expect(changeValue).toBeCalledWith(changeField);
});