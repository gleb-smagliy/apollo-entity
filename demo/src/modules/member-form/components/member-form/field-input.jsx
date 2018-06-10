import React from 'react';
import Entity from 'apollo-entity';

export default ({
  name,
  allow
}) => (
  <Entity.Field name={name} allow={allow}>
    {(value, change) => (
      <input type="text" value={value} onChange={e => change(e.target.value)} />
    )}
  </Entity.Field>
);