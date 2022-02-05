
import React from 'react';
//import GraphQl dependencies
import {useQuery,useMutation, gql} from '@apollo/client';

//import the Note component
import NoteForm from '../components/NoteForm';

//the note query, which accepts and ID variable
import {GET_NOTE, GET_ME} from '../gql/query';
import {EDIT_NOTE} from '../gql/mutation';

const EditNote = props => {
  //store the id found in the url as a variable
  const id = props.match.params.id;

  //query hook, passing the id value as a variable or parameter
  const {loading, error, data} = useQuery(GET_NOTE, {variables: {id}});
  
  //fetch the current users's data: key: userdata 
  const {data: userdata} = useQuery(GET_ME);
  
  //define edit note or update
  const [editNote] = useMutation(EDIT_NOTE,{
    variables: {
      id
    },
    onCompleted: () => {
      //redirect to specific note finded with the id note
      props.history.push(`/note/${id}`);
    }
  });

  //if the data is loading, display a loading message
  if(loading) return <p>Loading...</p>;

  //if there is an error fetching the data, display an error message
  if(error) return <p> Note not found Error loading note </p>;
  
  //if the current user and the author of the note do not match
  if(userdata.me.id !== data.note.author.id){
    return <p>You do not have acces to edit this note logout and signing please</p>;
  }
  //pass the data and mutation to the form component 
  return <NoteForm content={data.note.content} action={editNote}/>;

};

export default EditNote;



