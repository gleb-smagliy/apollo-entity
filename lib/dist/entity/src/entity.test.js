'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reactApollo = require('react-apollo');

var _entityContext = require('../../entity-context');

var _entity = require('./entity');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeProps = {
  query: {},
  client: {},
  variables: { id: 1 },
  name: 'someEntity'
};

var data = {
  entity: {
    oldField: 'old_field_value',
    field: 123
  }
};

var createClient = function createClient() {
  var readResult = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data;
  return {
    readQuery: jest.fn(function () {
      return readResult;
    }),
    writeQuery: jest.fn()
  };
};

var wrapper = function wrapper() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _enzyme.shallow)(_react2.default.createElement(_entity.Entity, _extends({}, fakeProps, overrides)));
};

afterEach(function () {
  return jest.restoreAllMocks();
});

test('Entity\'s default loading should return null', function () {
  expect(_entity.Entity.defaultProps.loading()).toEqual(null);
});

test('Entity\'s default error should return null', function () {
  expect(_entity.Entity.defaultProps.error()).toEqual(null);
});

test('Entity should be query with right props', function () {
  var fetchPolicy = 'cache-only';
  var entityComponent = wrapper({ fetchPolicy: fetchPolicy });
  expect(entityComponent.type()).toEqual(_reactApollo.Query);
  expect(entityComponent.props().query).toEqual(fakeProps.query);
  expect(entityComponent.props().variables).toEqual(fakeProps.variables);
  expect(entityComponent.props().fetchPolicy).toEqual(fetchPolicy);
});

test('Entity should pass handleQuery as a render props to query', function () {
  var fetchPolicy = 'cache-only';
  var entityComponent = wrapper({ fetchPolicy: fetchPolicy });

  expect(entityComponent.props().children).toEqual(entityComponent.instance().handleQuery);
});

test('handleQuery should return loader when loading', function () {
  var loader = _react2.default.createElement(
    'div',
    null,
    '123'
  );
  var loading = function loading() {
    return loader;
  };

  expect(wrapper({ loading: loading }).instance().handleQuery({ loading: true })).toEqual(loader);
});

test('handleQuery should return loader when no data presented', function () {
  var loader = _react2.default.createElement(
    'div',
    null,
    '123'
  );
  var loading = function loading() {
    return loader;
  };

  expect(wrapper({ loading: loading }).instance().handleQuery({ loading: false })).toEqual(loader);
});

test('handleQuery should return error when error occured', function () {
  var errorDiv = _react2.default.createElement(
    'div',
    null,
    '123'
  );
  var error = function error() {
    return errorDiv;
  };

  expect(wrapper({ error: error }).instance().handleQuery({ error: {}, loading: false })).toEqual(errorDiv);
});

test('handleQuery should return context Provider with children if everything is fine', function () {
  var children = _react2.default.createElement(
    'div',
    null,
    '123'
  );
  var name = 'entity';
  var instance = wrapper({ children: children, name: name }).instance();

  var provider = instance.handleQuery({ error: null, loading: false, data: data });

  expect(provider.type).toEqual(_entityContext.Provider);
  expect(provider.props.value).toEqual({ changeField: instance.changeField, entity: data[name] });
  expect(provider.props.children).toEqual(children);
});

test('changeField should return context Provider with children if everything is fine', function () {
  var name = 'entity';
  var field = 'field';
  var value = 'new_value';

  var client = createClient();

  var instance = wrapper({ name: name, client: client }).instance();

  instance.changeField(field, value);

  expect(client.readQuery).toBeCalledWith({ query: fakeProps.query, variables: fakeProps.variables });
});

test('changeField should return context Provider with children if everything is fine', function () {
  var name = 'entity';
  var field = 'field';
  var value = 'new_value';

  var client = createClient();

  var instance = wrapper({ name: name, client: client }).instance();

  instance.changeField(field, value);

  var writeData = {
    entity: {
      oldField: 'old_field_value',
      field: value
    }
  };

  expect(client.writeQuery).toBeCalledWith({ query: fakeProps.query, variables: fakeProps.variables, data: writeData });
});

test('changeField should return context Provider with children if everything is fine', function () {
  var name = 'entity';
  var field = 'field';
  var value = 'new_value';

  var client = createClient(123);

  var instance = wrapper({ name: name, client: client }).instance();

  instance.changeField(field, value);

  expect(client.writeQuery).not.toBeCalled();
});