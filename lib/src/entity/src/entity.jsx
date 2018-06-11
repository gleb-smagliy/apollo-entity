import React from 'react';
import { Query, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import { Provider } from '../../entity-context';

export class Entity extends React.Component
{
  static propTypes = {
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    loading: PropTypes.func,
    error: PropTypes.func
  };

  static defaultProps = {
    children: null,
    loading: () => null,
    error: () => null
  };

  changeField = (field, value) =>
  {
    const { query, variables, name, client } = this.props;

    const cacheEntity = client.readQuery({ query, variables })[name];

    if(typeof(cacheEntity) !== 'object')
    {
      return;
    }

    client.writeQuery({
      query,
      variables,
      data:
      {
        [name]:
        {
          ...cacheEntity,
          [field]: value
        }
      }
    });
  };

  handleQuery = renderPropArgs =>
  {
    const { data, loading, error } = renderPropArgs;
    const { name, loading: loadingHandler, error: errorHandler, children } = this.props;

    if(error)
    {
      return errorHandler(renderPropArgs);
    }

    if(!data || loading)
    {
      return loadingHandler(renderPropArgs);
    }

    return (
      <Provider value={{ changeField: this.changeField, entity: data[name] }}>
        {children}
      </Provider>
    );
  };

  render()
  {
    const { query, variables, name, loading, error, children, ...queryProps } = this.props;

    return (
      <Query
        query={query}
        variables={variables}
        {...queryProps}
      >
        {this.handleQuery}
      </Query>
    )
  }
}

export default withApollo(Entity);