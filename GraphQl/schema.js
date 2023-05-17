const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User{
        _id: ID!
        fullName: String!
        email: String!
        avatarUrl: String
        isDeleted: Boolean!
        dateCreation: String!
       }

   type Post{
        _id: ID!
        title: String!
        text: String!
        tags: [String!]
        viewsCount: Int
        imageUrl: String
        isDeleted: Boolean!
        date: String!
        user: ID       
        }

    type LoginReturnType{
        accessToken: String!
        refreshToken: String!
       }    

   input UserInputData { 
        fullName: String!
        email: String!
        password: String
        avatarUrl: String        
    }

    input PostInputData { 
        title: String!
        text: String!
        tags: [String!]
        viewsCount: Int
        imageUrl: String
        accessToken: String!         
    }

    input LoginInputData {
        email: String!
        password: String!
    } 

    type RootMutation {
       createUser(userInput: UserInputData): User!
       updateUser(id: ID!, userInput: UserInputData): User!
       deleteUser(id: ID!): User!
       loginUser(loginInput: LoginInputData): LoginReturnType
       createPost(postInput: PostInputData): Post!
       updatePost(id: ID!, postInput: PostInputData): Post!
       deletePost(id: ID!, accessToken: String!): Post!
    }

    type RootQuery {
       users(skip: Int, limit: Int): [User!]!
       posts(skip: Int, limit: Int): [Post!]!
    }

   schema {
    query: RootQuery
    mutation: RootMutation
}
`);

module.exports = schema;
