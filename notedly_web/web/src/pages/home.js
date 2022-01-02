//import the required libraries
import React from 'react';
//import apollo client
import {useQuery, gql} from '@apollo/client';
//if you want markdown in your code
//import ReactMarkdown from 'react-markdown';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

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


const Home = () => {
  //query hook
  const {data, loading, error, fetchMore} = useQuery(GET_NOTES);
  
  //if data is loading, display a loading message
  if(loading) return <p>Loading...</p>;
  //if there is an error fetching the data, diplay an error message
  if(error) return <p>Error getting Notes, check GET_NOTES</p>;
  
  //you could return many values closed by parenthesis in the return
  //in case of not only user and in the final put dot and comma
  return(
    //Add a <React.Fragment> element to provide a parent element
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes}/>
      {/*Only display the load button if hasnextpage is true*/}
      {data.noteFeed.hasNextPage &&(
        <Button 
          onClick={()=>
            fetchMore({
              variables:{
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, {fetchMoreResult}) =>{
                return{
                  noteFeed:{
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    //COMBINE the new results and the old
                    notes:[
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                };
              }//update query
            })//if there is fetchMore
          }//click function
        >
        Load More
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
