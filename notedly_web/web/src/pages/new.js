
import React, {useEffect} from 'react';
import {useMutation, gql} from '@apollo/client';

import NoteForm from '../components/NoteForm';

//import the file of queries in this case only notes for all users
//it avoid to repeat the same query in other component that requires it
import {GET_MY_NOTES, GET_NOTES} from '../gql/query';
import {NEW_NOTE} from '../gql/mutation';

const NewNote = props => {
  useEffect(() => {
    document.title = "New Note - Notedly";
  });

  const [data, {loading, error}] = useMutation(NEW_NOTE, {
    //refetch the GET_NOTES query to update the cache
    //in this case internally make get_notes query in order to update the note's list
    refetchQueries: [{query: GET_MY_NOTES}, {query: GET_NOTES}],
    onCompleted: data => {
      //when complete, redirect the user to the note page isolated
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  //Render from general form  in this case NoteForm
  //it could be updating note or create note
  return (
    <React.Fragment>
      {/*as the mutation is loading, display, a loading message*/}
      {loading && <p>Loading...</p>}
      {/*if there is an error, display a error message*/}
      {error && <p> Error saving the note</p>}
      {/*the form component, passing the mutation data as a prop*/}
      <NoteForm action={data}/>
    </React.Fragment>
  );
};

export default NewNote;
