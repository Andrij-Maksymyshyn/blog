const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User{
        _id:ID!
        fullName: String!
        email: String!
        password: String!
        avatarUrl: String
        isDeleted: Boolean!
        dateCreation: String!
       }
   input UserInputData { 
        fullName: String!
        email: String!
        password: String
        avatarUrl: String
        
    }
    type RootMutation {
       createUser(userInput:UserInputData): User!
       updateUser(id: ID!, userInput:UserInputData): User!
       deleteUser(id: ID!): User!
    }

    type RootQuery {
       users(skip: Int, limit: Int): [User!]!
    }

  schema {
    query: RootQuery
    mutation: RootMutation
}
`);

module.exports = schema;
