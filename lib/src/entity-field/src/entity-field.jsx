import React from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../../entity-context';

class FieldGuard extends React.PureComponent
{
  render()
  {
    return this.props.render(this.props.value, this.props.change);
  }
}

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
      <FieldGuard
        render={this.props.children}
        value={value}
        change={this.changeValue(changeField)}
      />
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