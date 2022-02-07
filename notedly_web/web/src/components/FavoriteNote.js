
import React, {useState} from 'react';
import {useMutation} from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';

//the TOGGLE_FAVORITE mutation
import {TOGGLE_FAVORITE} from '../gql/mutation';

//add the GET_MY_FAVORITES query to refetch
import {GET_MY_FAVORITES} from '../gql/query'; 

const FavoriteNote = props => {
  
  //store the note's favorite count as state
  const [count, setCount] = useState(props.favoriteCount);

  //store if the user has favorited the note as state
  const [favorited, setFavorited] = useState(
    //check if the note exist in the user favorites list (filter js)
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );

  //toggle favorite mutation hook
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.noteId
    },
    //refetch the GET_MY_FAVORITES query to update the cache
    refetchQueries: [{query: GET_MY_FAVORITES}]
  });

  return (
    <React.Fragment>
    {favorited ?(
      <ButtonAsLink
        onClick={() => {
          toggleFavorite();
          setFavorited(false);
          setCount(count - 1);
        }}
      >
        Remove Favorite
      </ButtonAsLink>
    ):(
      <ButtonAsLink
        onClick={()=>{
          toggleFavorite();
          setFavorited(true);
          setCount(count + 1);
        }}
      >
        Add Favorite
      </ButtonAsLink>
    )}
    :{count}
    </React.Fragment>
  );
};

export default FavoriteNote;


