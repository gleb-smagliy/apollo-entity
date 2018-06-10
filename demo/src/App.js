import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from "react-apollo";
import MemberForm, { resolvers, defaults, typeDefs } from './modules/member-form';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: withClientState({
    resolvers,
    defaults,
    typeDefs,
    cache
  }),
});

class App extends Component {
  render()
  {
    return (
      <ApolloProvider client={client}>
        <MemberForm />
      </ApolloProvider>
    );
  }
}

export default App;
