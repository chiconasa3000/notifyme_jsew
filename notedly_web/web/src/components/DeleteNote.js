
import React from 'react';
import {useMutation} from '@apollo/client';
import {withRouter} from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';


//Only you view a link which execute the query as a function on the link
//previously pass data note with getnote query and pass note's id
//also it control the update of total note list and owner note list
//so for this reason it is a high component because to final of delete query
//redirect to another page

//import the DELETE_NOTE mutation
import {DELETE_NOTE} from '../gql/mutation';

//import queries to refetch afte note deletion
import {GET_MY_NOTES, GET_NOTES} from '../gql/query';

const DeleteNote = props => {
  const [deleteNote] = useMutation(DELETE_NOTE,{
    variables: {
      id: props.noteId
    },
    //refetch the note list queries to update cache
    refetchQueries: [{ query: GET_NOTES},{query: GET_MY_NOTES }],
    onCompleted: data => {
      //redirect the user to the "my notes" pages (own notes)
      props.history.push('/mynotes');
    }
  });

  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};

export default withRouter(DeleteNote);


