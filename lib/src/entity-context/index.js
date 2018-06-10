import React from 'react';

const { Provider, Consumer } = React.createContext({ changeField: () => undefined, entity: null });

export { Provider, Consumer };