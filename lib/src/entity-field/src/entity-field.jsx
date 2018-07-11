import React from 'react';
import PropTypes from 'prop-types';
import FieldGuard from '../../field-guard';
import { Consumer } from '../../entity-context';

export default class EntityField extends React.Component
{
  static propTypes = {
    allow: PropTypes.func,
    children: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.any
  };

  static defaultProps = {
    allow: () => true,
    defaultValue: undefined
  };

  changeValue = changeField => (value) =>
  {
    if (!this.props.allow(value))
    {
      return;
    }

    changeField(this.props.name, value);
  };

  consumeContext = ({ entity, changeField }) =>
  {
    const value = entity[this.props.name] || this.props.defaultValue;

    return (
      <FieldGuard value={value} onChange={this.changeValue(changeField)}>
        {this.props.children}
      </FieldGuard>
    );
  };

  render()
  {
    return (
      <Consumer>
        {this.consumeContext}
      </Consumer>
    );
  }
}