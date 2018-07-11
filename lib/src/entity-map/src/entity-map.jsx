import React from 'react';
import PropTypes from 'prop-types';
import FieldGuard from '../../field-guard';

import { Consumer } from '../../entity-context';

const EntityMap = ({
  map,
  children
}) => (
  <Consumer>
    {({ entity }) => (
      <FieldGuard value={map(entity)}>
        {children}
      </FieldGuard>
    )}
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