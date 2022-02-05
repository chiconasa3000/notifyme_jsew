
import {gql} from '@apollo/client';

//Get all notes for all users it seudorequires id or curso of last note showed
//our GraphQl query, stored as a variable (awesome!)
const GET_NOTES = gql`
  query NoteFeed($cursor: String){
    noteFeed(cursor: $cursor){
      cursor
      hasNextPage
      notes{
        id
        createdAt
        content
        favoriteCount
        author{
          username
          id
          avatar
        }
      }
    }
  }
`;

//Get isolated Note with the id note
//the note query, which accepts and ID variable
const GET_NOTE = gql`
  query note($id: ID!){
    note(id: $id){
      id
      createdAt
      content
      favoriteCount
      author{
        username
        id
        avatar
      }
    }
  }
`;


//Flag as cache variable if a user is sign in
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

//Get Notes from current user
const GET_MY_NOTES = gql`
  query me{
    me{
      id
      username
      notes{
        id
        createdAt
        content
        favoriteCount
        author{
          username
          id
          avatar
        }
      }
    }
  }
`;

//Get My Favorites from current user
const GET_MY_FAVORITES = gql`
  query me{
    me{
      id
      username
      favorites{
        id
        createdAt
        content
        favoriteCount
        author{
          username
          id
          avatar
        }
      }
    }
  }
`;

//add GET_ME to know you, in order to get user data for other query or mutation
const GET_ME = gql`
  query me {
    me {
      id
      favorites{
        id
      }
    }
  }
`;

export {
  GET_NOTES, 
  GET_NOTE, 
  GET_MY_NOTES,
  GET_MY_FAVORITES,
  GET_ME,
  IS_LOGGED_IN
};
