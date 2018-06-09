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
`

export const defaults = {
  members: [
    {
      id: 1,
      text: "Item 1",
      __typename: "Todo"
    },
    {
      id: 2,
      text: "Item 2",
      __typename: "Todo"
    },
    {
      id: 3,
      text: "Item 3",
      __typename: "Todo"
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
              text
            }
          }
        `
      const { members } = ctx.cache.readQuery({ query })
      console.log(members)
      return members.filter(todo => todo.id === args.id)
    },
  },
  Mutation: {},
};
