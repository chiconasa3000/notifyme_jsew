
import {gql} from '@apollo/client';

//Create new Note with content and user registered
//the user is pass by jwt local variable
const NEW_NOTE = gql`
  mutation newNote($content: String!){
    newNote(content: $content){
      id
      content
      createdAt
      favoriteCount
      favoritedBy{
        id
        username
      }
      author{
        username
        id
      }
    }
  }
`;

const EDIT_NOTE = gql`
  mutation updateNote($id: ID!, $content: String!){
    updateNote(id:$id, content: $content){
      id
      content
      createdAt
      favoriteCount
      favoritedBy{
        id
        username
      }
      author{
        username
        id
      }
    }
  }
`;

// LogIn created user in order to acces private routes
// Requires: email and password
const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!){
    signIn(email: $email, password:$password)
  }
`;


// Register new account with username, email and password
const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!){
    signUp(email: $email, username:$username, password:$password)
  }
`;



export {
  NEW_NOTE,
  EDIT_NOTE,
  SIGNIN_USER,
  SIGNUP_USER
};
