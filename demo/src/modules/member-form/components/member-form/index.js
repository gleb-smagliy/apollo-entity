import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// const MEMBER_QUERY = gql`
//   query memberById($id: Int) {
//     memberById (id: $id) @client {
//       firstName,
//       lastName,
//       email,
//       level
//     }
//   }
// `;

const GET_MEMBER = gql`
  query members($id: Int!) {
    members(id: $id) @client {  
      firstName
      lastName
    }
  }
`;

export default () => (
  <Query query={GET_MEMBER} variables={{ id: 1 }}>
    {
      props =>
      {
        console.log('comp', props);

        {/*const { data: { member } } = props;*/}

        return (
          <div>

          </div>
        );
      }
    }
  </Query>
);