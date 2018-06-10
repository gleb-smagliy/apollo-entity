import React from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../../entity-context';

export default class EntityField extends React.Component
{
  static propTypes = {
    allow: PropTypes.func,
    name: PropTypes.string.isRequired
  };

  static defaultProps = {
    allow: () => true
  };

  changeValue = changeField => value =>
  {
    if(!this.props.allow(value))
    {
      return;
    }

    changeField(this.props.name, value);
  };

  consumeContext = ({ entity, changeField }) =>
  {
    return this.props.children(entity[this.props.name], this.changeValue(changeField));
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