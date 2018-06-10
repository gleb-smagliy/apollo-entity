import gql from "graphql-tag";

export const typeDefs = `
  type Todo {
    id: Int!
    text: String!
  }

  type Query {
    todo: Todo
    members: [Todo]
  }
`;

export const defaults = {
  members: [
    {
      __typename: 'Member',
      id: 1,
      firstName: 'Vasua',
      lastName: 'Pupkin',
      email: 'vasua@pupkin.org',
      level: 'Gold'
    }
  ],
};

export const resolvers = {
  Query: {
    members: (obj, args, ctx) => {
      const query = gql`
          query GetTodos {
            members @client {
              id
              email
              level
              firstName
              lastName
            }
          }
        `;
      const { members } = ctx.cache.readQuery({ query });
      console.log(members);
      return members.find(member => member.id === args.id);
    },
  },
  Mutation: {
    saveMember(obj, args, ctx)
    {
      console.log('Saving member:', args.member)
    }
  }
};
