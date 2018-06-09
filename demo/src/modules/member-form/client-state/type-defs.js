export default `
  type Member {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    level: String!
  }
  
  input MemberInput {
    id: Int,
    firstName: String!
    lastName: String!
    email: String!
    level: String!
  }
  
  type Mutation {
    saveMember(member: MemberInput!): Member
  }
  
  type Query {
    member(id: Int!): Member
    members: [Member]
  }
`;