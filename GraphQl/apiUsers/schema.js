const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User{
        _id:ID!
        fullName: String!
        email: String!
        password: String!
        avatarUrl: String
        isDeleted: Boolean
        dateCreation: String!
       }
   input UserInputData { 
        fullName: String!
        email: String!
        password: String!
        avatarUrl: String
        
    }
    type RootMutation {
       createUser(userInput:UserInputData): User!
    }    
    type Query {
    users: [User!],
    }

  schema {
    query: Query
    mutation: RootMutation
}
`);

module.exports = schema;
