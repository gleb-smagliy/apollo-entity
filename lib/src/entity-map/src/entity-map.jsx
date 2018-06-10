import React from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../../entity-context';

const EntityMap = ({
  map,
  children
}) => (
  <Consumer>
    {
      ({ entity }) => children(map(entity))
    }
  </Consumer>
);

EntityMap.propTypes = {
  children: PropTypes.func,
  map: PropTypes.func
};

EntityMap.defaultProps = {
  children: () => null,
  map: data => data
};

export default EntityMap;