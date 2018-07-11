import React from 'react';
import PropTypes from 'prop-types';

export default class FieldGuard extends React.PureComponent
{
  static propTypes = {
    children: PropTypes.func.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: undefined,
    onChange: undefined
  };

  render()
  {
    const { children, value, onChange } = this.props;

    return children(value, onChange);
  }
}
