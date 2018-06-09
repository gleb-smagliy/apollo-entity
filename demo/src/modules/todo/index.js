import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


// Checkout
// https://www.apollographql.com/docs/graphql-tools/resolvers.html#Resolver-obj-argument

const GET_TODOS = gql`
  query members($id: Int!) {
    members(id: $id) @client {  
      id
      text
    }
  }
`;

const TodoList = () => (
  <Query query={GET_TODOS} variables={{ id: 1 }}>

    {({ data: { members } }) => {

      console.log(members)

      if (!members) {
        return <div> Loading... </div>
      }

      return (
        <ul>
          {members.map(todo => (
            <li> {todo.text} </li>
          ))}
        </ul>
      )

    }}

  </Query>
);

export default TodoList;
