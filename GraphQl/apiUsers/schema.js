const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User{
        _id:ID!
        fullName: String!
        email: String!
        password: String!
        avatarUrl: String
        isDeleted: Boolean
        created_at: String!
        updated_at: String!
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
    type UsertData {
        users: [User!]!
    }
    type RootQuery {
    users: UsertData!
    }

  schema {
    query: RootQuery
    mutation: RootMutation
}
`);

module.exports = schema;
