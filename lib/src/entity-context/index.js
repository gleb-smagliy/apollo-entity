import React from 'react';
import { noop } from 'node-noop';

const { Provider, Consumer } = React.createContext({ changeField: noop, entity: null });

export { Provider, Consumer };