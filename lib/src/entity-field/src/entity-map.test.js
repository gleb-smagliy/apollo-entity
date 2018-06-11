import React from 'react';
import { shallow } from 'enzyme';
import EntityField from './entity-field';
import { Consumer } from '../../entity-context';

const entity = {
  type: 'cat'
};

const fakeProps = {
  name: 'type'
};

const wrapper = (overrides = {}) => shallow(<EntityField {...{ ...fakeProps, ...overrides }} />);

afterEach(() => jest.restoreAllMocks());

test('EntityField\'s default allow should always return true', () => {
  expect(EntityField.defaultProps.allow(123)).toEqual(true);
});

test('EntityField should be entity-context consumer', () => {
  const entityField = wrapper();

  expect(entityField.type()).toEqual(Consumer);
});

test('EntityField should pass consumeContext method as a render prop to context', () => {
  const entityField = wrapper();

  expect(entityField.props().children).toEqual(entityField.instance().consumeContext);
});

test('changeValue should call changeField with field name when allowance check passes', () => {
  const allow = () => true;
  const name = 'test_name';
  const value = 'test_value';
  const changeField = jest.fn();
  const changeValue = wrapper({ name, allow }).instance().changeValue(changeField);

  changeValue(value);

  expect(changeField).toBeCalledWith(name, value);
});

test('changeValue should not call changeField when allowance check doest not pass', () => {
  const allow = () => false;
  const name = 'test_name';
  const value = 'test_value';
  const changeField = jest.fn();
  const changeValue = wrapper({ name, allow }).instance().changeValue(changeField);

  changeValue(value);

  expect(changeField).not.toBeCalled();
});

test('consumeContext should pass entity\'s field to children', () => {
  const children = jest.fn();
  const entity = { field: 'value' };
  const changeField = 123;
  const instance = wrapper({ children, name: 'field' }).instance();

  const changeValue = jest.spyOn(instance, 'changeValue').mockImplementation(() => '123');
  instance.consumeContext({ entity, changeField });

  expect(children).toBeCalledWith(entity.field, '123');
  expect(changeValue).toBeCalledWith(changeField);
});