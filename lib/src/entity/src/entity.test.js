import React from 'react';
import { shallow } from 'enzyme';
import { Query, withApollo } from 'react-apollo';
import { Provider } from '../../entity-context';
import { Entity } from './entity';

const fakeProps = {
  query: {},
  client: {},
  variables: { id: 1 },
  name: 'someEntity'
};

const data = {
  entity: {
    oldField: 'old_field_value',
    field: 123
  }
};

const createClient = (readResult = data) => ({
  readQuery: jest.fn(() => readResult),
  writeQuery: jest.fn()
});

const wrapper = (overrides = {}) => shallow(<Entity {...{ ...fakeProps, ...overrides }} />);

afterEach(() => jest.restoreAllMocks());

test('Entity\'s default loading should return null', () => {
  expect(Entity.defaultProps.loading()).toEqual(null);
});

test('Entity\'s default error should return null', () => {
  expect(Entity.defaultProps.error()).toEqual(null);
});

test('Entity should be query with right props', () => {
  const fetchPolicy = 'cache-only';
  const entityComponent = wrapper({ fetchPolicy });
  expect(entityComponent.type()).toEqual(Query);
  expect(entityComponent.props().query).toEqual(fakeProps.query);
  expect(entityComponent.props().variables).toEqual(fakeProps.variables);
  expect(entityComponent.props().fetchPolicy).toEqual(fetchPolicy);
});

test('Entity should pass handleQuery as a render props to query', () => {
  const fetchPolicy = 'cache-only';
  const entityComponent = wrapper({ fetchPolicy });

  expect(entityComponent.props().children).toEqual(entityComponent.instance().handleQuery);
});

test('handleQuery should return loader when loading', () => {
  const loader = (<div>123</div>);
  const loading = () => loader;

  expect(wrapper({ loading }).instance().handleQuery({ loading: true })).toEqual(loader);
});

test('handleQuery should return loader when no data presented', () => {
  const loader = (<div>123</div>);
  const loading = () => loader;

  expect(wrapper({ loading }).instance().handleQuery({ loading: false })).toEqual(loader);
});

test('handleQuery should return error when error occured', () => {
  const errorDiv = (<div>123</div>);
  const error = () => errorDiv;

  expect(wrapper({ error }).instance().handleQuery({ error: {}, loading: false })).toEqual(errorDiv);
});

test('handleQuery should return context Provider with children if everything is fine', () => {
  const children = (<div>123</div>);
  const name = 'entity';
  const instance = wrapper({ children, name }).instance();

  const provider = instance.handleQuery({ error: null, loading: false, data });

  expect(provider.type).toEqual(Provider);
  expect(provider.props.value).toEqual({ changeField: instance.changeField, entity: data[name] });
  expect(provider.props.children).toEqual(children);
});

test('changeField should return context Provider with children if everything is fine', () => {
  const name = 'entity';
  const field = 'field';
  const value = 'new_value';

  const client = createClient();

  const instance = wrapper({ name, client }).instance();

  instance.changeField(field, value);

  expect(client.readQuery).toBeCalledWith({ query: fakeProps.query, variables: fakeProps.variables });
});

test('changeField should return context Provider with children if everything is fine', () => {
  const name = 'entity';
  const field = 'field';
  const value = 'new_value';

  const client = createClient();

  const instance = wrapper({ name, client }).instance();

  instance.changeField(field, value);

  const writeData = {
    entity: {
      oldField: 'old_field_value',
      field: value
    }
  };

  expect(client.writeQuery).toBeCalledWith({ query: fakeProps.query, variables: fakeProps.variables, data: writeData });
});

test('changeField should return context Provider with children if everything is fine', () => {
  const name = 'entity';
  const field = 'field';
  const value = 'new_value';

  const client = createClient(123);

  const instance = wrapper({ name, client }).instance();

  instance.changeField(field, value);

  expect(client.writeQuery).not.toBeCalled();
});
