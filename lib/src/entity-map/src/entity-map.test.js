import React from 'react';
import { shallow } from 'enzyme';
import FieldGuard from '../../field-guard';
import EntityMap from './entity-map';
import { Consumer } from '../../entity-context';

const wrapper = (overrides = {}) => shallow(<EntityMap {...overrides } />);

test('EntityMap should be entity-context consumer', () => {
  const entity = wrapper();

  expect(entity.type()).toEqual(Consumer);
});


test('EntityMap should render null by default', () => {
  expect(EntityMap.defaultProps.children()).toEqual(null);
});

test('EntityMap\'s default map should pass data unchanged', () => {
  const input = {};

  expect(EntityMap.defaultProps.map(input)).toEqual(input);
});

test('EntityMap should call passed children with mapped by default data', () => {
  const children = jest.fn();
  const entity = 123;

  wrapper({ children }).props().children({ entity });

  expect(wrapper({ children }).props().children({ entity }).props.value).toEqual(entity);
});

test('EntityMap should call passed children with customly mapped data', () => {
  const children = jest.fn();
  const entity = { key: 'value' };
  const map = e => e.key;

  expect(wrapper({ children, map }).props().children({ entity }).props.value).toEqual(entity.key);
});