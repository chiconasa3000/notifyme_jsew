
const {gql} = require('apollo-server');



// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
module.exports = gql`
  scalar DateTime

  # This Note containes the metadata about the entity that you create
  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  #To Pagination
  type NoteFeed{
    notes: [Note!]!
    cursor: String!
    hasNextPage: Boolean!
  }
  
  #Remember that id is not a parameter in the creation of User
  #id will be created by mongoose
  #Remember too: passwords is not manage by graphql 
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String!
    notes: [Note!]!
    favorites: [Note!]!
  }
  
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "notes" query returns an array of zero or more Books (defined above).
  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
    user(username: String!): User
    users: [User!]!
    me: User!
    
    #Add noteFeed to our existing queries
    noteFeed(cursor: String): NoteFeed
  }

  #Mutation
  type Mutation{
    newNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    
    #register and login in the app
    signUp(username: String!, email: String!, password: String!): String! 
    signIn(username: String, email: String, password: String!): String!

    #Turn off or Turn on favorite notes
    toggleFavorite(id: ID!): Note!
  }
`;


