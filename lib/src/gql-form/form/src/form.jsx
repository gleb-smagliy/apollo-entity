import React from 'react';
import { Query, withApollo } from 'react-apollo';
import { noop } from 'node-noop';

const pass = e => e;

const { Provider, Consumer } = React.createContext({ onFieldChange: noop, entity: null });

const FormField = ({ children, field }) => (
  <Consumer>
    {
      ({ onFieldChange, entity }) =>
        children(entity[field], event => onFieldChange(field, event.target.value))
    }
  </Consumer>
);

const FormMap = ({ children, mapper }) => (
  <Consumer>
    {
      ({ entity }) => children((mapper || pass)(entity))
    }
  </Consumer>
);

class Form extends React.Component
{
  onFieldChange = (field, value) =>
  {
    console.log('onFieldChange:', {[field]: value});

    const { query, variables, field: entity, client } = this.props;

    const cacheEntity = client.readQuery({ query, variables })[entity];

    client.writeQuery({
      query,
      variables,
      data:
      {
        [entity]:
        {
          ...cacheEntity,
          [field]: value
        }
      }
    });
  };

  contextProvider = ({ data }) =>
  {
    const { field, loading, error, children } = this.props;

    if(data.loading)
    {
      return loading();
    }

    if(data.error)
    {
      return this.props.error(error);
    }

    return (
      <Provider value={{ onFieldChange: this.onFieldChange, entity: data[field] }}>
        {children}
      </Provider>
    );
  };

  render()
  {
    const { query, variables, field, loading, error } = this.props;

    return (
      <Query query={query} variables={variables}>{this.contextProvider}</Query>
    )
  }
}

const FormWithApollo = withApollo(Form);

FormWithApollo.Field = FormField;
FormWithApollo.Map = FormMap;

export default FormWithApollo;