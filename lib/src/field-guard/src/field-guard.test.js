import React from 'react';
import { shallow } from 'enzyme';
import FieldGuard from './field-guard.jsx';

const wrapper = (fakeProps = {}) => shallow(<FieldGuard {...fakeProps } />);

afterEach(() => jest.restoreAllMocks());

test('EntityField\'s default allow should always return true', () =>
{
  const innerComponent = (<div />);
  const children = () => innerComponent;

  expect(wrapper({ children }).contains(innerComponent)).toEqual(true);
});