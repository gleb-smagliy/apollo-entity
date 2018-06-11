import React from 'react';
import { shallow } from 'enzyme';
import EntityMap from './entity-map';
import { Consumer } from '../../entity-context';

const wrapper = (overrides = {}) => shallow(<EntityMap {...overrides } />);

test('EntityMap should be entity-context consumer', () => {
  const entity = wrapper();

  expect(entity.type()).toEqual(Consumer);
});


test('EntityMap should render null by default', () => {
  expect(wrapper().props().children({ entity: 123 })).toEqual(null);
});

test('EntityMap\'s default map should pass data unchanged', () => {
  const input = {};

  expect(EntityMap.defaultProps.map(input)).toEqual(input);
});

test('EntityMap should call passed children with mapped by default data', () => {
  const children = jest.fn();
  const entity = 123;

  wrapper({ children }).props().children({ entity });

  expect(children.mock.calls[0][0]).toEqual(entity);
});

test('EntityMap should call passed children with customly mapped data', () => {
  const children = jest.fn();
  const entity = { key: 'value' };
  const map = e => e.key;

  wrapper({ children, map }).props().children({ entity });

  expect(children.mock.calls[0][0]).toEqual(entity.key);
});